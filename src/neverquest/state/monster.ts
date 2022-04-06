import { atom, selector } from "recoil";

import { level, progress } from "neverquest/state/global";
import { getDamagePerSecond } from "neverquest/utilities/helpers";

// ATOMS

export const currentHealthMonster = atom({
  key: "currentHealthMonster",
  default: -1,
});

export const deltaHealthMonster = atom({
  key: "deltaHealthMonster",
  default: 0,
});

export const isMonsterEngaged = atom({
  key: "isMonsterEngaged",
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
      damage: totalDamageMonsterValue,
      rate: totalAttackRateMonsterValue,
    });
  },
});

export const maximumHealthMonster = selector({
  key: "maximumHealthMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return Math.ceil(levelValue * 2) + Math.floor(progressValue / 2) + 1;
  },
});

export const monsterLoot = selector({
  key: "monsterLoot",
  get: ({ get }) => {
    const hasTreasureValue = get(hasTreasure);
    const levelValue = get(level);
    const progressValue = get(progress);

    return {
      aether: levelValue >= 10 ? Math.ceil(levelValue + progressValue / 3) : 0,
      coins: hasTreasureValue ? progressValue + Math.ceil(levelValue * 1.5) : 0,
      experience: Math.floor(progressValue + levelValue * 1.5),
      scrap: Math.floor(progressValue + levelValue * 1.5),
    };
  },
});

export const totalAttackRateMonster = selector({
  key: "totalAttackRateMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return 4510 - progressValue - 10 * levelValue * 2;
  },
});

export const totalDamageMonster = selector({
  key: "totalDamageMonster",
  get: ({ get }) => {
    const levelValue = get(level);
    const progressValue = get(progress);

    return levelValue + Math.floor(progressValue / 3);
  },
});
