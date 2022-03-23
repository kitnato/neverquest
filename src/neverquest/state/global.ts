import { atom, selector } from "recoil";

import { LocationType } from "neverquest/env.d";
import SLIM from "locra";
import { SLIMCategory } from "locra/env";

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

export const progress = atom({
  key: "progress",
  default: 0,
});

export const show = atom({
  key: "show",
  default: {
    aether: false,
    armor: false,
    attributes: false,
    attributesButton: false,
    coins: false,
    critical: false,
    defence: false,
    dodgeChance: false,
    inventory: false,
    inventoryButton: false,
    levelProgress: false,
    loot: false,
    recovery: false,
    scrap: false,
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

    return modeValue === LocationType.Wilderness;
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
      return SLIM.generate(SLIMCategory.Location);
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
