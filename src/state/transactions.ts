import ls from "localstorage-slim";
import { nanoid } from "nanoid";
import { DefaultValue, selector } from "recoil";

import { DEFAULT_RESERVE_CHANGE, KEY_SESSION } from "@neverquest/constants";
import { ATTRIBUTES_INITIAL, BLEED_DURATION } from "@neverquest/constants/attributes";
import {
  CREW_INITIAL,
  CREW_MEMBERS,
  CREW_ORDER,
  MERCHANT_OFFERS,
} from "@neverquest/constants/caravan";
import LOCRA from "@neverquest/locra";
import { AffixTag, CreatureType } from "@neverquest/locra/types";
import { attributes } from "@neverquest/state/attributes";
import { crew, merchantInventory } from "@neverquest/state/caravan";
import { isRecovering, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { level, progress } from "@neverquest/state/encounter";
import { inventory, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  currentHealthMonster,
  isMonsterEngaged,
  isMonsterNew,
  isMonsterStaggered,
  maximumHealthMonster,
  monsterBleedingDuration,
  monsterLoot,
  monsterName,
  monsterStatusElement,
  totalDamageMonster,
} from "@neverquest/state/monster";
import {
  canAttack,
  canBlock,
  currentHealth,
  currentStamina,
  maximumHealth,
  maximumStamina,
} from "@neverquest/state/reserves";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import { isGameOver, isNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import {
  totalBleedChance,
  totalBlockChance,
  totalDamage,
  totalDodgeChance,
  totalParryChance,
  totalProtection,
} from "@neverquest/state/statistics";
import {
  AttributeType,
  CrewStatus,
  DeltaType,
  ShowingType,
  SkillType,
} from "@neverquest/types/enums";
import { isArmor, isItem, isShield, isWeapon } from "@neverquest/types/type-guards";
import {
  AnimationSpeed,
  AnimationType,
  DeltaDisplay,
  DeltaReserve,
  FloatingText,
} from "@neverquest/types/ui";
import { generateArmor, generateShield, generateWeapon } from "@neverquest/utilities/generators";
import { animateElement } from "@neverquest/utilities/helpers";

// TODO - refactor all as useRecoilTransaction(), as soon as it can handle selectors too. Or make them all hooks?

export const defense = selector({
  get: () => null,
  key: "defense",
  set: ({ get, set }) => {
    animateElement({
      element: get(statusElement),
      speed: AnimationSpeed.Fast,
      type: AnimationType.HeadShake,
    });

    const deltaHealth = deltas(DeltaType.Health);
    const hasDodged = get(skills(SkillType.Dodge)) && Math.random() <= get(totalDodgeChance);

    if (hasDodged) {
      set(deltaHealth, {
        color: FloatingText.Neutral,
        value: "DODGED",
      });

      return;
    }

    const totalProtectionValue = get(totalProtection);
    const monsterDamage = get(totalDamageMonster);
    const healthDamage = (() => {
      const damage = totalProtectionValue - monsterDamage;

      return damage < 0 ? damage : 0;
    })();

    if (healthDamage === 0) {
      set(deltaHealth, {
        color: FloatingText.Neutral,
        value: healthDamage,
      });

      return;
    }

    const hasBlocked = Math.random() <= get(totalBlockChance);

    if (hasBlocked) {
      const canBlockValue = get(canBlock);
      const { staminaCost } = get(shield);

      if (canBlockValue) {
        set(deltaHealth, {
          color: FloatingText.Neutral,
          value: "BLOCKED",
        });
        set(staminaChange, { value: -staminaCost });

        if (get(skills(SkillType.Stagger))) {
          set(isMonsterStaggered, true);
        }

        return;
      } else {
        set(deltas(DeltaType.Stamina), [
          {
            color: FloatingText.Neutral,
            value: "CANNOT BLOCK",
          },
          {
            color: FloatingText.Negative,
            value: ` (${staminaCost})`,
          },
        ]);
      }
    }

    const hasParried = get(skills(SkillType.Parry)) && Math.random() <= get(totalParryChance);

    if (!hasBlocked && hasParried) {
      const parryDamage = Math.floor(monsterDamage / 2);
      const monsterHealth = get(currentHealthMonster) - parryDamage;

      set(currentHealthMonster, monsterHealth);
      set(deltas(DeltaType.HealthMonster), [
        {
          color: FloatingText.Neutral,
          value: "PARRIED",
        },
        {
          color: FloatingText.Negative,
          value: ` (${parryDamage})`,
        },
      ]);

      animateElement({
        element: get(monsterStatusElement),
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    }

    let deltaHealthOverride: DeltaDisplay | undefined;

    if (totalProtectionValue > 0) {
      deltaHealthOverride = [
        {
          color: FloatingText.Negative,
          value: healthDamage,
        },
        {
          color: FloatingText.Neutral,
          value: ` (${totalProtectionValue})`,
        },
      ];
    }

    set(healthChange, { delta: deltaHealthOverride, value: healthDamage });

    if (!get(isShowing(ShowingType.Recovery))) {
      set(isShowing(ShowingType.Recovery), true);
    }

    set(isRecovering, true);
  },
});

export const healthChange = selector<DeltaReserve>({
  get: () => DEFAULT_RESERVE_CHANGE,
  key: "healthChange",
  set: ({ get, set }, change) => {
    if (change instanceof DefaultValue) {
      return;
    }

    const { delta, value } = change;
    const max = get(maximumHealth);
    const isPositive = value > 0;

    let newHealth = get(currentHealth) + value;

    set(
      deltas(DeltaType.Health),
      delta ?? {
        color: isPositive ? FloatingText.Positive : FloatingText.Negative,
        value: isPositive ? `+${value}` : value,
      }
    );

    if (newHealth <= 0) {
      newHealth = 0;
      set(isGameOver, true);
      set(isShowing(ShowingType.GameOver), true);
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(currentHealth, newHealth);
  },
});

export const initialization = selector({
  get: () => null,
  key: "initialization",
  set: ({ get, set }) => {
    if (ls.get(KEY_SESSION) !== null) {
      return;
    }

    set(currentHealth, get(maximumHealth));
    set(currentStamina, get(maximumStamina));
    set(monsterCreate, null);

    ATTRIBUTES_INITIAL.forEach((type) =>
      set(attributes(type), (current) => ({ ...current, isUnlocked: true }))
    );

    CREW_INITIAL.forEach((type) =>
      set(crew(type), (current) => ({
        ...current,
        hireStatus: CrewStatus.Hired,
      }))
    );
  },
});

export const itemEquip = selector({
  get: () => nanoid(),
  key: "itemEquip",
  set: ({ get, set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    const { item } = get(inventory)[id];

    if (!item) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: true },
    }));

    if (isArmor(item)) {
      if (!get(isShowing(ShowingType.Armor))) {
        set(isShowing(ShowingType.Armor), true);
      }

      if (!get(isShowing(ShowingType.TotalProtection))) {
        set(isShowing(ShowingType.TotalProtection), true);
      }
    }

    if (isShield(item)) {
      if (!get(isShowing(ShowingType.Shield))) {
        set(isShowing(ShowingType.Shield), true);
      }

      if (!get(isShowing(ShowingType.BlockChance))) {
        set(isShowing(ShowingType.BlockChance), true);
      }
    }

    if (isWeapon(item)) {
      if (!get(isShowing(ShowingType.Stamina)) && item.staminaCost > 0) {
        set(isShowing(ShowingType.Stamina), true);

        if (!get(attributes(AttributeType.Stamina)).isUnlocked) {
          set(attributes(AttributeType.Stamina), (current) => ({
            ...current,
            isUnlocked: true,
          }));
        }
      }

      if (!get(isShowing(ShowingType.TotalAttackRateSummary))) {
        set(isShowing(ShowingType.TotalAttackRateSummary), true);
      }

      if (!get(isShowing(ShowingType.TotalDamageSummary))) {
        set(isShowing(ShowingType.TotalDamageSummary), true);
      }

      if (!get(isShowing(ShowingType.Weapon))) {
        set(isShowing(ShowingType.Weapon), true);
      }
    }
  },
});

export const itemUnequip = selector({
  get: () => nanoid(),
  key: "itemUnequip",
  set: ({ set }, id) => {
    if (id instanceof DefaultValue) {
      return;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: false },
    }));
  },
});

