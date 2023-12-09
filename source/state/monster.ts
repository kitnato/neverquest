import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { merchantInventory } from "./caravan";
import { RETIREMENT_MINIMUM_LEVEL } from "@neverquest/data/general";
import {
  DROP_CHANCES,
  DROP_CHANCES_OVERRIDE,
  GEM_DROP_CHANCE,
  INFUSABLES,
  TRINKETS,
} from "@neverquest/data/items";
import {
  BLIGHT,
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  ESSENCE,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
} from "@neverquest/data/monster";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { bleed } from "@neverquest/state/ailments";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import {
  encounter,
  isStageStarted,
  progress,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { infusablePower } from "@neverquest/state/items";
import { range } from "@neverquest/state/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
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

const bleedingDeltaLength = withStateKey("bleedingDeltaLength", (key) =>
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
        requiredStage,
      } = BLIGHT;

      if (stageValue < requiredStage) {
        return 0;
      }

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return (
        getFromRange({
          factor: getGrowthSigmoid(getLinearMapping({ offset: requiredStage, stage: stageValue })),
          maximum,
          minimum,
        }) * (encounterValue === "boss" ? boss : 1)
      );
    },
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
      formatNumber({
        format: "float",
        value: getDamagePerRate({
          damage: get(monsterDamageAiling),
          damageModifier: 0,
          damageModifierChance: get(isMonsterAiling("stunned")) ? AILMENT_PENALTY.stunned : 0,
          rate: get(monsterAttackRate),
        }),
      }),
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
      const { factor: dropChanceOverrideFactor, stage: dropChanceOverrideStage } =
        DROP_CHANCES_OVERRIDE;
      const { attenuation, base, bonus, boss } = ESSENCE;

      const encounterValue = get(encounter);
      const merchantInventoryValue = get(merchantInventory);
      const ownedItemAntiqueCoin = get(ownedItem("antique coin"));
      const ownedItemMysteriousEgg = get(ownedItem("mysterious egg"));
      const stageValue = get(stage);
      const stageMaximumValue = get(stageMaximum);

      const factor = getGrowthTriangular(stageValue) / attenuation;
      const maximumGems = 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL);

      const hasMysteriousEggDropped =
        stageValue >= RETIREMENT_MINIMUM_LEVEL &&
        ownedItemAntiqueCoin !== undefined &&
        ownedItemMysteriousEgg === undefined &&
        !merchantInventoryValue.some(({ ID }) => ID === INFUSABLES["mysterious egg"].item.ID) &&
        Math.random() <=
          DROP_CHANCES["mysterious egg"] *
            (stageValue === dropChanceOverrideStage ? dropChanceOverrideFactor : 1);
      const hasTornManuscriptDropped =
        stageValue >= RETIREMENT_MINIMUM_LEVEL &&
        ownedItemAntiqueCoin !== undefined &&
        ownedItemMysteriousEgg !== undefined &&
        !merchantInventoryValue.some(({ ID }) => ID === TRINKETS["torn manuscript"].item.ID) &&
        get(ownedItem("torn manuscript")) === undefined &&
        Math.random() <=
          DROP_CHANCES["torn manuscript"] *
            (stageValue === dropChanceOverrideStage ? dropChanceOverrideFactor : 1);

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
            ? Array.from({ length: maximumGems })
                .map(() => {
                  const { equalStage, lowerStage } = GEM_DROP_CHANCE;

                  return Math.random() <= (stageValue < stageMaximumValue ? lowerStage : equalStage)
                    ? 1
                    : 0;
                })
                .reduce<number>((sum, gemCount) => sum + gemCount, 0)
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
