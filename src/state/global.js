import { atom, selector } from "recoil";

import SLIM from "slim";

// ATOMS

export const activeMonster = atom({
  key: "activeMonster",
  default: null,
});

export const gameOver = atom({
  key: "gameOver",
  default: false,
});

export const level = atom({
  key: "level",
  default: 1,
});

export const mode = atom({
  key: "mode",
  default: 0,
});

export const progress = atom({
  key: "progress",
  default: 0,
});

export const show = atom({
  key: "show",
  default: {
    armor: false,
    attributes: false,
    critical: false,
    defense: false,
    dodgeChance: false,
    inventory: false,
    inventoryButton: false,
    levelProgress: false,
    loot: false,
    recovery: false,
    shield: false,
    weapon: false,
  },
});

// SELECTORS

export const isLevelCompleted = selector({
  key: "isLevelCompleted",
  get: ({ get }) => {
    const progressValue = get(progress);
    const progressMaxValue = get(progressMax);

    return progressValue === progressMaxValue;
  },
});

export const isWilderness = selector({
  key: "isWilderness",
  get: ({ get }) => {
    const modeValue = get(mode);

    return modeValue === 0;
  },
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);

    if (isWildernessValue) {
      if (levelValue === 1) {
        return "???";
      }
      return SLIM.generate("location");
    }

    return "Caravan";
  },
  set: ({ get, set }) => {
    const levelValue = get(level);
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(mode, 1);
    } else {
      set(mode, 0);
      set(level, levelValue);
      set(progress, 0);
    }
  },
});

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => {
    const levelValue = get(level);

    // 3 Monsters until level 3, then 4 until 6 etc.
    return Math.floor(levelValue / 3) + 3;
  },
});