export const merchantInventoryGeneration = selector({
  get: () => null,
  key: "merchantInventoryGeneration",
  set: ({ get, set }) => {
    const inventory = { ...get(merchantInventory) };
    const levelValue = get(level);
    const nsfwValue = get(isNSFW);

    // Remove all previously returned items, so they no longer appear under buy back.
    Object.getOwnPropertyNames(inventory)
      .filter((id) => inventory[id].isReturned)
      .forEach((id) => delete inventory[id]);

    const merchantOffersIndex = levelValue - 1;

    if (MERCHANT_OFFERS[merchantOffersIndex]) {
      // Merchant always offers one of each (low quality) gear at the current level, even if previously sold.
      const gearSettings = {
        hasPrefix: true,
        isNSFW: nsfwValue,
        level: levelValue,
        tags: [AffixTag.LowQuality],
      };

      MERCHANT_OFFERS[merchantOffersIndex].forEach((item) => {
        const id = nanoid();
        const inventoryContentsBase = {
          isReturned: false,
          key: nanoid(),
        };

        if (isItem(item)) {
          inventory[id] = {
            ...inventoryContentsBase,
            item,
          };
        } else {
          const gear = (() => {
            if ("armorClass" in item) {
              return generateArmor({
                ...gearSettings,
                ...item,
              });
            }

            if ("weaponClass" in item) {
              return generateWeapon({
                ...gearSettings,
                ...item,
              });
            }

            return generateShield({
              ...gearSettings,
              ...item,
            });
          })();

          inventory[id] = {
            ...inventoryContentsBase,
            item: gear,
          };
        }
      });

      set(merchantInventory, inventory);
    }
  },
});

