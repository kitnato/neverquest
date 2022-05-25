import { atom } from "jotai";

import { isLevelCompleted } from "neverquest/state/global";

// PRIMITIVES

export const aether = atom(0);

export const aetherLoot = atom(0);

export const coins = atom(0);

export const coinsLoot = atom(0);

export const scrap = atom(0);

export const scrapLoot = atom(0);

// READERS

export const hasLooted = atom((get) => {
  const aetherLootValue = get(aetherLoot);
  const coinsLootValue = get(coinsLoot);
  const isLevelCompletedValue = get(isLevelCompleted);
  const scrapLootValue = get(scrapLoot);

  return (
    aetherLootValue === 0 && coinsLootValue === 0 && scrapLootValue === 0 && isLevelCompletedValue
  );
});
