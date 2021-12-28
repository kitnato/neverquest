import { atom, selector } from "recoil";

import { experience } from "state/character";
import { level, progress } from "state/global";
import { aetherLoot, coinsLoot, scrapLoot } from "state/loot";
import { getFromRange } from "utilities/helpers";

// SELECTORS

export const maxHealthMonster = selector({
  key: "maxHealthMonster",
  get: ({ get }) => {
    const levelValue = get(level) + 1;

    return (
      levelValue + 2 * getFromRange({ min: levelValue, max: levelValue * 2 })
    );
  },
});

export const monsterDeath = selector({
  key: "monsterDeath",
  get: ({ get }) => {
    const currentHealthMonsterValue = get(currentHealthMonster);

    return currentHealthMonsterValue === 0;
  },
  set: ({ get, reset, set }) => {
    const { aether, coins, experience: xp, scrap } = get(monsterLoot);

    set(aetherLoot, (currentAetherLoot) => currentAetherLoot + aether);
    set(coinsLoot, (currentCoinsLoot) => currentCoinsLoot + coins);
    set(scrapLoot, (currentScrapLoot) => currentScrapLoot + scrap);

    set(experience, (currentExperience) => currentExperience + xp);
    set(progress, (currentProgress) => currentProgress + 1);

    reset(currentHealthMonster);
    reset(isEngaged);
  },
});

export const monsterLoot = selector({
  key: "monsterLoot",
  get: ({ get }) => {
    const levelValue = get(level) + 1;
    const range = Math.ceil(levelValue / 2);

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

    return 4510 - 10 * getFromRange({ min: levelValue, max: levelValue * 2 });
  },
});

export const totalDamageMonster = selector({
  key: "totalDamageMonster",
  get: ({ get }) => {
    const levelValue = get(level) + 1;

    return { min: levelValue, max: levelValue + 1 };
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
