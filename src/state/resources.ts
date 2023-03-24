import { atom, selector } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

// SELECTORS

export const hasLooted = selector({
  get: ({ get }) => get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0,
  key: "hasLooted",
});

// ATOMS

export const essence = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "essence" })],
  key: "essence",
});

export const essenceLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "essenceLoot" })],
  key: "essenceLoot",
});

export const coins = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "coins" })],
  key: "coins",
});

export const coinsLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "coinsLoot" })],
  key: "coinsLoot",
});

export const scrap = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "scrap" })],
  key: "scrap",
});

export const scrapLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "scrapLoot" })],
  key: "scrapLoot",
});
