import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { experience } from "neverquest/state/character";
import {
  deltaAether,
  deltaCoins,
  deltaExperience,
  deltaScrap,
  deltaScrapLoot,
} from "neverquest/state/deltas";
import { isLevelCompleted, progress } from "neverquest/state/global";
import { monsterLoot } from "neverquest/state/monster";
import { showAether, showAttributes, showCoins, showScrap } from "neverquest/state/show";
import { FloatingTextType } from "neverquest/types/ui";

// PRIMITIVES

export const aether = atomWithReset(0);

export const aetherLoot = atomWithReset(0);

export const coins = atomWithReset(0);

export const coinsLoot = atomWithReset(0);

export const scrap = atomWithReset(0);

export const scrapLoot = atomWithReset(0);

// READERS

export const hasLooted = atom(
  (get) =>
    get(aetherLoot) === 0 && get(coinsLoot) === 0 && get(scrapLoot) === 0 && get(isLevelCompleted)
);

// WRITERS

export const resourcesBalance = atom(
  null,
  (
    get,
    set,
    {
      aetherDifference,
      coinsDifference,
      scrapDifference,
    }: Partial<{ aetherDifference: number; coinsDifference: number; scrapDifference: number }>
  ) => {
    const aetherValue = aetherDifference || get(aetherLoot);
    const coinsValue = coinsDifference || get(coinsLoot);
    const scrapValue = scrapDifference || get(scrapLoot);
    const isLooting =
      aetherDifference === undefined &&
      coinsDifference === undefined &&
      scrapDifference === undefined;

    if (aetherValue !== 0) {
      const isPositive = aetherValue > 0;

      set(aether, (current) => current + aetherValue);
      set(deltaAether, {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? "+" : ""}${aetherValue}`,
      });

      if (!get(showAether)) {
        set(showAether, true);
      }

      if (isLooting) {
        set(aetherLoot, 0);
      }
    }

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

export const lootDrop = atom(null, (get, set) => {
  const { aether, experience: xp, scrap } = get(monsterLoot);

  if (aether > 0) {
    set(aetherLoot, (current) => current + aether);
    set(deltaAether, {
      color: FloatingTextType.Positive,
      value: `+${aether}`,
    });
  }

  if (scrap > 0) {
    set(scrapLoot, (current) => current + scrap);
    set(deltaScrapLoot, {
      color: FloatingTextType.Positive,
      value: `+${scrap}`,
    });
  }

  set(experience, (current) => current + xp);
  set(deltaExperience, { color: FloatingTextType.Positive, value: `+${xp}` });
  set(progress, (current) => current + 1);

  if (xp > 0 && !get(showAttributes)) {
    set(showAttributes, true);
  }
});
