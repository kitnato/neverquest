import { atom, DefaultValue, selector } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { isLevelCompleted, progress } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterLoot } from "@neverquest/state/monster";
import { ShowingType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const essence = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.Essence)],
  key: StorageKey.Essence,
});

export const essenceLoot = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.EssenceLoot)],
  key: StorageKey.EssenceLoot,
});

export const coins = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.Coins)],
  key: StorageKey.Coins,
});

export const coinsLoot = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CoinsLoot)],
  key: StorageKey.CoinsLoot,
});

export const scrap = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.Scrap)],
  key: StorageKey.Scrap,
});

export const scrapLoot = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.ScrapLoot)],
  key: StorageKey.ScrapLoot,
});

// SELECTORS

export const hasLooted = selector({
  key: "hasLooted",
  get: ({ get }) =>
    get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0 && get(isLevelCompleted),
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const lootDrop = selector({
  get: () => null,
  key: "lootDrop",
  set: ({ get, set }) => {
    const { essence, scrap } = get(monsterLoot);

    if (essence > 0) {
      set(essenceLoot, (current) => current + essence);
    }

    if (scrap > 0) {
      set(scrapLoot, (current) => current + scrap);
    }

    set(progress, (current) => current + 1);

    if (!get(isShowing(ShowingType.Attributes))) {
      set(isShowing(ShowingType.Attributes), true);
    }
  },
});

export const resourcesBalance = selector({
  get: () => ({}),
  key: "resourcesBalance",
  set: (
    { get, set },
    difference:
      | Partial<{ coinsDifference: number; essenceDifference: number; scrapDifference: number }>
      | DefaultValue
  ) => {
    if (difference instanceof DefaultValue) {
      return;
    }

    const { coinsDifference, essenceDifference, scrapDifference } = difference;
    const isLooting =
      coinsDifference === undefined &&
      essenceDifference === undefined &&
      scrapDifference === undefined;
    const coinsValue = isLooting ? get(coinsLoot) : coinsDifference || 0;
    const essenceValue = isLooting ? get(essenceLoot) : essenceDifference || 0;
    const scrapValue = isLooting ? get(scrapLoot) : scrapDifference || 0;

    if (coinsValue !== 0) {
      set(coins, (current) => current + coinsValue);

      if (!get(isShowing(ShowingType.Coins))) {
        set(isShowing(ShowingType.Coins), true);
      }

      if (isLooting) {
        set(coinsLoot, 0);
      }
    }

    if (essenceValue !== 0) {
      set(essence, (current) => current + essenceValue);

      if (!get(isShowing(ShowingType.Essence))) {
        set(isShowing(ShowingType.Essence), true);
      }

      if (!get(isShowing(ShowingType.AttributesButton))) {
        set(isShowing(ShowingType.AttributesButton), true);
      }

      if (isLooting) {
        set(essenceLoot, 0);
      }
    }

    if (scrapValue !== 0) {
      set(scrap, (current) => current + scrapValue);

      if (!get(isShowing(ShowingType.Scrap))) {
        set(isShowing(ShowingType.Scrap), true);
      }

      if (isLooting) {
        set(scrapLoot, 0);
      }
    }
  },
});
