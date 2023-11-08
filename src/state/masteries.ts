import { atomFamily, selector, selectorFamily } from "recoil";

import { MASTERIES, MASTERY_COST_BASE, MASTERY_RANK_MAXIMUM } from "@neverquest/data/masteries";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { MASTERY_TYPES, type Mastery } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isMasteryAtMaximum = withStateKey("isMasteryAtMaximum", (key) =>
  selectorFamily<boolean, Mastery>({
    get:
      (parameter) =>
      ({ get }) =>
        get(masteryRank(parameter)) === MASTERY_RANK_MAXIMUM,
    key,
  }),
);

export const masteryCost = withStateKey("masteryCost", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (parameter) =>
      ({ get }) =>
        getGrowthTriangular(get(masteryRank(parameter)) + MASTERY_COST_BASE),
    key,
  }),
);

export const masteryStatistic = withStateKey("masteryStatistic", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment } = MASTERIES[parameter];
        const masteryRankValue = get(masteryRank(parameter));

        return getComputedStatistic({ amount: masteryRankValue, base, increment });
      },
    key,
  }),
);

export const unlockedMasteries = withStateKey("unlockedMasteries", (key) =>
  selector({
    get: ({ get }) =>
      MASTERY_TYPES.reduce(
        (aggregator, current) => ({ ...aggregator, [current]: get(isMasteryUnlocked(current)) }),
        {} as Record<Mastery, boolean>,
      ),
    key,
  }),
);

// ATOMS

export const isMasteryUnlocked = withStateKey("isMasteryUnlocked", (key) =>
  atomFamily<boolean, Mastery>({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const masteryProgress = withStateKey("masteryProgress", (key) =>
  atomFamily<number, Mastery>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const masteryRank = withStateKey("masteryRank", (key) =>
  atomFamily<number, Mastery>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
