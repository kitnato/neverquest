import { atom, selector, selectorFamily } from "recoil";

import { skills } from "./skills";
import { ENCUMBRANCE } from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { InventoryItem } from "@neverquest/types";
import { isArmor, isGear, isMelee, isRanged, isShield } from "@neverquest/types/type-guards";

// SELECTORS

export const canFit = withStateKey("canFit", (key) =>
  selectorFamily<boolean, number>({
    get:
      (parameter) =>
      ({ get }) =>
        get(encumbrance) + parameter <= get(encumbranceMaximum),
    key,
  }),
);

export const encumbrance = withStateKey("encumbrance", (key) =>
  selector({
    get: ({ get }) => get(inventory).reduce((aggregator, { weight }) => aggregator + weight, 0),
    key,
  }),
);

export const equippableItems = withStateKey("equippableItems", (key) =>
  selector<Record<string, boolean>>({
    get: ({ get }) =>
      get(inventory).reduce((aggregator, { id, ...current }) => {
        let canEquip = isGear(current) ? !current.isEquipped : false;

        if (isArmor(current) && current.gearClass === "heavy") {
          canEquip = get(skills("armorcraft"));
        }

        if (isMelee(current) && current.grip === "two-handed") {
          canEquip = get(skills("siegecraft"));
        }

        if (isRanged(current)) {
          canEquip = get(skills("archery"));
        }

        if (isShield(current) && current.gearClass === "tower") {
          canEquip = get(skills("shieldcraft"));
        }

        return {
          ...aggregator,
          [id]: canEquip,
        };
      }, {}),
    key,
  }),
);

export const isInventoryFull = withStateKey("isInventoryFull", (key) =>
  selector({
    get: ({ get }) => get(encumbrance) >= get(encumbranceMaximum),
    key,
  }),
);

// ATOMS

export const encumbranceMaximum = withStateKey("encumbranceMaximum", (key) =>
  atom({
    default: ENCUMBRANCE,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const hasKnapsack = withStateKey("hasKnapsack", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const inventory = withStateKey("inventory", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isInventoryOpen = withStateKey("isInventoryOpen", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const itemsAcquired = withStateKey("itemsAcquired", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const notifyOverEncumbrance = withStateKey("notifyOverEncumbrance", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
