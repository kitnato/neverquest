import { atom, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { InventoryItem } from "@neverquest/types";

// SELECTORS

export const hasLooted = withStateKey("hasLooted", (key) =>
  selector({
    get: ({ get }) => get(essenceLoot) === 0,
    key,
  }),
);

// ATOMS

export const essence = withStateKey("essence", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const essenceLoot = withStateKey("essenceLoot", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const itemsLoot = withStateKey("itemsLoot", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
