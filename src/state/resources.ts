import { atom, selector } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const hasLooted = selector({
  get: ({ get }) => get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0,
  key: "hasLooted",
});

// ATOMS

export const essence = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.Essence)],
  key: StorageKey.Essence,
});

export const essenceLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.EssenceLoot)],
  key: StorageKey.EssenceLoot,
});

export const coins = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.Coins)],
  key: StorageKey.Coins,
});

export const coinsLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.CoinsLoot)],
  key: StorageKey.CoinsLoot,
});

export const scrap = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.Scrap)],
  key: StorageKey.Scrap,
});

export const scrapLoot = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.ScrapLoot)],
  key: StorageKey.ScrapLoot,
});
