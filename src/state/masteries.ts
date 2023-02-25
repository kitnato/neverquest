import { atomFamily, selectorFamily } from "recoil";

import { MASTERIES } from "@neverquest/data/masteries";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { MasteryType, StorageKey } from "@neverquest/types/enums";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

interface MasteryState {
  progress: number;
  rank: number;
}

// ATOMS

export const masteries = atomFamily<MasteryState, MasteryType>({
  default: {
    progress: 0,
    rank: 0,
  },
  effects: (parameter) => [
    handleLocalStorage<MasteryState>(`${StorageKey.Masteries}-${parameter}`),
  ],
  key: StorageKey.Masteries,
});

// SELECTORS

export const isMasteryAtMaximum = selectorFamily<boolean, MasteryType>({
  get:
    (type) =>
    ({ get }) => {
      const { base, increment, maximum } = MASTERIES[type];
      const { rank } = get(masteries(type));

      return maximum === undefined
        ? false
        : maximum === getComputedStatistic({ amount: rank, base, increment });
    },
  key: "isMasteryAtMaximum",
});

export const masteryCost = selectorFamily<number, MasteryType>({
  get:
    (type) =>
    ({ get }) =>
      getGrowthTriangular(get(masteries(type)).rank + 2),
  key: "masteryCost",
});
