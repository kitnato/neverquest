import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE_CAPACITY } from "@neverquest/data/items";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { knapsackCapacity } from "@neverquest/state/items";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { ConsumableItem, InheritableItem, InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isConsumableItem,
  isInheritableItem,
  isMelee,
  isRanged,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Infusable, Trinket } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const encumbrance = withStateKey("encumbrance", (key) =>
  selector({
    get: ({ get }) => get(inventory).reduce((sum, { weight }) => sum + weight, 0),
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
    get: ({ get }) =>
      get(ownedItem("knapsack")) === undefined ? ENCUMBRANCE_CAPACITY : get(knapsackCapacity),
    key,
  }),
);

export const equippableItems = withStateKey("equippableItems", (key) =>
  selector({
    get: ({ get }) => {
      const currentEquippableItems: Record<string, boolean> = {};

      for (const item of get(inventory)) {
        let canEquip =
          (isArmor(item) && get(armor).ID !== item.ID) ||
          (isWeapon(item) && get(weapon).ID !== item.ID) ||
          (isShield(item) && get(shield).ID !== item.ID);

        if (isArmor(item) && item.gearClass === "heavy") {
          canEquip = get(isSkillAcquired("armorcraft"));
        }

        if (isMelee(item) && item.grip === "two-handed") {
          canEquip = get(isSkillAcquired("siegecraft"));
        }

        if (isRanged(item)) {
          canEquip = get(isSkillAcquired("archery"));
        }

        if (isShield(item) && item.gearClass === "tower") {
          canEquip = get(isSkillAcquired("shieldcraft"));
        }

        currentEquippableItems[item.ID] = canEquip;
      }

      return currentEquippableItems;
    },
    key,
  }),
);

export const ownedItem = withStateKey("ownedItem", (key) =>
  selectorFamily({
    get:
      (itemName: Consumable | Infusable | Trinket) =>
      ({ get }): ConsumableItem | InheritableItem | undefined => {
        const inventoryValue = get(inventory);

        return (
          inventoryValue.filter(isConsumableItem).find(({ name }) => name === itemName) ??
          inventoryValue.filter(isInheritableItem).find(({ name }) => name === itemName)
        );
      },
    key,
  }),
);

// ATOMS

export const acquiredItems = withStateKey("acquiredItems", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const canInfuseMysteriousEgg = withStateKey("canInfuseMysteriousEgg", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

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

export const notifyOverEncumbrance = withStateKey("notifyOverEncumbrance", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
