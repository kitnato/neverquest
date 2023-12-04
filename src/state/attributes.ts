import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { infusablePower } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import { ATTRIBUTE_TYPES, type Attribute } from "@neverquest/types/unions";
import { getAttributePointCost, getComputedStatistic } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const absorbedEssence = withStateKey("absorbedEssence", (key) =>
  selector({
    get: ({ get }) =>
      Array.from<undefined>({ length: get(level) }).reduce(
        (aggregator, _, index) => aggregator + getAttributePointCost(index),
        0,
      ),
    key,
  }),
);

export const areAttributesAffordable = withStateKey("areAttributesAffordable", (key) =>
  selector({
    get: ({ get }) => get(attributePoints) > 0,
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

export const attributePowerBonus = withStateKey("attributePowerBonus", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (parameter) =>
      ({ get }) => {
        const infusablePowerValue = get(infusablePower("tome of power"));

        return infusablePowerValue === 0
          ? 0
          : get(level) * ATTRIBUTES[parameter].powerBonus * (1 + infusablePowerValue);
      },
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

export const isAttributeAtMaximum = withStateKey("isAttributeAtMaximum", (key) =>
  selectorFamily<boolean, Attribute>({
    get:
      (parameter) =>
      ({ get }) =>
        get(attributeStatistic(parameter)) >=
        (ATTRIBUTES[parameter].maximum ?? Number.POSITIVE_INFINITY),
    key,
  }),
);

export const level = withStateKey("level", (key) =>
  selector({
    get: ({ get }) =>
      ATTRIBUTE_TYPES.reduce((aggregator, current) => aggregator + get(attributeRank(current)), 0),
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
