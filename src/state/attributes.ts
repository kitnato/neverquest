import { atomFamily, selector } from "recoil";

import { characterLevel } from "@neverquest/state/character";
import { localStorageEffect } from "@neverquest/state/effects";
import { essence } from "@neverquest/state/resources";
import { getTriangularNumber } from "@neverquest/utilities/helpers";
import { AttributeType, StorageKey } from "@neverquest/types/enums";

interface AttributeState {
  canAssign: boolean;
  points: number;
}

// ATOMS

export const attributes = atomFamily<AttributeState, AttributeType>({
  default: {
    canAssign: false,
    points: 0,
  },
  effects: (parameter) => [
    localStorageEffect<AttributeState>(`${StorageKey.Attributes}-${parameter}`),
  ],
  key: StorageKey.Attributes,
});

// SELECTORS

export const attributeCost = selector({
  get: ({ get }) => getTriangularNumber(get(characterLevel) + 1),
  key: "attributeCost",
});

export const attributesIncreasable = selector({
  get: ({ get }) => get(attributeCost) <= get(essence),
  key: "attributesIncreasable",
});