export const levelUp = selector({
  get: () => null,
  key: "levelUp",
  set: ({ get, set }) => {
    const levelValue = get(level);
    const nextLevel = levelValue + 1;

    CREW_ORDER.forEach((type) => {
      const { hireStatus, monologueProgress } = get(crew(type));
      const isShowingCrewHiring = isShowing(ShowingType.CrewHiring);

      const { hirableLevel, monologues } = CREW_MEMBERS[type];

      // Progress the monologue for all hired crew members.
      if (hireStatus === CrewStatus.Hired && monologueProgress < monologues.length - 1) {
        set(crew(type), (current) => ({
          ...current,
          monologueProgress: current.monologueProgress + 1,
        }));
      }

      // Make crew member hirable if the appropriate level has been reached.
      if (hireStatus === CrewStatus.Unavailable && nextLevel >= hirableLevel) {
        set(crew(type), (current) => ({
          ...current,
          hireStatus: CrewStatus.Hirable,
        }));

        if (!get(isShowingCrewHiring)) {
          set(isShowingCrewHiring, true);
        }
      }
    });

    set(level, nextLevel);
    set(progress, 0);
    set(monsterCreate, null);
  },
});

export const lootDrop = selector({
  get: () => null,
  key: "lootDrop",
  set: ({ get, set }) => {
    const { essence, scrap } = get(monsterLoot);

    if (essence > 0) {
      set(essenceLoot, (current) => current + essence);
    }

    if (scrap > 0) {
      set(scrapLoot, (current) => current + scrap);
    }

    set(progress, (current) => current + 1);

    if (!get(isShowing(ShowingType.Attributes))) {
      set(isShowing(ShowingType.Attributes), true);
    }
  },
});

export const monsterCreate = selector({
  get: () => null,
  key: "monsterCreate",
  set: ({ get, set }) => {
    set(
      monsterName,
      LOCRA.generateCreature({
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(get(level) / 2),
        isNSFW: get(isNSFW),
        type: CreatureType.Monster,
      })
    );

    set(isMonsterEngaged, false);
    set(currentHealthMonster, get(maximumHealthMonster));
    set(isMonsterNew, true);
  },
});

