import { atom, selector } from "recoil";

import { isLevelCompleted } from "state/global";

// ATOMS

export const aether = atom({
  key: "aether",
  default: 0,
});

export const aetherLoot = atom({
  key: "aetherLoot",
  default: null,
});

export const coins = atom({
  key: "coins",
  default: 0,
});

export const coinsLoot = atom({
  key: "coinsLoot",
  default: null,
});

export const scrap = atom({
  key: "scrap",
  default: 0,
});

export const scrapLoot = atom({
  key: "scrapLoot",
  default: null,
});

// SELECTORS

export const hasLooted = selector({
  key: "hasLooted",
  get: ({ get }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const isLevelCompletedValue = get(isLevelCompleted);
    const scrapLootValue = get(scrapLoot);

    return (
      aetherLootValue === null &&
      coinsLootValue === null &&
      isLevelCompletedValue &&
      scrapLootValue === null
    );
  },
  set: ({ get, set }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);

    set(aether, (currentAether) => currentAether + aetherLootValue);
    set(coins, (currentCoins) => currentCoins + coinsLootValue);
    set(scrap, (currentScrap) => currentScrap + scrapLootValue);

    set(aetherLoot, null);
    set(coinsLoot, null);
    set(scrapLoot, null);
  },
});
