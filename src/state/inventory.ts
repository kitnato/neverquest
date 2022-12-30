import { atom, selector, selectorFamily } from "recoil";

import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "@neverquest/data/gear";
import localStorage from "@neverquest/state/effects/localStorage";
import { Armor, Inventory, Shield, Weapon } from "@neverquest/types";
import { StorageKey } from "@neverquest/types/enums";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

// SELECTORS

export const armor = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedArmorID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, possession } = inventoryValue[id];

      return isEquipped && isArmor(possession);
    })[0];

    if (equippedArmorID) {
      return inventoryValue[equippedArmorID].possession as Armor;
    }

    return NO_ARMOR;
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
      (totalEncumbrance, id) => totalEncumbrance + inventoryValue[id].possession.weight,
      0
    );
  },
  key: "encumbrance",
});

export const isInventoryFull = selector({
  get: ({ get }) => get(encumbrance) === get(encumbranceMaximum),
  key: "isInventoryFull",
});

export const shield = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedShieldID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, possession } = inventoryValue[id];

      return isEquipped && isShield(possession);
    })[0];

    if (equippedShieldID) {
      return inventoryValue[equippedShieldID].possession as Shield;
    }

    return NO_SHIELD;
  },
  key: "shield",
});

export const weapon = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);
    const equippedWeaponID = Object.getOwnPropertyNames(inventoryValue).filter((id) => {
      const { isEquipped, possession } = inventoryValue[id];

      return isEquipped && isWeapon(possession);
    })[0];

    if (equippedWeaponID) {
      return inventoryValue[equippedWeaponID].possession as Weapon;
    }

    return NO_WEAPON;
  },
  key: "weapon",
});

// ATOMS

export const encumbranceMaximum = atom({
  default: 3,
  effects: [localStorage<number>(StorageKey.EncumbranceMaximum)],
  key: StorageKey.EncumbranceMaximum,
});

export const hasKnapsack = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.HasKnapsack)],
  key: StorageKey.HasKnapsack,
});

export const inventory = atom<Inventory>({
  default: {},
  effects: [localStorage<Inventory>(StorageKey.Inventory)],
  key: StorageKey.Inventory,
});

export const isInventoryOpen = atom<boolean>({
  default: false,
  effects: [localStorage<boolean>(StorageKey.isInventoryOpen)],
  key: StorageKey.isInventoryOpen,
});
