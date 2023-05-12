import { atom, selector } from "recoil";
import { handleLocalStorage, withStateKey } from "@neverquest/state";

// SELECTORS

export const hasLooted = withStateKey("hasLooted", (key) =>
  selector({
    get: ({ get }) => get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0,
    key,
  })
);

// ATOMS

export const essence = withStateKey("essence", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const essenceLoot = withStateKey("essenceLoot", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const coins = withStateKey("coins", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const coinsLoot = withStateKey("coinsLoot", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const scrap = withStateKey("scrap", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const scrapLoot = withStateKey("scrapLoot", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
