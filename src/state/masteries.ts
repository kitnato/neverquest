import { atomFamily, selector, selectorFamily } from "recoil";

import { MASTERIES, MASTERY_COST } from "@neverquest/data/masteries";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Mastery } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

// SELECTORS

export const isMasteryAtMaximum = withStateKey("isMasteryAtMaximum", (key) =>
  selectorFamily<boolean, Mastery>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment, maximum } = MASTERIES[parameter];
        const masteryRankValue = get(masteryRank(parameter));

        return maximum === getComputedStatistic({ amount: masteryRankValue, base, increment });
      },
    key,
  }),
);

export const masteriesAcquired = withStateKey("masteriesAcquired", (key) =>
  selector<Record<Mastery, boolean>>({
    get: ({ get }) => ({
      butchery: get(isMasteryUnlocked("butchery")),
      cruelty: get(isMasteryUnlocked("cruelty")),
      finesse: get(isMasteryUnlocked("finesse")),
      marksmanship: get(isMasteryUnlocked("marksmanship")),
      might: get(isMasteryUnlocked("might")),
      resilience: get(isMasteryUnlocked("resilience")),
      stability: get(isMasteryUnlocked("stability")),
    }),
    key,
  }),
);

export const masteryCost = withStateKey("masteryCost", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (parameter) =>
      ({ get }) =>
        getGrowthTriangular(get(masteryRank(parameter)) + MASTERY_COST),
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
