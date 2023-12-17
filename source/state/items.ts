import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { INFUSION_DELTA, INFUSION_DURATION } from "@neverquest/data/general";
import { INFUSABLES, INHERITABLE_ITEMS } from "@neverquest/data/items";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { isInfusableItem } from "@neverquest/types/type-guards";
import type { Infusable } from "@neverquest/types/unions";
import { getFromRange, getGrowthSigmoid, getGrowthTriangular } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const ammunition = withStateKey("ammunition", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === undefined
        ? 0
        : (ownedAmmunitionPouch as AmmunitionPouchItem).current;
    },
    key,
  }),
);

export const ammunitionMaximum = withStateKey("ammunitionMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === undefined
        ? 0
        : (ownedAmmunitionPouch as AmmunitionPouchItem).maximum;
    },
    key,
  }),
);

export const infusablePower = withStateKey("infusablePower", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) => {
        const ownedItemValue = get(ownedItem(parameter));

        if (ownedItemValue === undefined || !isInfusableItem(ownedItemValue)) {
          return 0;
        }

        const { maximum, minimum } = INFUSABLES[parameter].item;

        return getFromRange({
          factor: getGrowthSigmoid(ownedItemValue.level),
          maximum,
          minimum,
        });
      },
    key,
  }),
);

export const infusionLevel = withStateKey("infusionLevel", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) => {
        const infusable = get(ownedItem(parameter));

        if (infusable === undefined || !isInfusableItem(infusable)) {
          return 0;
        }

        return infusable.level;
      },
    key,
  }),
);

export const infusionMaximum = withStateKey("infusionMaximum", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) => {
        const infusable = get(ownedItem(parameter));

        if (infusable === undefined || !isInfusableItem(infusable)) {
          return 0;
        }

        return getGrowthTriangular(infusable.level + INFUSABLES[parameter].item.growthBase);
      },
    key,
  }),
);

export const infusionStep = withStateKey("infusionStep", (key) =>
  selectorFamily<number, Infusable>({
    get:
      (parameter) =>
      ({ get }) =>
        Math.min(
          get(essence),
          Math.ceil((get(infusionMaximum(parameter)) / INFUSION_DURATION) * INFUSION_DELTA),
        ),
    key,
  }),
);

export const ownsInheritableItems = withStateKey("ownsInheritableItems", (key) =>
  selector({
    get: ({ get }) => {
      const currentlyOwnedInheritableItems = {} as Record<
        (typeof INHERITABLE_ITEMS)[number],
        boolean
      >;

      for (const inheritableItem of INHERITABLE_ITEMS) {
        currentlyOwnedInheritableItems[inheritableItem] =
          get(ownedItem(inheritableItem)) !== undefined;
      }

      return currentlyOwnedInheritableItems;
    },
    key,
  }),
);

// ATOMS

export const infusionCurrent = withStateKey("infusionCurrent", (key) =>
  atomFamily<number, Infusable>({
    default: 0,
    key,
  }),
);

export const infusionDelta = withStateKey("infusionDelta", (key) =>
  atom({
    default: INFUSION_DELTA,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
