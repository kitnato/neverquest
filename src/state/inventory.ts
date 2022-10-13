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
  key: "armor",
});

export const encumbrance = selector({
  get: ({ get }) => {
    const inventoryValue = get(inventory);

    return Object.getOwnPropertyNames(inventoryValue).reduce(
      (totalEncumbrance, id) => totalEncumbrance + inventoryValue[id].item.weight,
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
      const { isEquipped, item } = currentInventory[id];

      return isEquipped && isShield(item);
    })[0];

    if (equippedShieldID) {
      return currentInventory[equippedShieldID].item as Shield;
    }

    return NO_SHIELD;
  },
  key: "shield",
});

export const weapon = selector({
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
  key: "weapon",
});
