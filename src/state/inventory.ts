import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE } from "@neverquest/constants";
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { Armor, Inventory, Shield, Weapon } from "@neverquest/types";

// SELECTORS

export const armor = selector({
  get: ({ get }) => {
    const equippedArmorValue = get(equippedArmor);

    if (equippedArmorValue) {
      return get(inventory)[equippedArmorValue] as Armor;
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
      (current, id) => current + inventoryValue[id].weight,
      0
    );
  },
  key: "encumbrance",
});

export const equippedItemIDs = selector({
  get: ({ get }) =>
    [get(equippedWeapon), get(equippedArmor), get(equippedShield)].filter((id) => id) as string[],
  key: "equippedItemIDs",
});

export const isInventoryFull = selector({
  get: ({ get }) => get(encumbrance) >= get(encumbranceMaximum),
  key: "isInventoryFull",
});

export const shield = selector({
  get: ({ get }) => {
    const equippedShieldValue = get(equippedShield);

    if (equippedShieldValue) {
      return get(inventory)[equippedShieldValue] as Shield;
    }

    return SHIELD_NONE;
  },
  key: "shield",
});

export const weapon = selector({
  get: ({ get }) => {
    const equippedWeaponValue = get(equippedWeapon);

    if (equippedWeaponValue) {
      return get(inventory)[equippedWeaponValue] as Weapon;
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

export const equippedArmor = atom<string | null>({
  default: null,
  effects: [handleLocalStorage<string | null>({ key: "equippedArmor" })],
  key: "equippedArmor",
});

export const equippedShield = atom<string | null>({
  default: null,
  effects: [handleLocalStorage<string | null>({ key: "equippedShield" })],
  key: "equippedShield",
});

export const equippedWeapon = atom<string | null>({
  default: null,
  effects: [handleLocalStorage<string | null>({ key: "equippedWeapon" })],
  key: "equippedWeapon",
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

export const isInventoryOpen = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isInventoryOpen" })],
  key: "isInventoryOpen",
});
