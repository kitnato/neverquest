import { atom, selector } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { StorageKey } from "@neverquest/types/enums";

// ATOMS

export const essence = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.Essence)],
  key: StorageKey.Essence,
});

export const essenceLoot = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.EssenceLoot)],
  key: StorageKey.EssenceLoot,
});

export const coins = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.Coins)],
  key: StorageKey.Coins,
});

export const coinsLoot = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.CoinsLoot)],
  key: StorageKey.CoinsLoot,
});

export const scrap = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.Scrap)],
  key: StorageKey.Scrap,
});

export const scrapLoot = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.ScrapLoot)],
  key: StorageKey.ScrapLoot,
});

// SELECTORS

export const hasLooted = selector({
  get: ({ get }) =>
    get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0 && get(isLevelCompleted),
  key: "hasLooted",
});