export const monsterRegenerate = selector({
  get: () => null,
  key: "monsterRegenerate",
  set: ({ get, set }) => {
    const maximumHealthMonsterValue = get(maximumHealthMonster);
    const difference = maximumHealthMonsterValue - get(currentHealthMonster);

    if (difference > 0) {
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Positive,
        value: `+${difference}`,
      });
    }

    set(currentHealthMonster, maximumHealthMonsterValue);
  },
});

export const offense = selector({
  get: () => null,
  key: "offense",
  set: ({ get, set }) => {
    const { staminaCost } = get(weapon);

    if (get(canAttack)) {
      const totalDamageValue = get(totalDamage);
      const hasInflictedBleed =
        get(monsterBleedingDuration) === 0 &&
        get(skills(SkillType.Bleed)) &&
        Math.random() <= get(totalBleedChance);

      let monsterHealth = get(currentHealthMonster) - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      if (staminaCost > 0) {
        set(staminaChange, { value: -staminaCost });
      }

      set(currentHealthMonster, monsterHealth);
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingText.Negative,
        value: -totalDamageValue,
      });

      if (hasInflictedBleed) {
        set(monsterBleedingDuration, BLEED_DURATION);
      }

      animateElement({
        element: get(monsterStatusElement),
        speed: AnimationSpeed.Fast,
        type: AnimationType.HeadShake,
      });
    } else {
      set(deltas(DeltaType.Stamina), [
        {
          color: FloatingText.Neutral,
          value: "CANNOT ATTACK",
        },
        {
          color: FloatingText.Negative,
          value: ` (${staminaCost})`,
        },
      ]);
    }
  },
});

export const resourcesBalance = selector({
  get: () => ({}),
  key: "resourcesBalance",
  set: (
    { get, set },
    difference:
      | Partial<{
          coinsDifference: number;
          essenceDifference: number;
          scrapDifference: number;
        }>
      | DefaultValue
  ) => {
    if (difference instanceof DefaultValue) {
      return;
    }

    const { coinsDifference, essenceDifference, scrapDifference } = difference;
    const isLooting =
      coinsDifference === undefined &&
      essenceDifference === undefined &&
      scrapDifference === undefined;
    const coinsValue = isLooting ? get(coinsLoot) : coinsDifference || 0;
    const essenceValue = isLooting ? get(essenceLoot) : essenceDifference || 0;
    const scrapValue = isLooting ? get(scrapLoot) : scrapDifference || 0;

    if (coinsValue !== 0) {
      set(coins, (current) => current + coinsValue);

      if (!get(isShowing(ShowingType.Coins))) {
        set(isShowing(ShowingType.Coins), true);
      }

      if (isLooting) {
        set(coinsLoot, 0);
      }
    }

    if (essenceValue !== 0) {
      set(essence, (current) => current + essenceValue);

      if (!get(isShowing(ShowingType.Essence))) {
        set(isShowing(ShowingType.Essence), true);
      }

      if (!get(isShowing(ShowingType.AttributesButton))) {
        set(isShowing(ShowingType.AttributesButton), true);
      }

      if (isLooting) {
        set(essenceLoot, 0);
      }
    }

    if (scrapValue !== 0) {
      set(scrap, (current) => current + scrapValue);

      if (!get(isShowing(ShowingType.Scrap))) {
        set(isShowing(ShowingType.Scrap), true);
      }

      if (isLooting) {
        set(scrapLoot, 0);
      }
    }
  },
});

export const staminaChange = selector<DeltaReserve>({
  get: () => DEFAULT_RESERVE_CHANGE,
  key: "staminaChange",
  set: ({ get, set }, change) => {
    if (change instanceof DefaultValue) {
      return;
    }

    const { value } = change;
    const max = get(maximumStamina);
    let newStamina = get(currentStamina) + value;

    set(deltas(DeltaType.Stamina), {
      color: value > 0 ? FloatingText.Positive : FloatingText.Negative,
      value: value > 0 ? `+${value}` : value,
    });

    if (newStamina < 0) {
      newStamina = 0;
    }

    if (newStamina > max) {
      newStamina = max;
    }

    set(currentStamina, newStamina);
  },
});
