import { atom, selector } from "recoil";

import { isLevelCompleted } from "neverquest/state/global";
import { showAether, showCoins, showScrap } from "neverquest/state/show";

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
  set: ({ get, set }) => {
    const aetherLootValue = get(aetherLoot);
    const coinsLootValue = get(coinsLoot);
    const scrapLootValue = get(scrapLoot);
    const showAetherValue = get(showAether);
    const showCoinsValue = get(showCoins);
    const showScrapValue = get(showScrap);

    if (aetherLootValue > 0) {
      set(aether, (currentAether) => currentAether + aetherLootValue);
      set(aetherLoot, 0);

      if (!showAetherValue) {
        set(showAether, true);
      }
    }

    if (coinsLootValue > 0) {
      set(coins, (currentCoins) => currentCoins + coinsLootValue);
      set(coinsLoot, 0);

      if (!showCoinsValue) {
        set(showCoins, true);
      }
    }

    if (scrapLootValue > 0) {
      set(scrap, (currentScrap) => currentScrap + scrapLootValue);
      set(scrapLoot, 0);

      if (!showScrapValue) {
        set(showScrap, true);
      }
    }
  },
});
