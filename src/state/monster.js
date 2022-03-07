import { atom, selector } from "recoil";

import SLIM from "slim";
import { level, progress } from "state/global";
import { getFromRange } from "utilities/helpers";

// SELECTORS

export const isMonsterDead = selector({
  key: "isMonsterDead",
  get: ({ get }) => {
    const currentHealthMonsterValue = get(currentHealthMonster);

    return currentHealthMonsterValue === 0;
  },
});

export const maxHealthMonster = selector({
  key: "maxHealthMonster",
  get: ({ get }) => {
    const levelValue = get(level) + 1;
    const progressValue = get(progress);

    return (
      levelValue +
      progressValue +
      getFromRange({ min: levelValue, max: levelValue * 2 })
    );
  },
});

export const monsterLoot = selector({
  key: "monsterLoot",
  get: ({ get }) => {
    const hasTreasureValue = get(hasTreasure);
    const levelValue = get(level) + 1;
    const progressValue = get(progress);
    const range = Math.ceil(levelValue + progressValue / 2);

    return {
      aether: getFromRange({
        min: levelValue >= 10 ? levelValue - range : 0,
        max: levelValue >= 10 ? levelValue + range - 2 : 0,
      }),
      coins: hasTreasureValue
        ? getFromRange({
            min: levelValue,
            max: levelValue + Math.ceil(range * 1.5),
          })
        : 0,
      experience: getFromRange({
        min: levelValue,
        max: levelValue + Math.ceil(range * 2),
      }),
      scrap: getFromRange({
        min: levelValue * 2,
        max: levelValue * 2 + Math.ceil(range * 2),
      }),
    };
  },
});

export const totalAttackRateMonster = selector({
  key: "totalAttackRateMonster",
  get: ({ get }) => {
    const levelValue = get(level) + 1;
    const progressValue = get(progress);

    return (
      4510 -
      progressValue -
      10 * getFromRange({ min: levelValue, max: levelValue * 2 })
    );
  },
});

export const totalDamageMonster = selector({
  key: "totalDamageMonster",
  get: ({ get }) => {
    const levelValue = get(level) + 1;
    const progressValue = get(progress);
    const base = Math.floor(levelValue + progressValue / 3);

    return { min: base, max: base + levelValue };
  },
});

// ATOMS

export const currentHealthMonster = atom({
  key: "currentHealthMonster",
  default: maxHealthMonster,
});

export const deltaHealthMonster = atom({
  key: "deltaHealthMonster",
  default: null,
});

export const isEngaged = atom({
  key: "isEngaged",
  default: false,
});

// TODO
export const hasTreasure = atom({
  key: "hasTreasure",
  default: false,
});

export const monsterName = atom({
  key: "monsterName",
  default: SLIM.generate("monster"),
});
