import { atom, selector } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { level, progress } from "@neverquest/state/encounter";
import { StorageKey } from "@neverquest/types/enums";
import { getDamagePerRate } from "@neverquest/utilities/helpers";

// ATOMS

export const currentHealthMonster = atom({
  default: -1,
  effects: [localStorage<number>(StorageKey.CurrentHealthMonster)],
  key: StorageKey.CurrentHealthMonster,
});

export const isMonsterEngaged = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsMonsterEngaged)],
  key: StorageKey.IsMonsterEngaged,
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
  get: ({ get }) => get(currentHealthMonster) === 0,
  key: "isMonsterDead",
});

export const maximumHealthMonster = selector({
  get: ({ get }) => Math.ceil(get(level) * 1.5) + Math.floor(get(progress) / 3),
  key: "maximumHealthMonster",
});

export const monsterLoot = selector({
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return {
      essence: Math.floor(progressValue * 0.5 + levelValue * 2.5),
      scrap: Math.floor(progressValue * 1.2 + levelValue * 1.75),
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

    return levelValue + Math.floor(levelValue / 2.5) + Math.floor(get(progress) / 3);
  },
  key: "totalDamageMonster",
});
