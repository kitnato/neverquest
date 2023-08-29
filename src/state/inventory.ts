import { atom, selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  ENCUMBRANCE,
  GEMS_MAXIMUM,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Armor, InventoryItem, Shield, Weapon } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Gear, Trinket } from "@neverquest/types/unions";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector({
    get: ({ get }) => {
      const equippedArmor = get(inventory).find((item) => {
        if (isArmor(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedArmor === undefined) {
        return ARMOR_NONE;
      }

      return equippedArmor as Armor;
    },
    key,
  }),
);

export const canApplyGem = withStateKey("canApplyGem", (key) =>
  selectorFamily<boolean, Gear>({
    get:
      (parameter) =>
      ({ get }) =>
        (parameter === "armor"
          ? get(armor).gems.length
          : parameter === "shield"
          ? get(shield).gems.length
          : get(weapon).gems.length) < GEMS_MAXIMUM,
    key,
  }),
);

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
    get: ({ get }) => {
      const inventoryValue = get(inventory);

      return inventoryValue.reduce((current, item) => current + item.weight, 0);
    },
    key,
  }),
);

export const hasItem = withStateKey("hasItem", (key) =>
  selectorFamily<boolean, Consumable | Trinket>({
    get:
      (parameter) =>
      ({ get }) =>
        Boolean(
          get(inventory).find(
            (item) => (isConsumable(item) || isTrinket(item)) && item.type === parameter,
          ),
        ),
    key,
  }),
);

export const isInventoryFull = withStateKey("isInventoryFull", (key) =>
  selector({
    get: ({ get }) => get(encumbrance) >= get(encumbranceMaximum),
    key,
  }),
);

export const shield = withStateKey("shield", (key) =>
  selector({
    get: ({ get }) => {
      const equippedShield = get(inventory).find((item) => {
        if (isShield(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedShield === undefined) {
        return SHIELD_NONE;
      }

      return equippedShield as Shield;
    },
    key,
  }),
);

export const weapon = withStateKey("weapon", (key) =>
  selector({
    get: ({ get }) => {
      const equippedWeapon = get(inventory).find((item) => {
        if (isWeapon(item)) {
          return item.isEquipped;
        }

        return;
      });

      if (equippedWeapon === undefined) {
        return WEAPON_NONE;
      }

      return equippedWeapon as Weapon;
    },
    key,
  }),
);

// ATOMS

export const encumbranceMaximum = withStateKey("encumbranceMaximum", (key) =>
  atom({
    default: ENCUMBRANCE,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const hasKnapsack = withStateKey("hasKnapsack", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const inventory = withStateKey("inventory", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage<InventoryItem[]>({ key })],
    key,
  }),
);

export const isInventoryOpen = withStateKey("isInventoryOpen", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const itemsAcquired = withStateKey("itemsAcquired", (key) =>
  atom({
    default: [],
    effects: [handleLocalStorage<InventoryItem[]>({ key })],
    key,
  }),
);

export const notifyOverEncumbrance = withStateKey("notifyOverEncumbrance", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);
