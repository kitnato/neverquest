import { atomFamily, selector, selectorFamily } from "recoil";

import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { MASTERIES, MASTERY_COST_BASE } from "@neverquest/data/masteries";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { shield, weapon } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isMelee, isRanged, isUnshielded } from "@neverquest/types/type-guards";
import { MASTERY_TYPES, type Mastery } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const canTrainMastery = withStateKey("canTrainMastery", (key) =>
  selectorFamily<boolean, Mastery>({
    get:
      (mastery) =>
      ({ get }) => {
        const hasRequiredSkill = get(isSkillAcquired(MASTERIES[mastery].requiredSkill));

        switch (mastery) {
          case "butchery": {
            const weaponValue = get(weapon);

            return hasRequiredSkill && isMelee(weaponValue) && weaponValue.grip === "two-handed";
          }

          case "cruelty": {
            return hasRequiredSkill && get(weapon).gearClass === "piercing";
          }

          case "finesse": {
            return hasRequiredSkill && get(weapon).gearClass === "slashing";
          }

          case "marksmanship": {
            return hasRequiredSkill && isRanged(get(weapon));
          }

          case "might": {
            return hasRequiredSkill && get(weapon).gearClass === "blunt";
          }

          case "resilience": {
            return hasRequiredSkill;
          }

          case "stability": {
            return hasRequiredSkill && !isUnshielded(get(shield));
          }
        }
      },
    key,
  }),
);

export const isMasteryAtMaximum = withStateKey("isMasteryAtMaximum", (key) =>
  selectorFamily<boolean, Mastery>({
    get:
      (mastery) =>
      ({ get }) =>
        get(masteryRank(mastery)) === LEVELLING_MAXIMUM,
    key,
  }),
);

export const masteryCost = withStateKey("masteryCost", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (mastery) =>
      ({ get }) =>
        getGrowthTriangular(get(masteryRank(mastery)) + MASTERY_COST_BASE),
    key,
  }),
);

export const masteryStatistic = withStateKey("masteryStatistic", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (mastery) =>
      ({ get }) => {
        const { base, increment } = MASTERIES[mastery];
        const masteryRankValue = get(masteryRank(mastery));

        return getComputedStatistic({ amount: masteryRankValue, base, increment });
      },
    key,
  }),
);

export const unlockedMasteries = withStateKey("unlockedMasteries", (key) =>
  selector({
    get: ({ get }) => {
      const currentUnlockedMasteries = {} as Record<Mastery, boolean>;

      for (const mastery of MASTERY_TYPES) {
        currentUnlockedMasteries[mastery] = get(isSkillAcquired(MASTERIES[mastery].requiredSkill));
      }

      return currentUnlockedMasteries;
    },
    key,
  }),
);

// ATOMS

export const masteryProgress = withStateKey("masteryProgress", (key) =>
  atomFamily<number, Mastery>({
    default: 0,
    effects: (mastery) => [handleLocalStorage({ key, parameter: mastery })],
    key,
  }),
);

export const masteryRank = withStateKey("masteryRank", (key) =>
  atomFamily<number, Mastery>({
    default: 0,
    effects: (mastery) => [handleLocalStorage({ key, parameter: mastery })],
    key,
  }),
);
