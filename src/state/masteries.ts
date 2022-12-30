import { atomFamily, selectorFamily } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { MasteryType, StorageKey } from "@neverquest/types/enums";
import { getTriangularNumber } from "@neverquest/utilities/getters";

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
  effects: (parameter) => [localStorage<MasteryState>(`${StorageKey.Masteries}-${parameter}`)],
  key: StorageKey.Masteries,
});

// SELECTORS

export const masteryCost = selectorFamily<number, MasteryType>({
  get:
    (type) =>
    ({ get }) =>
      getTriangularNumber(get(masteries(type)).rank + 2),
  key: "masteryCost",
});
