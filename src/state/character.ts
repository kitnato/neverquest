import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/utilities/constants";
import { getTriangularNumber } from "@neverquest/utilities/helpers";

export const characterLevel = atom({
  default: 0,
  key: "characterLevel",
});

export const hasKnapsack = atom({
  default: false,
  key: "hasKnapsack",
});

export const isAttacking = atom({
  default: false,
  key: "isAttacking",
});

export const isLooting = atom({
  default: false,
  key: "isLooting",
});

export const isRecovering = atom({
  default: false,
  key: "isRecovering",
});

export const lootingRate = atom({
  default: 2500,
  key: "lootingRate",
});

export const name = atom({
  default: UNKNOWN,
  key: "name",
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  key: "statusElement",
});

export const essenceAbsorbed = selector({
  key: "essenceAbsorbed",
  get: ({ get }) => {
    let total = 0;

    for (let i = 0; i <= get(characterLevel); i++) {
      total += getTriangularNumber(i);
    }

    return total;
  },
});
