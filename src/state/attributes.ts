import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { characterLevel } from "@neverquest/state/character";
import localStorage from "@neverquest/state/effects/localStorage";
import { essence } from "@neverquest/state/resources";
import { AttributeType, StorageKey } from "@neverquest/types/enums";
import { getComputedStat, getTriangularNumber } from "@neverquest/utilities/getters";

interface AttributeState {
  isUnlocked: boolean;
  points: number;
}

// ATOMS

export const attributes = atomFamily<AttributeState, AttributeType>({
  default: {
    isUnlocked: false,
    points: 0,
  },
  effects: (parameter) => [localStorage<AttributeState>(`${StorageKey.Attributes}-${parameter}`)],
  key: StorageKey.Attributes,
});

// SELECTORS

export const attributeCost = selector({
  get: ({ get }) => getTriangularNumber(get(characterLevel) + 1),
  key: "attributeCost",
});

export const areAttributesIncreasable = selector({
  get: ({ get }) => get(attributeCost) <= get(essence),
  key: "areAttributesIncreasable",
});

export const isAttributeMaxed = selectorFamily<boolean, AttributeType>({
  get:
    (type) =>
    ({ get }) => {
      const { base, increment, maximum } = ATTRIBUTES[type];
      const { points } = get(attributes(type));

      return maximum === undefined
        ? false
        : maximum === getComputedStat({ base, increment, points });
    },
  key: "isAttributeMaxed",
});
