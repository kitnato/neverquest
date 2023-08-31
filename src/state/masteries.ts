import { atomFamily, selectorFamily } from "recoil";

import { MASTERIES } from "@neverquest/data/masteries";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { UnlockedState } from "@neverquest/types";
import type { Mastery } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

type MasteryState = UnlockedState & {
  progress: number;
  rank: number;
};

// ATOMS

export const masteries = withStateKey("masteries", (key) =>
  atomFamily<MasteryState, Mastery>({
    default: {
      isUnlocked: false,
      progress: 0,
      rank: 0,
    },
    effects: (parameter) => [handleLocalStorage<MasteryState>({ key, parameter })],
    key,
  }),
);

// SELECTORS

export const isMasteryAtMaximum = withStateKey("isMasteryAtMaximum", (key) =>
  selectorFamily<boolean, Mastery>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment, maximum } = MASTERIES[parameter];
        const { rank } = get(masteries(parameter));

        return maximum === getComputedStatistic({ amount: rank, base, increment });
      },
    key,
  }),
);

export const masteryCost = withStateKey("masteryCost", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (parameter) =>
      ({ get }) =>
        getGrowthTriangular(get(masteries(parameter)).rank + 2),
    key,
  }),
);

export const masteryStatistic = withStateKey("masteryStatistic", (key) =>
  selectorFamily<number, Mastery>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment } = MASTERIES[parameter];
        const { rank } = get(masteries(parameter));

        return getComputedStatistic({ amount: rank, base, increment });
      },
    key,
  }),
);
