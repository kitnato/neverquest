import { atom, selector } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { InventoryItem } from "@neverquest/types";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isLootAvailable = withStateKey("isLootAvailable", (key) =>
  selector({
    get: ({ get }) => get(essenceLoot) > 0 || get(itemsLoot).length > 0,
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

export const hasLooted = withStateKey("hasLooted", (key) =>
  atom({
    default: false,
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
