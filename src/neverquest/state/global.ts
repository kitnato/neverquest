import { atom, selector } from "recoil";

import LOCRA from "locra";
import { LocationType } from "neverquest/env.d";
import { UNKNOWN } from "neverquest/utilities/constants";

// ATOMS

export const activeMonster = atom({
  key: "activeMonster",
  default: null,
});

export const autoEquip = atom({
  key: "autoEquip",
  default: true,
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
  default: LocationType.Wilderness,
});

export const nsfw = atom({
  key: "nsfw",
  default: true,
});

export const progress = atom({
  key: "progress",
  default: 0,
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

    return modeValue === LocationType.Wilderness;
  },
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);
    const nsfwValue = get(nsfw);

    if (isWildernessValue) {
      if (levelValue === 1) {
        return UNKNOWN;
      }

      return LOCRA.generateLocation({
        isNSFW: nsfwValue,
        // TODO - affix probabilities
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(levelValue / 2),
      });
    }

    return "Caravan";
  },
  set: ({ get, set }) => {
    const levelValue = get(level);
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(mode, LocationType.Caravan);
    } else {
      set(mode, LocationType.Wilderness);
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
