import { atom, selector } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { isLevelStarted, level, progress } from "@neverquest/state/encounter";
import { StorageKey } from "@neverquest/types/enums";
import { getDamagePerRate } from "@neverquest/utilities/getters";

// SELECTORS

export const damagePerSecondMonster = selector({
  get: ({ get }) =>
    getDamagePerRate({
      damage: get(totalDamageMonster),
      rate: get(totalAttackRateMonster),
    }),
  key: "damagePerSecondMonster",
});

export const isMonsterDead = selector({
  get: ({ get }) => get(isLevelStarted) && get(currentHealthMonster) === 0,
  key: "isMonsterDead",
});

export const maximumHealthMonster = selector({
  get: ({ get }) => Math.floor(get(level) * 2.25) + Math.floor(get(progress) / 3),
  key: "maximumHealthMonster",
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

export const totalAttackRateMonster = selector({
  get: ({ get }) => 4510 - get(progress) - 10 * get(level) * 2,
  key: "totalAttackRateMonster",
});

export const totalDamageMonster = selector({
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + Math.floor(levelValue / 3) + Math.floor(get(progress) / 3);
  },
  key: "totalDamageMonster",
});

// ATOMS

export const currentHealthMonster = atom({
  default: maximumHealthMonster,
  effects: [localStorage<number>(StorageKey.CurrentHealthMonster)],
  key: StorageKey.CurrentHealthMonster,
});

export const isMonsterNew = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsMonsterNew)],
  key: StorageKey.IsMonsterNew,
});

export const isMonsterStaggered = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsMonsterStaggered)],
  key: StorageKey.IsMonsterStaggered,
});

export const monsterBleedingDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.MonsterBleedingDuration)],
  key: StorageKey.MonsterBleedingDuration,
});

export const monsterName = atom({
  default: "",
  effects: [localStorage<string>(StorageKey.MonsterName)],
  key: StorageKey.MonsterName,
});

export const monsterStatusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorage<HTMLDivElement | null>(StorageKey.MonsterStatusElement)],
  key: StorageKey.MonsterStatusElement,
});
