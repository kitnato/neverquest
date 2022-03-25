import { atom, selector } from "recoil";

import { level, progress } from "neverquest/state/global";
import { getDamagePerSecond, getFromRange } from "neverquest/utilities/helpers";

// ATOMS

export const currentHealthMonster = atom({
  key: "currentHealthMonster",
  default: -1,
});

export const deltaHealthMonster = atom({
  key: "deltaHealthMonster",
  default: 0,
});

export const isEngaged = atom({
  key: "isEngaged",
  default: false,
});

// TODO - determines whether Monster has Coins as loot
export const hasTreasure = atom({
  key: "hasTreasure",
  default: false,
});

export const monsterName = atom({
  key: "monsterName",
  default: "",
});

// SELECTORS

export const isMonsterDead = selector({
  key: "isMonsterDead",
  get: ({ get }) => {
    const currentHealthMonsterValue = get(currentHealthMonster);

    return currentHealthMonsterValue === 0;
  },
});

export const damagePerSecondMonster = selector({
  key: "damagePerSecondMonster",
  get: ({ get }) => {
    const totalAttackRateMonsterValue = get(totalAttackRateMonster);
    const totalDamageMonsterValue = get(totalDamageMonster);

    return getDamagePerSecond({
      range: totalDamageMonsterValue,
      rate: totalAttackRateMonsterValue,
    });
  },
});

export const maximumHealthMonster = selector({
  key: "maximumHealthMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return (
      levelValue +
      progressValue +
      getFromRange({ minimum: levelValue * 2, maximum: Math.ceil(levelValue * 2.5) })
    );
  },
});

export const monsterLoot = selector({
  key: "monsterLoot",
  get: ({ get }) => {
    const hasTreasureValue = get(hasTreasure);
    const levelValue = get(level);
    const progressValue = get(progress);
    const range = Math.ceil(levelValue + progressValue / 2);

    return {
      aether: getFromRange({
        minimum: levelValue >= 10 ? levelValue - range : 0,
        maximum: levelValue >= 10 ? levelValue + range - 2 : 0,
      }),
      coins: hasTreasureValue
        ? getFromRange({
            minimum: levelValue,
            maximum: levelValue + Math.ceil(range * 1.5),
          })
        : 0,
      experience: getFromRange({
        minimum: levelValue,
        maximum: levelValue + range,
      }),
      scrap: getFromRange({
        minimum: levelValue * 2,
        maximum: levelValue * 2 + Math.ceil(range * 2),
      }),
    };
  },
});

export const totalAttackRateMonster = selector({
  key: "totalAttackRateMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return (
      4510 - progressValue - 10 * getFromRange({ minimum: levelValue, maximum: levelValue * 2 })
    );
  },
});

export const totalDamageMonster = selector({
  key: "totalDamageMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);
    const base = Math.floor(levelValue + progressValue / 3);

    return { minimum: base, maximum: base + levelValue };
  },
});
