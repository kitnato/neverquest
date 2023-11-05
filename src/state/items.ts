import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { INFUSION_DELTA, INFUSION_DURATION } from "@neverquest/data/general";
import { INFUSABLES, INHERITABLE_ITEMS } from "@neverquest/data/inventory";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { isInfusableItem } from "@neverquest/types/type-guards";
import type { Infusable } from "@neverquest/types/unions";
import {
  getFromRange,
  getGrowthLogarithmic,
  getGrowthTriangular,
} from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const ammunition = withStateKey("ammunition", (key) =>
  selector({
    get: ({ get }) => {
      const ownedAmmunitionPouch = get(ownedItem("ammunition pouch"));

      return ownedAmmunitionPouch === null
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

      return ownedAmmunitionPouch === null
        ? 0
        : (ownedAmmunitionPouch as AmmunitionPouchItem).maximum;
    },
    key,
  }),
);

export const essenceBonus = withStateKey("essenceBonus", (key) =>
  selector({
    get: ({ get }) => {
      const ownedMonkeyPaw = get(ownedItem("monkey paw"));

      if (ownedMonkeyPaw === null || !isInfusableItem(ownedMonkeyPaw)) {
        return 0;
      }

      const { maximum, minimum } = INFUSABLES["monkey paw"].item;

      return getFromRange({
        factor: getGrowthLogarithmic(ownedMonkeyPaw.level),
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

        if (infusable === null || !isInfusableItem(infusable)) {
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

        if (infusable === null || !isInfusableItem(infusable)) {
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
    get: ({ get }) =>
      Object.fromEntries(
        INHERITABLE_ITEMS.map((current) => [current, Boolean(get(ownedItem(current)))]),
      ),
    key,
  }),
);

export const powerBonusBoost = withStateKey("powerBonusBoost", (key) =>
  selector({
    get: ({ get }) => {
      const ownedTomeOfPower = get(ownedItem("tome of power"));

      if (ownedTomeOfPower === null || !isInfusableItem(ownedTomeOfPower)) {
        return 0;
      }

      const { maximum, minimum } = INFUSABLES["tome of power"].item;

      return getFromRange({
        factor: getGrowthLogarithmic(ownedTomeOfPower.level),
        maximum,
        minimum,
      });
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
