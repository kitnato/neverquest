import { atom, selector } from "recoil";

import { handleStorage } from "@neverquest/state/effects/handleStorage";
import { isStageCompleted, progress, progressMaximum } from "@neverquest/state/encounter";
import type { InventoryItem } from "@neverquest/types";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isLootAvailable = withStateKey("isLootAvailable", (key) =>
  selector({
    get: ({ get }) => get(essenceLoot) > 0 || get(itemsLoot).length > 0,
    key,
  }),
);

export const hasLootedEssence = withStateKey("hasLootedEssence", (key) =>
  selector({
    get: ({ get }) =>
      (get(progressMaximum) === Number.POSITIVE_INFINITY
        ? get(progress) > 0
        : get(isStageCompleted)) && get(essenceLoot) === 0,
    key,
  }),
);

// ATOMS

export const essence = withStateKey("essence", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const essenceLoot = withStateKey("essenceLoot", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const itemsLoot = withStateKey("itemsLoot", (key) =>
  atom<InventoryItem[]>({
    default: [],
    effects: [handleStorage({ key })],
    key,
  }),
);
