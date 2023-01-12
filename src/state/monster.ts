import { atom, selector } from "recoil";

import { POISON } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { isLevelStarted, level, progress } from "@neverquest/state/encounter";
import { StorageKey } from "@neverquest/types/enums";
import { getDamagePerRate } from "@neverquest/utilities/getters";

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
  effects: [localStorage<number>(StorageKey.MonsterAttackDuration)],
  key: StorageKey.MonsterAttackDuration,
});

export const monsterAttackRate = selector({
  get: ({ get }) => 4510 - get(progress) - 10 * get(level) * 2,
  key: "monsterAttackRate",
});

export const monsterDamage = selector({
  get: ({ get }) => Math.floor(get(level) * 6 + get(progress) / 2),
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
  get: ({ get }) => Math.floor(get(level) * 20 + get(progress) / 2),
  key: "monsterMaximumHealth",
});

export const monsterPoisonChance = selector({
  get: ({ get }) => {
    const levelValue = get(level);
    const { chanceBase, chanceIncrement, minimumLevel } = POISON;

    if (levelValue < minimumLevel) {
      return 0;
    }

    return chanceBase + (levelValue - minimumLevel) * chanceIncrement;
  },
  key: "monsterPoisonChance",
});

export const monsterLoot = selector({
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return {
      essence: Math.floor(progressValue * 2 + levelValue * 3),
      scrap: Math.floor(progressValue * 1.5 + levelValue * 2),
    };
  },
  key: "monsterLoot",
});

// ATOMS

export const isMonsterNew = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsMonsterNew)],
  key: StorageKey.IsMonsterNew,
});

export const monsterBleedingDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.MonsterBleedingDuration)],
  key: StorageKey.MonsterBleedingDuration,
});

export const monsterCurrentHealth = atom({
  default: monsterMaximumHealth,
  effects: [localStorage<number>(StorageKey.MonsterCurrentHealth)],
  key: StorageKey.MonsterCurrentHealth,
});

export const monsterName = atom({
  default: "",
  effects: [localStorage<string>(StorageKey.MonsterName)],
  key: StorageKey.MonsterName,
});

export const monsterStaggeredDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.MonsterStaggeredDuration)],
  key: StorageKey.MonsterStaggeredDuration,
});

export const monsterStatusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorage<HTMLDivElement | null>(StorageKey.MonsterStatusElement)],
  key: StorageKey.MonsterStatusElement,
});
