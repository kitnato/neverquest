import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { RETIREMENT_MINIMUM_LEVEL } from "@neverquest/data/general";
import { DROP_CHANCES, ELEMENTALS, INFUSABLES, TRINKETS } from "@neverquest/data/inventory";
import {
  BLIGHT,
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  ESSENCE,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
  POISON,
} from "@neverquest/data/monster";
import { AILMENT_PENALTY, BLEED } from "@neverquest/data/statistics";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { encounter, isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { range, shield, totalElementalEffects, weapon } from "@neverquest/state/gear";
import { ownedItem } from "@neverquest/state/inventory";
import { infusablePower } from "@neverquest/state/items";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import {
  ELEMENTAL_TYPES,
  MONSTER_AILMENT_TYPES,
  type MonsterAilment,
} from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getFromRange,
  getGrowthSigmoid,
  getGrowthTriangular,
  getLinearMapping,
} from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => BLEED[get(isTraitAcquired("shredder")) ? "shredder" : "default"],
    key,
  }),
);

export const bleedingDeltaLength = withStateKey("bleedingDeltaLength", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = get(bleed);

      return Math.round(duration / ticks);
    },
    key,
  }),
);

export const blightChance = withStateKey("blightChance", (key) =>
  selector({
    get: ({ get }) => {
      const encounterValue = get(encounter);
      const stageValue = get(stage);

      const {
        boss,
        chance: { maximum, minimum },
        finality,
        stageRequired,
      } = BLIGHT;

      if (stageValue < stageRequired) {
        return 0;
      }

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return (
        getFromRange({
          factor: getGrowthSigmoid(getLinearMapping({ offset: stageRequired, stage: stageValue })),
          maximum,
          minimum,
        }) * (encounterValue === "boss" ? boss : 1)
      );
    },
    key,
  }),
);

export const canReceiveAilment = withStateKey("canReceiveAilment", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (parameter) =>
      ({ get }) => {
        const { abilityChance, gearClass } = get(weapon);

        switch (parameter) {
          case "bleeding": {
            return get(isSkillAcquired("anatomy")) && abilityChance > 0 && gearClass === "piercing";
          }

          case "staggered": {
            return get(isSkillAcquired("shieldcraft")) && get(shield).stagger > 0;
          }

          case "stunned": {
            return (
              get(isSkillAcquired("traumatology")) && abilityChance > 0 && gearClass === "blunt"
            );
          }

          case "burning":
          case "frozen":
          case "shocked": {
            const elemental = ELEMENTAL_TYPES.find(
              (current) => ELEMENTALS[current].ailment === parameter,
            );
            const { armor, weapon } = get(totalElementalEffects);

            return elemental === undefined
              ? false
              : armor[elemental].duration > 0 || weapon[elemental].duration > 0;
          }
        }
      },
    key,
  }),
);

export const canReceiveAilments = withStateKey("canReceiveAilments", (key) =>
  selector({
    get: ({ get }) => MONSTER_AILMENT_TYPES.some((current) => get(canReceiveAilment(current))),
    key,
  }),
);

export const hasMonsterClosed = withStateKey("hasMonsterClosed", (key) =>
  selector({
    get: ({ get }) => get(distance) === 0,
    key,
  }),
);

export const isMonsterAiling = withStateKey("isMonsterAiling", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (parameter) =>
      ({ get }) =>
        get(monsterAilmentDuration(parameter)) > 0,
    key,
  }),
);

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isStageStarted) && get(monsterHealth) === 0,
    key,
  }),
);

export const monsterAttackRate = withStateKey("monsterAttackRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, bonus, boss, finality, minimum } = MONSTER_ATTACK_RATE;
      const encounterValue = get(encounter);
      const factor = getGrowthSigmoid(get(stage));

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return Math.round(
        Math.max(
          base -
            base * factor * (1 + get(progress) * bonus) * (encounterValue === "boss" ? boss : 1),
          minimum,
        ),
      );
    },
    key,
  }),
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss, finality } = MONSTER_DAMAGE;
      const encounterValue = get(encounter);
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return Math.round(
        (base + base * factor * (1 + get(progress) * bonus)) *
          (encounterValue === "boss" ? boss : 1),
      );
    },
    key,
  }),
);

export const monsterDamagePerSecond = withStateKey("monsterDamagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      formatNumber({
        format: "float",
        value: getDamagePerRate({
          attackRate: get(monsterAttackRate),
          damage: get(monsterDamage),
        }),
      }),
    key,
  }),
);

