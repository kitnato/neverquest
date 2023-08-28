import { atom, selector, selectorFamily } from "recoil";

import {
  ARMOR_NONE,
  ENCUMBRANCE,
  GEMS_MAXIMUM,
  GEM_DAMAGE,
  GEM_DURATION,
  GEM_ELEMENTALS,
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
import type { Consumable, Elemental, Gear, Trinket } from "@neverquest/types/unions";
import { stackItems } from "@neverquest/utilities/helpers";

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
      (slot) =>
      ({ get }) =>
        (slot === "armor"
          ? get(armor).gems.length
          : slot === "shield"
          ? get(shield).gems.length
          : get(weapon).gems.length) < GEMS_MAXIMUM,
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

export const gearElementalEffects = withStateKey("gearElementalEffects", (key) =>
  selectorFamily<Record<Elemental, { damage: number; duration: number }>, Exclude<Gear, "shield">>({
    get:
      (gear) =>
      ({ get }) => {
        const { damage, gems } =
          gear === "armor" ? { ...get(armor), damage: get(armor).protection } : get(weapon);

        return stackItems(gems).reduce(
          (current, { item, stack }) => ({
            ...current,
            [GEM_ELEMENTALS[(item as GemItem).type]]: {
              damage: Math.ceil(damage * GEM_DAMAGE * stack),
              duration: GEM_DURATION * stack,
            },
          }),
          {
            fire: { damage: 0, duration: 0 },
            ice: { damage: 0, duration: 0 },
            lightning: { damage: 0, duration: 0 },
          },
        );
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

export const thorns = withStateKey("thorns", (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(gearElementalEffects("armor"))).reduce(
        (current, { damage }) => current + damage,
        0,
      ),
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
