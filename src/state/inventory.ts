import { atom, selector } from "recoil";

import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "@neverquest/constants/gear";
import { localStorageEffect } from "@neverquest/state/effects";
import { Armor, Inventory, Shield, Weapon } from "@neverquest/types";
import { StorageKey } from "@neverquest/types/enums";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

// ATOMS

export const encumbranceMaximum = atom({
  default: 3,
  effects: [localStorageEffect<number>(StorageKey.EncumbranceMaximum)],
  key: StorageKey.EncumbranceMaximum,
});

export const inventory = atom<Inventory>({
  default: {},
  effects: [localStorageEffect<Inventory>(StorageKey.Inventory)],
  key: StorageKey.Inventory,
});

// SELECTORS

export const armor = selector({
  key: "armor",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedArmorID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isArmor(item);
    })[0];

    if (equippedArmorID) {
      return currentInventory[equippedArmorID].item as Armor;
    }

    return NO_ARMOR;
  },
});

export const encumbrance = selector({
  key: "encumbrance",
  get: ({ get }) => {
    const inventoryValue = get(inventory);

    return Object.getOwnPropertyNames(inventoryValue).reduce(
      (totalEncumbrance, id) => totalEncumbrance + inventoryValue[id].item.weight,
      0
    );
  },
});

export const isInventoryFull = selector({
  key: "isInventoryFull",
  get: ({ get }) => get(encumbrance) === get(encumbranceMaximum),
});

export const shield = selector({
  key: "shield",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedShieldID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isShield(item);
    })[0];

    if (equippedShieldID) {
      return currentInventory[equippedShieldID].item as Shield;
    }

    return NO_SHIELD;
  },
});

export const weapon = selector({
  key: "weapon",
  get: ({ get }) => {
    const currentInventory = get(inventory);
    const equippedWeaponID = Object.getOwnPropertyNames(currentInventory).filter((id) => {
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isWeapon(item);
    })[0];

    if (equippedWeaponID) {
      return currentInventory[equippedWeaponID].item as Weapon;
    }

    return NO_WEAPON;
  },
});
