import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE_CAPACITY } from "@neverquest/data/inventory";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { InventoryItem, KnapsackItem } from "@neverquest/types";
import {
  isArmor,
  isConsumableItem,
  isGear,
  isInfusableItem,
  isMelee,
  isRanged,
  isShield,
  isTrinketItem,
} from "@neverquest/types/type-guards";
import type { Consumable, Infusable, Trinket } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const canFit = withStateKey("canFit", (key) =>
  selectorFamily<boolean, number>({
    get:
      (parameter) =>
      ({ get }) =>
        get(encumbrance) + parameter <= get(encumbranceMaximum),
    key,
  }),
);

export const encumbrance = withStateKey("encumbrance", (key) =>
  selector({
    get: ({ get }) => get(inventory).reduce((aggregator, { weight }) => aggregator + weight, 0),
    key,
  }),
);

export const encumbranceExtent = withStateKey("encumbranceExtent", (key) =>
  selector({
    get: ({ get }) =>
      get(encumbrance) === get(encumbranceMaximum)
        ? "encumbered"
        : get(encumbrance) > get(encumbranceMaximum)
          ? "over-encumbered"
          : "none",
    key,
  }),
);

export const encumbranceMaximum = withStateKey("encumbranceMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const ownedItemKnapsack = get(ownedItem("knapsack"));

      return ownedItemKnapsack === undefined
        ? ENCUMBRANCE_CAPACITY
        : (ownedItemKnapsack as KnapsackItem).capacity;
    },
    key,
  }),
);

export const equippableItems = withStateKey("equippableItems", (key) =>
  selector<Record<string, boolean>>({
    get: ({ get }) =>
      // eslint-disable-next-line unicorn/no-array-reduce
      get(inventory).reduce((aggregator, { ID, ...current }) => {
        let canEquip = isGear(current) ? !current.isEquipped : false;

        if (isArmor(current) && current.gearClass === "heavy") {
          canEquip = get(isSkillAcquired("armorcraft"));
        }

        if (isMelee(current) && current.grip === "two-handed") {
          canEquip = get(isSkillAcquired("siegecraft"));
        }

        if (isRanged(current)) {
          canEquip = get(isSkillAcquired("archery"));
        }

        if (isShield(current) && current.gearClass === "tower") {
          canEquip = get(isSkillAcquired("shieldcraft"));
        }

        return {
          ...aggregator,
          [ID]: canEquip,
        };
      }, {}),
    key,
  }),
);

// TODO - return the appropriate Item type.
export const ownedItem = withStateKey("ownedItem", (key) =>
  selectorFamily<InventoryItem | undefined, Consumable | Infusable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        get(inventory).find(
          (current) =>
            (isConsumableItem(current) || isInfusableItem(current) || isTrinketItem(current)) &&
            current.name === parameter,
        ),
    key,
  }),
);

// ATOMS

export const inventory = withStateKey("inventory", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isInventoryOpen = withStateKey("isInventoryOpen", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const itemsAcquired = withStateKey("itemsAcquired", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const notifyOverEncumbrance = withStateKey("notifyOverEncumbrance", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
