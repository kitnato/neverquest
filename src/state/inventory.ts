import { atom, selector, selectorFamily } from "recoil";

import { ENCUMBRANCE } from "@neverquest/data/inventory";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { InventoryItem } from "@neverquest/types";

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
    get: ({ get }) => {
      const inventoryValue = get(inventory);

      return inventoryValue.reduce((current, item) => current + item.weight, 0);
    },
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
