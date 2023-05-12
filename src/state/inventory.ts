import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE } from "@neverquest/data/constants";
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Armor, Inventory, Shield, Weapon } from "@neverquest/types";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector({
    get: ({ get }) => {
      const equippedArmorValue = get(equippedArmor);

      if (equippedArmorValue === null) {
        return ARMOR_NONE;
      }

      return get(inventory)[equippedArmorValue] as Armor;
    },
    key,
  })
);

export const canFit = withStateKey("canFit", (key) =>
  selectorFamily<boolean, number>({
    get:
      (weight) =>
      ({ get }) =>
        get(encumbrance) + weight <= get(encumbranceMaximum),
    key,
  })
);

export const encumbrance = withStateKey("encumbrance", (key) =>
  selector({
    get: ({ get }) => {
      const inventoryValue = get(inventory);

      return Object.getOwnPropertyNames(inventoryValue).reduce(
        (current, id) => current + inventoryValue[id].weight,
        0
      );
    },
    key,
  })
);

export const equippedGearIDs = withStateKey("equippedGearIDs", (key) =>
  selector({
    get: ({ get }) =>
      [get(equippedWeapon), get(equippedArmor), get(equippedShield)].filter((id) =>
        Boolean(id)
      ) as string[],
    key,
  })
);

export const isInventoryFull = withStateKey("isInventoryFull", (key) =>
  selector({
    get: ({ get }) => get(encumbrance) >= get(encumbranceMaximum),
    key,
  })
);

export const shield = withStateKey("shield", (key) =>
  selector({
    get: ({ get }) => {
      const equippedShieldValue = get(equippedShield);

      if (equippedShieldValue === null) {
        return SHIELD_NONE;
      }

      return get(inventory)[equippedShieldValue] as Shield;
    },
    key,
  })
);

export const weapon = withStateKey("weapon", (key) =>
  selector({
    get: ({ get }) => {
      const equippedWeaponValue = get(equippedWeapon);

      if (equippedWeaponValue === null) {
        return WEAPON_NONE;
      }

      return get(inventory)[equippedWeaponValue] as Weapon;
    },
    key,
  })
);

// ATOMS

export const encumbranceMaximum = withStateKey("encumbranceMaximum", (key) =>
  atom({
    default: ENCUMBRANCE,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const equippedArmor = withStateKey("equippedArmor", (key) =>
  atom<string | null>({
    default: null,
    effects: [handleLocalStorage<string | null>({ key })],
    key,
  })
);

export const equippedShield = withStateKey("equippedShield", (key) =>
  atom<string | null>({
    default: null,
    effects: [handleLocalStorage<string | null>({ key })],
    key,
  })
);

export const equippedWeapon = withStateKey("equippedWeapon", (key) =>
  atom<string | null>({
    default: null,
    effects: [handleLocalStorage<string | null>({ key })],
    key,
  })
);

export const hasKnapsack = withStateKey("hasKnapsack", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const inventory = withStateKey("inventory", (key) =>
  atom<Inventory>({
    default: {},
    effects: [handleLocalStorage<Inventory>({ key })],
    key,
  })
);

export const isInventoryOpen = withStateKey("isInventoryOpen", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);
