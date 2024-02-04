import { nanoid } from "nanoid";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { PROGRESS } from "@neverquest/data/encounter";
import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { GEM_DROP_CHANCE, INFUSABLES, RELICS, RELIC_DROP_CHANCE } from "@neverquest/data/items";
import {
  BLIGHT,
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  ESSENCE,
  FRAILTY,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
  POISON,
  RAGE,
} from "@neverquest/data/monster";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import { bleed } from "@neverquest/state/ailments";
import { isHired, merchantInventory } from "@neverquest/state/caravan";
import { handleStorage } from "@neverquest/state/effects/handleStorage";
import {
  encounter,
  isStageStarted,
  progress,
  retirementStage,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { infusionEffect } from "@neverquest/state/items";
import { range } from "@neverquest/state/statistics";
import { isFinality } from "@neverquest/types/type-guards";
import type { Ailment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getFromRange,
  getLinearMapping,
  getPerkEffect,
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

      if (isFinality(encounterValue)) {
        return finality[encounterValue];
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

export const frailty = withStateKey("frailty", (key) =>
  selector({
    get: ({ get }) => {
      if (isFinality(get(encounter))) {
        return 0;
      }

      if (get(ownedItem("familiar")) !== undefined) {
        return FRAILTY.familiar;
      }

      if (get(ownedItem("mysterious egg")) !== undefined) {
        return getFromRange({
          factor: getSigmoid(get(infusionEffect("mysterious egg")) * LEVELLING_MAXIMUM),
          ...FRAILTY["mysterious egg"],
        });
      }

      return 0;
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

export const isEnraged = withStateKey("isEnraged", (key) =>
  selector({
    get: ({ get }) => get(rage) === RAGE.maximum,
    key,
  }),
);

export const isMonsterAiling = withStateKey("isMonsterAiling", (key) =>
  selectorFamily({
    get:
      (ailment: Ailment) =>
      ({ get }) =>
        get(monsterAilmentDuration(ailment)) > 0,
    key,
  }),
);

export const isMonsterAtFullHealth = withStateKey("isMonsterAtFullHealth", (key) =>
  selector({
    get: ({ get }) => get(monsterHealth) === get(monsterHealthMaximum),
    key,
  }),
);

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isStageStarted) && get(monsterHealth) === 0,
    key,
  }),
);

export const isMonsterRegenerating = withStateKey("isMonsterRegenerating", (key) =>
  selector({
    get: ({ get }) => get(monsterRegenerationDuration) > 0,
    key,
  }),
);

export const monsterAttackRate = withStateKey("monsterAttackRate", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss, finality, minimum } = MONSTER_ATTACK_RATE;
      const encounterValue = get(encounter);
      const factor = getTriangular(get(stage)) / attenuation;

      if (isFinality(encounterValue)) {
        return finality[encounterValue];
      }

      return Math.round(
        Math.max(
          (base - base * factor * (1 + Math.min(get(progress), PROGRESS.maximum) * bonus)) *
            (encounterValue === "boss" ? boss : 1),
          minimum,
        ) * (get(isEnraged) ? RAGE.effect : 1),
      );
    },
    key,
  }),
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const {
        attenuation,
        base,
        bonus,
        boss,
        finality,
        menace: { maximum, minimum, requiredStage },
      } = MONSTER_DAMAGE;
      const encounterValue = get(encounter);
      const stageValue = get(stage);
      const factor = getTriangular(stageValue) / attenuation;

      if (isFinality(encounterValue)) {
        return finality[encounterValue];
      }

      return Math.round(
        (base + base * factor * (1 + Math.min(get(progress), PROGRESS.maximum) * bonus)) *
          (encounterValue === "boss" ? boss : 1) *
          (1 +
            (stageValue >= requiredStage
              ? getFromRange({
                  factor: getSigmoid(
                    getLinearMapping({ offset: requiredStage, stage: stageValue }),
                  ),
                  maximum,
                  minimum,
                })
              : 0)) *
          (1 - get(frailty)),
      );
    },
    key,
  }),
);

export const monsterDamageAiling = withStateKey("monsterDamageAiling", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(monsterDamage) * (get(isMonsterAiling("shocked")) ? 1 - AILMENT_PENALTY.shocked : 1),
      ),
    key,
  }),
);

export const monsterDamageAilingPerSecond = withStateKey("monsterDamageAilingPerSecond", (key) =>
  selector({
    get: ({ get }) => {
      const { frozen, stunned } = AILMENT_PENALTY;

      return formatNumber({
        format: "float",
        value: getDamagePerRate({
          damage: get(monsterDamageAiling),
          damageModifier: 0,
          damageModifierChance: get(isMonsterAiling("stunned")) ? stunned : undefined,
          rate: get(monsterAttackRate),
          rateModifier: get(isMonsterAiling("frozen")) ? frozen : undefined,
        }),
      });
    },
    key,
  }),
);

