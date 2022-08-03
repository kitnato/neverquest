import { atom, selector } from "recoil";

import LOCRA from "@neverquest/locra";
import { CreatureType } from "@neverquest/locra/types";
import { deltas } from "@neverquest/state/deltas";
import { localStorageEffect } from "@neverquest/state/effects";
import { level, progress } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/global";
import { FloatingTextType } from "@neverquest/types/ui";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { getDamagePerSecond } from "@neverquest/utilities/helpers";

// ATOMS

export const currentHealthMonster = atom({
  default: -1,
  effects: [localStorageEffect<number>(StorageKey.CurrentHealthMonster)],
  key: StorageKey.CurrentHealthMonster,
});
export const isMonsterEngaged = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsMonsterEngaged)],
  key: StorageKey.IsMonsterEngaged,
});

export const isMonsterNew = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsMonsterNew)],
  key: StorageKey.IsMonsterNew,
});

export const isMonsterStaggered = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsMonsterStaggered)],
  key: StorageKey.IsMonsterStaggered,
});

export const monsterName = atom({
  default: "",
  effects: [localStorageEffect<string>(StorageKey.MonsterName)],
  key: StorageKey.MonsterName,
});

export const monsterStatusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorageEffect<HTMLDivElement | null>(StorageKey.MonsterStatusElement)],
  key: StorageKey.MonsterStatusElement,
});

// SELECTORS

export const damagePerSecondMonster = selector({
  key: "damagePerSecondMonster",
  get: ({ get }) =>
    getDamagePerSecond({
      damage: get(totalDamageMonster),
      rate: get(totalAttackRateMonster),
    }),
});

export const isMonsterDead = selector({
  key: "isMonsterDead",
  get: ({ get }) => get(currentHealthMonster) === 0,
});

export const maximumHealthMonster = selector({
  key: "maximumHealthMonster",
  get: ({ get }) => Math.ceil(get(level) * 2) + Math.floor(get(progress) / 2),
});

export const monsterLoot = selector({
  key: "monsterLoot",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return {
      essence: Math.floor(progressValue * 0.5 + levelValue * 2.5),
      scrap: Math.floor(progressValue * 1.2 + levelValue * 1.75),
    };
  },
});

export const totalAttackRateMonster = selector({
  key: "totalAttackRateMonster",
  get: ({ get }) => 4510 - get(progress) - 10 * get(level) * 2,
});

export const totalDamageMonster = selector({
  key: "totalDamageMonster",
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + Math.floor(levelValue / 2.5) + Math.floor(get(progress) / 3);
  },
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const monsterCreate = selector({
  get: () => null,
  key: "monsterCreate",
  set: ({ get, set }) => {
    set(
      monsterName,
      LOCRA.generateCreature({
        isNSFW: get(isNSFW),
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(get(level) / 2),
        type: CreatureType.Monster,
      })
    );

    set(isMonsterEngaged, false);
    set(currentHealthMonster, get(maximumHealthMonster));
    set(isMonsterNew, true);
  },
});

export const monsterRegenerate = selector({
  get: () => null,
  key: "monsterRegenerate",
  set: ({ get, set }) => {
    const maximumHealthMonsterValue = get(maximumHealthMonster);
    const difference = maximumHealthMonsterValue - get(currentHealthMonster);

    if (difference > 0) {
      set(deltas(DeltaType.HealthMonster), {
        color: FloatingTextType.Positive,
        value: `+${difference}`,
      });
    }

    set(currentHealthMonster, maximumHealthMonsterValue);
  },
});
