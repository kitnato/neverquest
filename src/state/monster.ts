import { atom, selector } from "recoil";

import { POISON } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { isLevelStarted, level, progress } from "@neverquest/state/encounter";
import { StorageKey } from "@neverquest/types/enums";
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
  effects: [handleLocalStorage<number>(StorageKey.MonsterAttackDuration)],
  key: StorageKey.MonsterAttackDuration,
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
  effects: [handleLocalStorage<boolean>(StorageKey.IsMonsterNew)],
  key: StorageKey.IsMonsterNew,
});

export const monsterBleedingDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.MonsterBleedingDuration)],
  key: StorageKey.MonsterBleedingDuration,
});

export const monsterCurrentHealth = atom({
  default: monsterMaximumHealth,
  effects: [handleLocalStorage<number>(StorageKey.MonsterCurrentHealth)],
  key: StorageKey.MonsterCurrentHealth,
});

export const monsterName = atom({
  default: "",
  effects: [handleLocalStorage<string>(StorageKey.MonsterName)],
  key: StorageKey.MonsterName,
});

export const monsterStaggeredDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.MonsterStaggeredDuration)],
  key: StorageKey.MonsterStaggeredDuration,
});

export const monsterElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [handleLocalStorage<HTMLDivElement | null>(StorageKey.MonsterElement)],
  key: StorageKey.MonsterElement,
});