export const monsterDamageAiling = withStateKey("monsterDamageAiling", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(monsterDamage) * (get(isMonsterAiling("shocked")) ? AILMENT_PENALTY.shocked : 1),
      ),
    key,
  }),
);

export const monsterDamageAilingPerSecond = withStateKey("monsterDamageAilingPerSecond", (key) =>
  selector({
    get: ({ get }) =>
      get(isMonsterAiling("stunned"))
        ? formatNumber({
            format: "float",
            value: getDamagePerRate({
              attackRate: get(monsterAttackRate),
              damage: get(monsterDamageAiling),
              damageModifier: 0,
              damageModifierChance: AILMENT_PENALTY.stunned,
            }),
          })
        : get(monsterDamagePerSecond),
    key,
  }),
);

export const monsterHealthMaximum = withStateKey("monsterHealthMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss, finality } = MONSTER_HEALTH;
      const encounterValue = get(encounter);
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return Math.round(
        (base + base * factor * (1 + get(progress) * bonus)) *
          (encounterValue === "boss" ? boss : 1),
      );
    },
    key,
  }),
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss } = ESSENCE;

      const encounterValue = get(encounter);
      const stageValue = get(stage);
      const factor = getGrowthTriangular(stageValue) / attenuation;

      const hasMysteriousEggDropped =
        stageValue >= RETIREMENT_MINIMUM_LEVEL &&
        get(ownedItem("antique coin")) !== undefined &&
        get(ownedItem("mysterious egg")) === undefined &&
        Math.random() <= DROP_CHANCES["mysterious egg"];
      const hasTornManuscriptDropped =
        stageValue >= RETIREMENT_MINIMUM_LEVEL &&
        get(ownedItem("mysterious egg")) !== undefined &&
        get(ownedItem("torn manuscript")) === undefined &&
        Math.random() <= DROP_CHANCES["torn manuscript"];

      return {
        essence: Math.round(
          (base + base * factor) * 1 +
            get(progress) *
              bonus *
              (encounterValue === "boss" ? boss : 1) *
              (1 + get(infusablePower("monkey paw"))),
        ),
        gems:
          encounterValue === "boss"
            ? 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL)
            : 0,
        trinket: hasMysteriousEggDropped
          ? INFUSABLES["mysterious egg"].item
          : hasTornManuscriptDropped
            ? TRINKETS["torn manuscript"].item
            : undefined,
      };
    },
    key,
  }),
);

export const poisonChance = withStateKey("poisonChance", (key) =>
  selector({
    get: ({ get }) => {
      const encounterValue = get(encounter);
      const stageValue = get(stage);

      const {
        boss,
        chance: { maximum, minimum },
        finality,
        stageRequired,
      } = POISON;

      if (stageValue < stageRequired) {
        return 0;
      }

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return (
        getFromRange({
          factor: getGrowthSigmoid(getLinearMapping({ offset: stageRequired, stage: stageValue })),
          maximum,
          minimum,
        }) * (encounterValue === "boss" ? boss : 1)
      );
    },
    key,
  }),
);

export const poisonLength = withStateKey("poisonLength", (key) =>
  selector({
    get: ({ get }) => {
      const {
        duration: { maximum, minimum },
        stageRequired,
      } = POISON;

      return getFromRange({
        factor: getGrowthSigmoid(
          getLinearMapping({
            offset: stageRequired,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

export const poisonMagnitude = withStateKey("poisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const {
        magnitude: { maximum, minimum },
        stageRequired,
      } = POISON;

      return getFromRange({
        factor: getGrowthSigmoid(
          getLinearMapping({
            offset: stageRequired,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

// ATOMS

export const bleedingDelta = withStateKey("bleedingDelta", (key) =>
  atom({
    default: bleedingDeltaLength,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const distance = withStateKey("distance", (key) =>
  atom({
    default: range,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isMonsterNew = withStateKey("isMonsterNew", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterAilmentDuration = withStateKey("monsterAilmentDuration", (key) =>
  atomFamily<number, MonsterAilment>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const monsterAttackDuration = withStateKey("monsterAttackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterElement = withStateKey("monsterElement", (key) =>
  atom<HTMLDivElement | null>({
    // eslint-disable-next-line unicorn/no-null
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterHealth = withStateKey("monsterHealth", (key) =>
  atom({
    default: monsterHealthMaximum,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterName = withStateKey("monsterName", (key) =>
  atom<string | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
