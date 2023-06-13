import { atom, selector } from "recoil";

import {
  BLIGHT,
  LOOT,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
  POISON,
} from "@neverquest/data/monster";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { formatFloat } from "@neverquest/utilities/formatters";
import { getDamagePerRate, getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isStageStarted) && get(monsterHealth) === 0,
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
    get: ({ get }) => {
      const { base, bonus, reduction } = MONSTER_ATTACK_RATE;

      return (
        base -
        Math.round(
          reduction * getGrowthSigmoid(get(stage)) + bonus * getGrowthSigmoid(get(progress))
        )
      );
    },
    key,
  })
);

export const monsterBlightChance = withStateKey("monsterBlightChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const { chanceBase, chanceMaximum, stageRequired } = BLIGHT;

      if (stageValue < stageRequired) {
        return 0;
      }

      return chanceBase + chanceMaximum * getGrowthSigmoid(stageValue);
    },
    key,
  })
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { bonus, maximum } = MONSTER_DAMAGE;

      return Math.round(
        maximum * getGrowthSigmoid(get(stage)) + bonus * getGrowthSigmoid(get(progress))
      );
    },
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
    get: ({ get }) => {
      const { bonus, maximum } = MONSTER_HEALTH;

      return Math.round(
        maximum * getGrowthSigmoid(get(stage)) + bonus * getGrowthSigmoid(get(progress))
      );
    },
    key,
  })
);

export const monsterPoisonChance = withStateKey("monsterPoisonChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const { chanceBase, chanceMaximum, stageRequired } = POISON;

      if (stageValue < stageRequired) {
        return 0;
      }

      return chanceBase + chanceMaximum * getGrowthSigmoid(stageValue);
    },
    key,
  })
);

export const monsterPoisonDuration = withStateKey("monsterPoisonDuration", (key) =>
  selector({
    get: ({ get }) => {
      const { durationBase, durationMaximum } = POISON;

      return durationBase + durationMaximum * getGrowthSigmoid(get(stage));
    },
    key,
  })
);

export const monsterPoisonMagnitude = withStateKey("monsterPoisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const { magnitudeBase, magnitudeMaximum } = POISON;

      return magnitudeBase + magnitudeMaximum * getGrowthSigmoid(get(stage));
    },
    key,
  })
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const { bonus, coinsBase, essenceBase, scrapBase } = LOOT;

      const stageValue = get(stage);
      const growthFactor = getGrowthSigmoid(stageValue);
      const progressFactor = getGrowthSigmoid(get(progress)) * bonus;

      return {
        coins: Math.round(progressFactor + coinsBase * growthFactor),
        essence: Math.round(progressFactor + essenceBase * growthFactor),
        scrap: Math.round(progressFactor + scrapBase * growthFactor),
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

export const monsterHealth = withStateKey("masteries", (key) =>
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
