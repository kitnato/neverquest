import { atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleStorage } from "@neverquest/state/effects/handleStorage";
import { infusionEffect } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import { ATTRIBUTE_TYPES, type Attribute } from "@neverquest/types/unions";
import {
  getAttributePointCost,
  getAttributePoints,
  getComputedStatistic,
} from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const absorbedEssence = withStateKey("absorbedEssence", (key) =>
  selector({
    get: ({ get }) => {
      let currentAbsorbedEssence = 0;

      for (let index = 0; index < get(powerLevel); index++) {
        currentAbsorbedEssence += getAttributePointCost(index);
      }

      return currentAbsorbedEssence;
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

export const attributePoints = withStateKey("attributePoints", (key) =>
  selector({
    get: ({ get }) => getAttributePoints({ essence: get(essence), powerLevel: get(powerLevel) }),
    key,
  }),
);

export const attributePowerBonus = withStateKey("attributePowerBonus", (key) =>
  selectorFamily({
    get:
      (attribute: Attribute) =>
      ({ get }) => {
        const infusionEffectValue = get(infusionEffect("eldritch codex"));

        return get(attributeRank(attribute)) === 0 || infusionEffectValue === 0
          ? 0
          : get(powerLevel) * ATTRIBUTES[attribute].powerBonus * (1 + infusionEffectValue);
      },
    key,
  }),
);

export const attributeStatistic = withStateKey("attributeStatistic", (key) =>
  selectorFamily({
    get:
      (attribute: Attribute) =>
      ({ get }) => {
        const { base, increment, rankBonus } = ATTRIBUTES[attribute];
        const attributeRankValue = get(attributeRank(attribute));

        return getComputedStatistic({
          base,
          bonus: rankBonus,
          increment,
          rank: attributeRankValue,
        });
      },
    key,
  }),
);

export const isAttributeAtMaximum = withStateKey("isAttributeAtMaximum", (key) =>
  selectorFamily({
    get:
      (attribute: Attribute) =>
      ({ get }) =>
        get(attributeStatistic(attribute)) >=
        (ATTRIBUTES[attribute].maximum ?? Number.POSITIVE_INFINITY),
    key,
  }),
);

export const powerLevel = withStateKey("powerLevel", (key) =>
  selector({
    get: ({ get }) =>
      ATTRIBUTE_TYPES.reduce((sum, attribute) => sum + get(attributeRank(attribute)), 0),
    key,
  }),
);

// ATOMS

export const attributeRank = withStateKey("attributeRank", (key) =>
  atomFamily<number, Attribute>({
    default: 0,
    effects: (attribute) => [handleStorage({ key, parameter: attribute })],
    key,
  }),
);
