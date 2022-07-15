import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { isLevelCompleted, progress } from "neverquest/state/encounter";
import { monsterLoot } from "neverquest/state/monster";
import { showEssence, showAttributes, showCoins, showScrap } from "neverquest/state/show";

// PRIMITIVES

export const essence = atomWithReset(0);

export const essenceLoot = atomWithReset(0);

export const coins = atomWithReset(0);

export const coinsLoot = atomWithReset(0);

export const scrap = atomWithReset(0);

export const scrapLoot = atomWithReset(0);

// READERS

export const hasLooted = atom(
  (get) =>
    get(essenceLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0 && get(isLevelCompleted)
);

// WRITERS

export const lootDrop = atom(null, (get, set) => {
  const { essence, scrap } = get(monsterLoot);

  if (essence > 0) {
    set(essenceLoot, (current) => current + essence);
  }

  if (scrap > 0) {
    set(scrapLoot, (current) => current + scrap);
  }

  set(progress, (current) => current + 1);

  if (!get(showAttributes)) {
    set(showAttributes, true);
  }
});

export const resourcesBalance = atom(
  null,
  (
    get,
    set,
    {
      coinsDifference,
      essenceDifference,
      scrapDifference,
    }: Partial<{ coinsDifference: number; essenceDifference: number; scrapDifference: number }>
  ) => {
    const isLooting =
      coinsDifference === undefined &&
      essenceDifference === undefined &&
      scrapDifference === undefined;
    const coinsValue = isLooting ? get(coinsLoot) : coinsDifference || 0;
    const essenceValue = isLooting ? get(essenceLoot) : essenceDifference || 0;
    const scrapValue = isLooting ? get(scrapLoot) : scrapDifference || 0;

    if (coinsValue !== 0) {
      set(coins, (current) => current + coinsValue);

      if (!get(showCoins)) {
        set(showCoins, true);
      }

      if (isLooting) {
        set(coinsLoot, 0);
      }
    }

    if (essenceValue !== 0) {
      set(essence, (current) => current + essenceValue);

      if (!get(showEssence)) {
        set(showEssence, true);
      }

      if (isLooting) {
        set(essenceLoot, 0);
      }
    }

    if (scrapValue !== 0) {
      set(scrap, (current) => current + scrapValue);

      if (!get(showScrap)) {
        set(showScrap, true);
      }

      if (isLooting) {
        set(scrapLoot, 0);
      }
    }
  }
);
