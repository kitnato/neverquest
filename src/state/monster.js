import { atom, selector } from "recoil";

import { level, progress } from "state/global";
import { getFromRange } from "utilities/helpers";

// SELECTORS

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
    const levelValue = get(level) + 1;
    const progressValue = get(progress);
    const range = Math.ceil(levelValue + progressValue / 2);

    return {
      aether: getFromRange({
        min: levelValue >= 10 ? levelValue - range : 0,
        max: levelValue >= 10 ? levelValue + range - 2 : 0,
      }),
      coins: getFromRange({
        min: levelValue,
        max: levelValue + Math.ceil(range * 1.5),
      }),
      experience: getFromRange({
        min: levelValue * 2,
        max: levelValue * 2 + Math.ceil(range * 2),
      }),
      scrap: getFromRange({
        min: levelValue,
        max: levelValue + Math.ceil(range * 1.5),
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

export const isEngaged = atom({
  key: "isEngaged",
  default: false,
});
