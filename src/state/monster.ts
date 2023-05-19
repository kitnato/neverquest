import { atom, selector } from "recoil";

import { POISON } from "@neverquest/data/constants";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isLevelStarted, level, progress } from "@neverquest/state/encounter";
import { formatToFixed } from "@neverquest/utilities/formatters";
import { getDamagePerRate, getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isLevelStarted) && get(monsterCurrentHealth) === 0,
    key,
  })
);

export const isMonsterStaggered = withStateKey("isMonsterStaggered", (key) =>
  selector({
    get: ({ get }) => get(monsterStaggeredDuration) > 0,
    key,
  })
);

export const monsterAttackRate = withStateKey("monsterAttackRate", (key) =>
  selector({
    get: ({ get }) =>
      4200 -
      Math.round(4000 * getGrowthSigmoid(get(level)) - 100 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(1000 * getGrowthSigmoid(get(level)) + 50 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterDamagePerSecond = withStateKey("monsterDamagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      formatToFixed(
        getDamagePerRate({
          damage: get(monsterDamage),
          rate: get(monsterAttackRate),
        })
      ),
    key,
  })
);

export const monsterMaximumHealth = withStateKey("monsterMaximumHealth", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(3000 * getGrowthSigmoid(get(level)) + 100 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterPoison = withStateKey("monsterPoison", (key) =>
  selector({
    get: ({ get }) => {
      const levelValue = get(level);
      const { chanceBase, chanceIncrement, minimumLevel } = POISON;

      if (levelValue < minimumLevel) {
        return 0;
      }

      // TODO - use sigmoid growth
      return chanceBase + (levelValue - minimumLevel) * chanceIncrement;
    },
    key,
  })
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const levelValue = get(level);
      const growthFactor = getGrowthSigmoid(levelValue);
      const progressFactor = getGrowthSigmoid(get(progress)) * 100;

      return {
        coins: Math.round(progressFactor + 150 * growthFactor),
        essence: Math.round(progressFactor + 200 * growthFactor),
        scrap: Math.round(progressFactor + 250 * growthFactor),
      };
    },
    key,
  })
);

// ATOMS

export const isMonsterNew = withStateKey("isMonsterNew", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const monsterAttackDuration = withStateKey("monsterAttackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const monsterBleedingDuration = withStateKey("monsterBleedingDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const monsterCurrentHealth = withStateKey("masteries", (key) =>
  atom({
    default: monsterMaximumHealth,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const monsterName = withStateKey("monsterName", (key) =>
  atom({
    default: null,
    effects: [handleLocalStorage<string | null>({ key })],
    key,
  })
);

export const monsterStaggeredDuration = withStateKey("monsterStaggeredDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const monsterElement = withStateKey("monsterElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage<HTMLDivElement | null>({ key })],
    key,
  })
);
