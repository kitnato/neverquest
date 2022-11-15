import { atom, selector, selectorFamily } from "recoil";

import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "@neverquest/constants/gear";
import localStorage from "@neverquest/state/effects/localStorage";
import { Armor, Inventory, Shield, Weapon } from "@neverquest/types";
import { StorageKey } from "@neverquest/types/enums";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

// ATOMS

export const encumbranceMaximum = atom({
  default: 3,
  effects: [localStorage<number>(StorageKey.EncumbranceMaximum)],
  key: StorageKey.EncumbranceMaximum,
});

export const inventory = atom<Inventory>({
  default: {},
  effects: [localStorage<Inventory>(StorageKey.Inventory)],
  key: StorageKey.Inventory,
});

// SELECTORS

export const armor = selector({
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedArmorID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, possession } = currentInventory[id];

      return isEquipped && isArmor(possession);
    })[0];

    if (equippedArmorID) {
      return currentInventory[equippedArmorID].possession as Armor;
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
    const currentInventory = get(inventory);
    const equippedShieldID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, possession } = currentInventory[id];

      return isEquipped && isShield(possession);
    })[0];

    if (equippedShieldID) {
      return currentInventory[equippedShieldID].possession as Shield;
    }

    return NO_SHIELD;
  },
  key: "shield",
});

export const weapon = selector({
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedWeaponID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, possession } = currentInventory[id];

      return isEquipped && isWeapon(possession);
    })[0];

    if (equippedWeaponID) {
      return currentInventory[equippedWeaponID].possession as Weapon;
    }

    return NO_WEAPON;
  },
  key: "weapon",
});
