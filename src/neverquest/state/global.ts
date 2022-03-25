import { atom, selector } from "recoil";

import LOCRA from "locra";
import { LocationType } from "neverquest/env.d";

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

// TODO - toggle
export const nsfw = atom({
  key: "nsfw",
  default: true,
});

export const progress = atom({
  key: "progress",
  default: 0,
});

export const show = atom({
  key: "show",
  default: {
    aether: false,
    accessory: false,
    armor: false,
    attributes: false,
    attributesButton: false,
    coins: false,
    critical: false,
    defence: false,
    dodgeChance: false,
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
    const nsfwValue = get(nsfw);

    if (isWildernessValue) {
      if (levelValue === 1) {
        return "???";
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
