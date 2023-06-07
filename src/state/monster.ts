import { atom, selector } from "recoil";

import { POISON } from "@neverquest/data/statistics";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { formatFloat } from "@neverquest/utilities/formatters";
import { getDamagePerRate, getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isStageStarted) && get(monsterHealthCurrent) === 0,
    key,
  })
);

export const isMonsterStaggered = withStateKey("isMonsterStaggered", (key) =>
  selector({
    get: ({ get }) => get(monsterStaggerDuration) > 0,
    key,
  })
);

export const monsterAttackRate = withStateKey("monsterAttackRate", (key) =>
  selector({
    get: ({ get }) =>
      4500 - Math.round(4000 * getGrowthSigmoid(get(stage)) - 80 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(700 * getGrowthSigmoid(get(stage)) + 50 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterDamagePerSecond = withStateKey("monsterDamagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      formatFloat(
        getDamagePerRate({
          damage: get(monsterDamage),
          rate: get(monsterAttackRate),
        })
      ),
    key,
  })
);

export const monsterHealthMaximum = withStateKey("monsterHealthMaximum", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(2400 * getGrowthSigmoid(get(stage)) + 100 * getGrowthSigmoid(get(progress))),
    key,
  })
);

export const monsterPoison = withStateKey("monsterPoison", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);
      const { chanceBase, chanceIncrement, minimumLevel } = POISON;

      if (stageValue < minimumLevel) {
        return 0;
      }

      // TODO - use sigmoid growth
      return chanceBase + (stageValue - minimumLevel) * chanceIncrement;
    },
    key,
  })
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);
      const growthFactor = getGrowthSigmoid(stageValue);
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

export const monsterHealthCurrent = withStateKey("masteries", (key) =>
  atom({
    default: monsterHealthMaximum,
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

export const monsterStaggerDuration = withStateKey("monsterStaggerDuration", (key) =>
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
