import { atom, selector } from "recoil";

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

export const isLooting = selector({
  key: "isLooting",
  get: ({ get }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);

    return !(
      aetherLootValue === null &&
      coinsLootValue === null &&
      scrapLootValue === null
    );
  },
  set: ({ get, set }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);

    set(aether, (currentAether) => (currentAether || 0) + aetherLootValue);
    set(coins, (currentCoins) => (currentCoins || 0) + coinsLootValue);
    set(scrap, (currentScrap) => (currentScrap || 0) + scrapLootValue);

    set(aetherLoot, null);
    set(coinsLoot, null);
    set(scrapLoot, null);
  },
});
