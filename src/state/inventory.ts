import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { ENCUMBRANCE } from "@neverquest/data/statistics";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Armor, Inventory, Shield, Weapon } from "@neverquest/types";
import type { GearType } from "@neverquest/types/unions";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector({
    get: ({ get }) => {
      const equippedArmorID = get(equippedGearID("armor"));

      if (equippedArmorID === null) {
        return ARMOR_NONE;
      }

      return get(inventory)[equippedArmorID] as Armor;
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
      [
        get(equippedGearID("weapon")),
        get(equippedGearID("armor")),
        get(equippedGearID("shield")),
      ].filter((id) => Boolean(id)) as string[],
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
      const equippedShieldID = get(equippedGearID("shield"));

      if (equippedShieldID === null) {
        return SHIELD_NONE;
      }

      return get(inventory)[equippedShieldID] as Shield;
    },
    key,
  })
);

export const weapon = withStateKey("weapon", (key) =>
  selector({
    get: ({ get }) => {
      const equippedWeaponID = get(equippedGearID("weapon"));

      if (equippedWeaponID === null) {
        return WEAPON_NONE;
      }

      return get(inventory)[equippedWeaponID] as Weapon;
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

export const equippedGearID = withStateKey("equippedGearID", (key) =>
  atomFamily<string | null, GearType>({
    default: null,
    effects: (parameter) => [handleLocalStorage<string | null>({ key, parameter })],
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
