import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE } from "@neverquest/constants";
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { Armor, Inventory, Shield, Weapon } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

// SELECTORS

export const armor = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedArmorID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, item } = inventoryValue[id];

      return isEquipped && isArmor(item);
    })[0];

    if (equippedArmorID) {
      return inventoryValue[equippedArmorID].item as Armor;
    }

    return ARMOR_NONE;
  },
  key: "armor",
});

export const canFit = selectorFamily<boolean, number>({
  get:
    (weight) =>
    ({ get }) =>
      get(encumbrance) + weight <= get(encumbranceMaximum),
  key: "canFit",
});

export const encumbrance = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);

    return Object.getOwnPropertyNames(inventoryValue).reduce(
      (current, id) => current + inventoryValue[id].item.weight,
      0
    );
  },
  key: "encumbrance",
});

export const isInventoryFull = selector({
  get: ({ get }) => get(encumbrance) >= get(encumbranceMaximum),
  key: "isInventoryFull",
});

export const shield = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedShieldID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, item } = inventoryValue[id];

      return isEquipped && isShield(item);
    })[0];

    if (equippedShieldID) {
      return inventoryValue[equippedShieldID].item as Shield;
    }

    return SHIELD_NONE;
  },
  key: "shield",
});

export const weapon = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedWeaponID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, item } = inventoryValue[id];

      return isEquipped && isWeapon(item);
    })[0];

    if (equippedWeaponID) {
      return inventoryValue[equippedWeaponID].item as Weapon;
    }

    return WEAPON_NONE;
  },
  key: "weapon",
});

// ATOMS

export const encumbranceMaximum = atom({
  default: ENCUMBRANCE,
  effects: [handleLocalStorage<number>({ key: "encumbranceMaximum" })],
  key: "encumbranceMaximum",
});

export const hasKnapsack = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "hasKnapsack" })],
  key: "hasKnapsack",
});

export const inventory = atom<Inventory>({
  default: {},
  effects: [handleLocalStorage<Inventory>({ key: "inventory" })],
  key: "inventory",
});

export const isInventoryOpen = atom<boolean>({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isInventoryOpen" })],
  key: "isInventoryOpen",
});
