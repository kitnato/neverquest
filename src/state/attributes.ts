import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES, ATTRIBUTES_ORDER, ATTRIBUTE_COST_BASE } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { essence } from "@neverquest/state/resources";
import type { UnlockedState } from "@neverquest/types";
import type { Attribute } from "@neverquest/types/unions";
import { getComputedStatistic, getGrowthTriangular } from "@neverquest/utilities/getters";

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
  }),
);

export const attributeCost = withStateKey("attributeCost", (key) =>
  selector({
    get: ({ get }) => getGrowthTriangular(get(level) + ATTRIBUTE_COST_BASE),
    key,
  }),
);

export const areAttributesIncreasable = withStateKey("areAttributesIncreasable", (key) =>
  selector({
    get: ({ get }) => get(attributeCost) <= get(essence),
    key,
  }),
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
  }),
);

export const isAttributeAtMaximum = withStateKey("isAttributeAtMaximum", (key) =>
  selectorFamily<boolean, Attribute>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment, maximum } = ATTRIBUTES[parameter];
        const { points } = get(attributes(parameter));

        return maximum === undefined
          ? false
          : maximum === getComputedStatistic({ amount: points, base, increment });
      },
    key,
  }),
);

export const level = withStateKey("level", (key) =>
  selector({
    get: ({ get }) =>
      ATTRIBUTES_ORDER.reduce(
        (aggregator, current) => aggregator + get(attributes(current)).points,
        0,
      ),
    key,
  }),
);

export const attributeStatistic = withStateKey("attributeStatistic", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment } = ATTRIBUTES[parameter];
        const { points } = get(attributes(parameter));

        return getComputedStatistic({ amount: points, base, increment });
      },
    key,
  }),
);

// ATOMS

export const attributes = withStateKey("attributes", (key) =>
  atomFamily<
    UnlockedState & {
      points: number;
    },
    Attribute
  >({
    default: {
      isUnlocked: false,
      points: 0,
    },
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
