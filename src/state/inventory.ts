import { atom, selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  ENCUMBRANCE,
  GEMS_MAXIMUM,
  GEM_DAMAGE,
  GEM_DURATION,
  SHIELD_NONE,
  WEAPON_NONE,
} from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Armor, GemItem, InventoryItem, Shield, Weapon } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable, Elemental, Trinket } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

// SELECTORS

export const armor = withStateKey("armor", (key) =>
  selector<Armor | typeof ARMOR_NONE>({
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
  selector({
    get: ({ get }) => get(weapon).gems.length < GEMS_MAXIMUM,
    key,
  }),
);

export const canFit = withStateKey("canFit", (key) =>
  selectorFamily<boolean, number>({
    get:
      (weight) =>
      ({ get }) =>
        get(encumbrance) + weight <= get(encumbranceMaximum),
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
      (type) =>
      ({ get }) =>
        Boolean(
          get(inventory).find(
            (item) => (isConsumable(item) || isTrinket(item)) && item.type === type,
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
  selector<Shield | typeof SHIELD_NONE>({
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
  selector<Weapon | typeof WEAPON_NONE>({
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

export const weaponElementalEffects = withStateKey("weaponElementalEffects", (key) =>
  selector<Record<Elemental, { damage: number; duration: number }>>({
    get: ({ get }) => {
      const { damage, gems } = get(weapon);

      return stackItems(gems).reduce(
        (current, { item, stack }) => ({
          ...current,
          [(item as GemItem).type]: {
            damage: Math.ceil(damage * GEM_DAMAGE * stack),
            duration: GEM_DURATION * stack,
          },
        }),
        {
          electric: { damage: 0, duration: 0 },
          fire: { damage: 0, duration: 0 },
          ice: { damage: 0, duration: 0 },
        },
      );
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