export const monsterHealthMaximum = withStateKey("monsterHealthMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const {
        attenuation,
        base,
        bonus,
        boss,
        finality,
        menace: { maximum, minimum, requiredStage },
      } = MONSTER_HEALTH;
      const encounterValue = get(encounter);
      const stageValue = get(stage);
      const factor = getTriangular(stageValue) / attenuation;

      if (isFinality(encounterValue)) {
        return finality[encounterValue];
      }

      return Math.round(
        (base + base * factor * (1 + Math.min(get(progress), PROGRESS.maximum) * bonus)) *
          (encounterValue === "boss" ? boss : 1) *
          (1 +
            (stageValue >= requiredStage
              ? getFromRange({
                  factor: getSigmoid(
                    getLinearMapping({ offset: requiredStage, stage: stageValue }),
                  ),
                  maximum,
                  minimum,
                })
              : 0)) *
          (1 - get(frailty)),
      );
    },
    key,
  }),
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base: essenceBase, bonus, boss } = ESSENCE;

      const encounterValue = get(encounter);
      const isMementoOwned = get(ownedItem("memento")) !== undefined;
      const merchantInventoryValue = get(merchantInventory);
      const stageValue = get(stage);
      const stageMaximumValue = get(stageMaximum);

      return {
        essence: Math.round(
          ((essenceBase + (essenceBase * getTriangular(stageValue)) / attenuation) * 1 +
            (1 + Math.min(get(progress), PROGRESS.maximum)) *
              bonus *
              (encounterValue === "boss" ? boss : 1)) *
            (1 + getPerkEffect({ perk: "essenceBonus", stage: get(retirementStage) })),
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
        relic:
          encounterValue === "boss" || get(ownedItem("knapsack")) === undefined
            ? undefined
            : // Mysterious egg only drops after defeating Res Dominus while carrying the Memento and if the egg and the familiar are neither carried nor sold.
              encounterValue === "res dominus" &&
                isMementoOwned &&
                get(ownedItem("mysterious egg")) === undefined &&
                get(ownedItem("familiar")) === undefined &&
                !merchantInventoryValue.some(({ name }) =>
                  ["familiar", "mysterious egg"].includes(name),
                )
              ? { ...INFUSABLES["mysterious egg"].item, ID: nanoid() }
              : // Log Entry only drops after defeating Res Dominus while carrying the Memento and if it's neither currently carried nor sold.
                encounterValue === "res dominus" &&
                  isMementoOwned &&
                  get(ownedItem("[P71NQ]")) === undefined &&
                  !merchantInventoryValue.some(({ name }) => name === "[P71NQ]")
                ? { ...RELICS["[P71NQ]"].item, ID: nanoid() }
                : // Torn manuscript drops if it's neither currently carried nor sold, if the memento is carried, if the correct crew member is hired and if the drop chance is reached.
                  isMementoOwned &&
                    get(ownedItem("torn manuscript")) === undefined &&
                    !merchantInventoryValue.some(({ name }) => name === "torn manuscript") &&
                    get(isHired(RELIC_DROP_CHANCE["torn manuscript"].requiredCrew)) &&
                    Math.random() <=
                      getFromRange({
                        factor: getSigmoid(stageValue),
                        ...RELIC_DROP_CHANCE["torn manuscript"],
                      })
                  ? { ...RELICS["torn manuscript"].item, ID: nanoid() }
                  : // Dream catcher drops if it's neither currently carried nor sold, if the memento is carried, if the correct crew member is hired and if the drop chance is reached.
                    isMementoOwned &&
                      get(ownedItem("dream catcher")) === undefined &&
                      !merchantInventoryValue.some(({ name }) => name === "dream catcher") &&
                      get(isHired(RELIC_DROP_CHANCE["dream catcher"].requiredCrew)) &&
                      Math.random() <=
                        getFromRange({
                          factor: getSigmoid(stageValue),
                          ...RELIC_DROP_CHANCE["dream catcher"],
                        })
                    ? { ...RELICS["dream catcher"].item, ID: nanoid() }
                    : // Memento drops if it's neither currently carried nor sold and if the drop chance is reached.
                      !isMementoOwned &&
                        !merchantInventoryValue.some(({ name }) => name === "memento") &&
                        Math.random() <=
                          getFromRange({
                            factor: getSigmoid(stageValue),
                            ...RELIC_DROP_CHANCE.memento,
                          })
                      ? { ...RELICS.memento.item, ID: nanoid() }
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

      if (isFinality(encounterValue)) {
        return finality[encounterValue];
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
    effects: [handleStorage({ key })],
    key,
  }),
);

export const distance = withStateKey("distance", (key) =>
  atom({
    default: range,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const isMonsterNew = withStateKey("isMonsterNew", (key) =>
  atom({
    default: true,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const monsterAilmentDuration = withStateKey("monsterAilmentDuration", (key) =>
  atomFamily<number, Ailment>({
    default: 0,
    effects: (ailment) => [handleStorage({ key, parameter: ailment })],
    key,
  }),
);

export const monsterAttackDuration = withStateKey("monsterAttackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const monsterElement = withStateKey("monsterElement", (key) =>
  atom<HTMLDivElement | null>({
    // eslint-disable-next-line unicorn/no-null
    default: null,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const monsterHealth = withStateKey("monsterHealth", (key) =>
  atom({
    default: monsterHealthMaximum,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const monsterName = withStateKey("monsterName", (key) =>
  atom<string | undefined>({
    default: undefined,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const monsterRegenerationDuration = withStateKey("monsterRegenerationDuration", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const rage = withStateKey("rage", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);
