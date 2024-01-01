import { nanoid } from "nanoid";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

import {
  GEM_DROP_CHANCE,
  INFUSABLES,
  TORN_MANUSCRIPT_DROP_CHANCE,
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
  POISON,
} from "@neverquest/data/monster";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { bleed } from "@neverquest/state/ailments";
import { merchantInventory } from "@neverquest/state/caravan";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import {
  encounter,
  isStageStarted,
  progress,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { infusionEffect } from "@neverquest/state/items";
import { range } from "@neverquest/state/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getFromRange,
  getLinearMapping,
  getSigmoid,
  getTriangular,
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
          factor: getSigmoid(getLinearMapping({ offset: requiredStage, stage: stageValue })),
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
  selectorFamily({
    get:
      (ailment: MonsterAilment) =>
      ({ get }) =>
        get(monsterAilmentDuration(ailment)) > 0,
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
      const { attenuation, base, bonus, boss, finality, minimum } = MONSTER_ATTACK_RATE;
      const encounterValue = get(encounter);
      const factor = getTriangular(get(stage)) / attenuation;

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
      const factor = getTriangular(get(stage)) / attenuation;

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
          damageModifierChance: get(isMonsterAiling("stunned"))
            ? AILMENT_PENALTY.stunned
            : undefined,
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
      const factor = getTriangular(get(stage)) / attenuation;

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
      const { base: tornManuscriptDropChanceBase, increment } = TORN_MANUSCRIPT_DROP_CHANCE;
      const { attenuation, base: essenceBase, bonus, boss } = ESSENCE;

      const encounterValue = get(encounter);
      const merchantInventoryValue = get(merchantInventory);
      const ownedItemMysteriousEgg = get(ownedItem("mysterious egg"));
      const stageValue = get(stage);
      const stageMaximumValue = get(stageMaximum);

      return {
        essence: Math.round(
          (essenceBase + (essenceBase * getTriangular(stageValue)) / attenuation) * 1 +
            get(progress) *
              bonus *
              (encounterValue === "boss" ? boss : 1) *
              (1 + get(infusionEffect("monkey paw"))),
        ),
        gems:
          encounterValue === "boss"
            ? Array.from({
                length: 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL),
              })
                .map(() => {
                  const { equalStage, lowerStage } = GEM_DROP_CHANCE;

                  return Math.random() <= (stageValue < stageMaximumValue ? lowerStage : equalStage)
                    ? 1
                    : 0;
                })
                .reduce<number>((sum, gemCount) => sum + gemCount, 0)
            : 0,
        trinket:
          // Mysterious egg drops only if Res Dominus has just been defeated while carrying the antique coin and if the egg is neither carried nor sold.
          get(ownedItem("antique coin")) !== undefined &&
          encounterValue === "res dominus" &&
          ownedItemMysteriousEgg === undefined &&
          !merchantInventoryValue.some(({ name }) => name === "mysterious egg")
            ? { ...INFUSABLES["mysterious egg"].item, ID: nanoid() }
            : // Torn manuscript drops only if it's not currently carried or sold, the antique coin & mysterious egg are both carried, and if the drop chance is reached.
              get(ownedItem("antique coin")) !== undefined &&
                ownedItemMysteriousEgg !== undefined &&
                !merchantInventoryValue.some(({ name }) => name === "torn manuscript") &&
                get(ownedItem("torn manuscript")) === undefined &&
                Math.random() <= tornManuscriptDropChanceBase + increment * stageValue
              ? { ...TRINKETS["torn manuscript"].item, ID: nanoid() }
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
        requiredStage,
      } = POISON;

      if (stageValue < requiredStage) {
        return 0;
      }

      if (encounterValue === "res cogitans" || encounterValue === "res dominus") {
        return finality;
      }

      return (
        getFromRange({
          factor: getSigmoid(getLinearMapping({ offset: requiredStage, stage: stageValue })),
          maximum,
          minimum,
        }) * (encounterValue === "boss" ? boss : 1)
      );
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
    effects: (ailment) => [handleLocalStorage({ key, parameter: ailment })],
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
