import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES, ATTRIBUTES_ORDER } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { essence } from "@neverquest/state/resources";
import type { Attribute } from "@neverquest/types/unions";
import { getAttributePointCost, getComputedStatistic } from "@neverquest/utilities/getters";

// SELECTORS

export const absorbedEssence = withStateKey("absorbedEssence", (key) =>
  selector({
    get: ({ get }) =>
      Array.from<number>(Array(get(level))).reduce(
        (aggregator, _, index) => aggregator + getAttributePointCost(index),
        0,
      ),
    key,
  }),
);

export const attributePoints = withStateKey("attributePoints", (key) =>
  selector({
    get: ({ get }) => {
      const essenceValue = get(essence);
      const levelValue = get(level);

      let points = 0;
      let requiredEssence = getAttributePointCost(levelValue);

      while (requiredEssence <= essenceValue) {
        points += 1;
        requiredEssence += getAttributePointCost(levelValue + points);
      }

      return points;
    },
    key,
  }),
);

export const areAttributesAffordable = withStateKey("areAttributesAffordable", (key) =>
  selector({
    get: ({ get }) => get(attributePoints) > 0,
    key,
  }),
);

export const isAttributeAtMaximum = withStateKey("isAttributeAtMaximum", (key) =>
  selectorFamily<boolean, Attribute>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment, maximum } = ATTRIBUTES[parameter];
        const attributeRankValue = get(attributeRank(parameter));

        return maximum === undefined
          ? false
          : maximum === getComputedStatistic({ amount: attributeRankValue, base, increment });
      },
    key,
  }),
);

export const level = withStateKey("level", (key) =>
  selector({
    get: ({ get }) =>
      ATTRIBUTES_ORDER.reduce((aggregator, current) => aggregator + get(attributeRank(current)), 0),
    key,
  }),
);

export const attributeStatistic = withStateKey("attributeStatistic", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (parameter) =>
      ({ get }) => {
        const { base, increment } = ATTRIBUTES[parameter];
        const attributeRankValue = get(attributeRank(parameter));

        return getComputedStatistic({ amount: attributeRankValue, base, increment });
      },
    key,
  }),
);

// ATOMS

export const attributeRank = withStateKey("attributeRank", (key) =>
  atomFamily<number, Attribute>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const isAttributeUnlocked = withStateKey("isAttributeUnlocked", (key) =>
  // TODO - if it's just boolean, it won't initialize.
  atomFamily<{ isUnlocked: boolean }, Attribute>({
    default: { isUnlocked: false },
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
