import { atom, selector } from "recoil";

import { isLevelCompleted, show } from "neverquest/state/global";

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
      aetherLootValue === 0 && coinsLootValue === 0 && isLevelCompletedValue && scrapLootValue === 0
    );
  },
  set: ({ get, set }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);
    const showValue = get(show);

    if (aetherLootValue > 0) {
      set(aether, (currentAether) => currentAether + aetherLootValue);
      set(aetherLoot, 0);

      if (!showValue.aether) {
        set(show, { ...showValue, aether: true });
      }
    }

    if (coinsLootValue > 0) {
      set(coins, (currentCoins) => currentCoins + coinsLootValue);
      set(coinsLoot, 0);

      if (!showValue.coins) {
        set(show, { ...showValue, coins: true });
      }
    }

    if (scrapLootValue > 0) {
      set(scrap, (currentScrap) => currentScrap + scrapLootValue);
      set(scrapLoot, 0);

      if (!showValue.scrap) {
        set(show, { ...showValue, scrap: true });
      }
    }
  },
});
