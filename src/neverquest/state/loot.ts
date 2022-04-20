import { atom, selector } from "recoil";

import { isLevelCompleted } from "neverquest/state/global";

// ATOMS

export const aether = atom({
  key: "aether",
  default: 0,
});

export const aetherLoot = atom({
  key: "aetherLoot",
  default: 0,
});

export const coins = atom({
  key: "coins",
  default: 0,
});

export const coinsLoot = atom({
  key: "coinsLoot",
  default: 0,
});

export const scrap = atom({
  key: "scrap",
  default: 0,
});

export const scrapLoot = atom({
  key: "scrapLoot",
  default: 0,
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
      aetherLootValue === 0 && coinsLootValue === 0 && scrapLootValue === 0 && isLevelCompletedValue
    );
  },
});
