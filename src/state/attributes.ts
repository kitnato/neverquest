import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { essence } from "@neverquest/state/resources";
import type { UnlockedState } from "@neverquest/types";
import type { Attribute } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

type AttributeState = UnlockedState & {
  points: number;
};

// SELECTORS

export const attributePoints = withStateKey("attributePoints", (key) =>
  selector({
    get: ({ get }) => {
      const nextLevel = get(level) + 1;

      let points = 0;
      let requiredEssence = get(attributeCost);

      while (requiredEssence <= get(essence)) {
        points += 1;
        requiredEssence += getGrowthTriangular(nextLevel + points);
      }

      return points;
    },
    key,
  })
);

export const attributeCost = withStateKey("attributeCost", (key) =>
  selector({
    get: ({ get }) => getGrowthTriangular(get(level) + 1),
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

      for (let i = 0; i <= get(level); i++) {
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

export const level = withStateKey("level", (key) =>
  selector({
    get: ({ get }) =>
      Object.keys(ATTRIBUTES).reduce(
        (current, type) => current + get(attributes(type as Attribute)).points,
        0
      ),
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
