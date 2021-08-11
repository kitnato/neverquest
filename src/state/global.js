import { atom, selector } from "recoil";

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

// SELECTORS

export const levelCompleted = selector({
  key: "levelCompleted",
  get: ({ get }) => {
    const progressValue = get(progress);
    const progressMaxValue = get(progressMax);

    return progressValue === progressMaxValue;
  },
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const levelValue = get(level);
    const modeValue = get(mode);
    const generatedLocation = (() => {
      if (modeValue === 0) {
        if (levelValue === 1) {
          return "???";
        }
        // TODO - SLIM
        return "Wilderness";
      }
      return "Caravan";
    })();

    return generatedLocation;
  },
  set: ({ get, set }) => {
    const levelValue = get(level);
    const isWilderness = get(mode) === 0;

    if (isWilderness) {
      set(mode, 1);
    } else {
      set(mode, 0);
      set(level, levelValue + 1);
      set(progress, 0);
    }
  },
});

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + 2;
  },
});
