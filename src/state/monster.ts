import { atom, selector } from "recoil";

import { POISON } from "@neverquest/data/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { isLevelStarted, level, progress } from "@neverquest/state/encounter";
import { getDamagePerRate, getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isMonsterDead = selector({
  get: ({ get }) => get(isLevelStarted) && get(monsterCurrentHealth) === 0,
  key: "isMonsterDead",
});

export const isMonsterStaggered = selector({
  get: ({ get }) => get(monsterStaggeredDuration) > 0,
  key: "isMonsterStaggered",
});

export const monsterAttackDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "monsterAttackDuration" })],
  key: "monsterAttackDuration",
});

export const monsterAttackRate = selector({
  get: ({ get }) =>
    4500 - Math.round(4000 * getGrowthSigmoid(get(level)) - 10 * getGrowthSigmoid(get(progress))),
  key: "monsterAttackRate",
});

export const monsterDamage = selector({
  get: ({ get }) =>
    Math.round(1000 * getGrowthSigmoid(get(level)) + 50 * getGrowthSigmoid(get(progress))),
  key: "monsterDamage",
});

export const monsterDamagePerSecond = selector({
  get: ({ get }) =>
    getDamagePerRate({
      damage: get(monsterDamage),
      rate: get(monsterAttackRate),
    }),
  key: "monsterDamagePerSecond",
});

export const monsterMaximumHealth = selector({
  get: ({ get }) =>
    Math.round(3000 * getGrowthSigmoid(get(level)) + 100 * getGrowthSigmoid(get(progress))),
  key: "monsterMaximumHealth",
});

export const monsterPoisonChance = selector({
  get: ({ get }) => {
    const levelValue = get(level);
    const { chanceBase, chanceIncrement, minimumLevel } = POISON;

    if (levelValue < minimumLevel) {
      return 0;
    }

    // TODO - use sigmoid growth
    return chanceBase + (levelValue - minimumLevel) * chanceIncrement;
  },
  key: "monsterPoisonChance",
});

export const monsterLoot = selector({
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
  key: "monsterLoot",
});

// ATOMS

export const isMonsterNew = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isMonsterNew" })],
  key: "isMonsterNew",
});

export const monsterBleedingDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "monsterBleedingDuration" })],
  key: "monsterBleedingDuration",
});

export const monsterCurrentHealth = atom({
  default: monsterMaximumHealth,
  effects: [handleLocalStorage<number>({ key: "monsterCurrentHealth" })],
  key: "monsterCurrentHealth",
});

export const monsterName = atom({
  default: "",
  effects: [handleLocalStorage<string>({ key: "monsterName" })],
  key: "monsterName",
});

export const monsterStaggeredDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "monsterStaggeredDuration" })],
  key: "monsterStaggeredDuration",
});

export const monsterElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [handleLocalStorage<HTMLDivElement | null>({ key: "monsterElement" })],
  key: "monsterElement",
});
