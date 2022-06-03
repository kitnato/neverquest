import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import {
  deltaEssence,
  deltaEssenceLoot,
  deltaCoins,
  deltaScrap,
  deltaScrapLoot,
} from "neverquest/state/deltas";
import { isLevelCompleted, progress } from "neverquest/state/encounter";
import { monsterLoot } from "neverquest/state/monster";
import { showEssence, showAttributes, showCoins, showScrap } from "neverquest/state/show";
import { FloatingTextType } from "neverquest/types/ui";

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
    set(deltaEssenceLoot, {
      color: FloatingTextType.Positive,
      value: `+${essence}`,
    });
  }

  if (scrap > 0) {
    set(scrapLoot, (current) => current + scrap);
    set(deltaScrapLoot, {
      color: FloatingTextType.Positive,
      value: `+${scrap}`,
    });
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
    const coinsValue = coinsDifference || get(coinsLoot);
    const essenceValue = essenceDifference || get(essenceLoot);
    const scrapValue = scrapDifference || get(scrapLoot);
    const isLooting =
      coinsDifference === undefined &&
      essenceDifference === undefined &&
      scrapDifference === undefined;

    if (coinsValue !== 0) {
      const isPositive = coinsValue > 0;

      set(coins, (current) => current + coinsValue);
      set(deltaCoins, {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${coinsValue}`,
      });

      if (!get(showCoins)) {
        set(showCoins, true);
      }

      if (isLooting) {
        set(coinsLoot, 0);
      }
    }

    if (essenceValue !== 0) {
      const isPositive = essenceValue > 0;

      set(essence, (current) => current + essenceValue);
      set(deltaEssence, {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${essenceValue}`,
      });

      if (!get(showEssence)) {
        set(showEssence, true);
      }

      if (isLooting) {
        set(essenceLoot, 0);
      }
    }

    if (scrapValue !== 0) {
      const isPositive = scrapValue > 0;

      set(scrap, (current) => current + scrapValue);
      set(deltaScrap, {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${scrapValue}`,
      });

      if (!get(showScrap)) {
        set(showScrap, true);
      }

      if (isLooting) {
        set(scrapLoot, 0);
      }
    }
  }
);
