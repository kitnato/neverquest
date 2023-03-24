import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { essence } from "@neverquest/state/resources";
import { AttributeType } from "@neverquest/types/enums";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

interface AttributeState {
  isUnlocked: boolean;
  points: number;
}

// SELECTORS

export const attributeCost = selector({
  get: ({ get }) => getGrowthTriangular(get(characterLevel) + 1),
  key: "attributeCost",
});

export const areAttributesIncreasable = selector({
  get: ({ get }) => get(attributeCost) <= get(essence),
  key: "areAttributesIncreasable",
});

export const essenceAbsorbed = selector({
  get: ({ get }) => {
    let total = 0;

    for (let i = 0; i <= get(characterLevel); i++) {
      total += getGrowthTriangular(i);
    }

    return total;
  },
  key: "essenceAbsorbed",
});

export const isAttributeAtMaximum = selectorFamily<boolean, AttributeType>({
  get:
    (type) =>
    ({ get }) => {
      const { base, increment, maximum } = ATTRIBUTES[type];
      const { points } = get(attributes(type));

      return maximum === undefined
        ? false
        : maximum === getComputedStatistic({ amount: points, base, increment });
    },
  key: "isAttributeAtMaximum",
});

// ATOMS

export const attributes = atomFamily<AttributeState, AttributeType>({
  default: {
    isUnlocked: false,
    points: 0,
  },
  effects: (parameter) => [handleLocalStorage<AttributeState>({ key: "attributes", parameter })],
  key: "attributes",
});

export const characterLevel = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "characterLevel" })],
  key: "characterLevel",
});
