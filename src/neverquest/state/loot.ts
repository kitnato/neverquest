import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { isLevelCompleted } from "neverquest/state/global";

// PRIMITIVES

export const aether = atomWithReset(0);

export const aetherLoot = atomWithReset(0);

export const coins = atomWithReset(0);

export const coinsLoot = atomWithReset(0);

export const scrap = atomWithReset(0);

export const scrapLoot = atomWithReset(0);

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
