import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { essence } from "@neverquest/state/resources";
import type { Attribute } from "@neverquest/types/enums";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

type AttributeState = {
  isUnlocked: boolean;
  points: number;
};

// SELECTORS

export const attributePoints = withStateKey("attributePoints", (key) =>
  selector({
    get: ({ get }) => {
      const nextPowerLevel = get(characterLevel) + 1;

      let points = 0;
      let requiredEssence = get(attributeCost);

      while (requiredEssence <= get(essence)) {
        points += 1;
        requiredEssence += getGrowthTriangular(nextPowerLevel + points);
      }

      return points;
    },
    key,
  })
);

export const attributeCost = withStateKey("attributeCost", (key) =>
  selector({
    get: ({ get }) => getGrowthTriangular(get(characterLevel) + 1),
    key,
  })
);

export const areAttributesIncreasable = withStateKey("areAttributesIncreasable", (key) =>
  selector({
    get: ({ get }) => get(attributeCost) <= get(essence),
    key,
  })
);

export const essenceAbsorbed = withStateKey("essenceAbsorbed", (key) =>
  selector({
    get: ({ get }) => {
      let total = 0;

      for (let i = 0; i <= get(characterLevel); i++) {
        total += getGrowthTriangular(i);
      }

      return total;
    },
    key,
  })
);

export const isAttributeAtMaximum = withStateKey("isAttributeAtMaximum", (key) =>
  selectorFamily<boolean, Attribute>({
    get:
      (type) =>
      ({ get }) => {
        const { base, increment, maximum } = ATTRIBUTES[type];
        const { points } = get(attributes(type));

        return maximum === undefined
          ? false
          : maximum === getComputedStatistic({ amount: points, base, increment });
      },
    key,
  })
);

// ATOMS

export const attributes = withStateKey("attributes", (key) =>
  atomFamily<AttributeState, Attribute>({
    default: {
      isUnlocked: false,
      points: 0,
    },
    effects: (parameter) => [handleLocalStorage<AttributeState>({ key, parameter })],
    key,
  })
);

export const characterLevel = withStateKey("characterLevel", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
