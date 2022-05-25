import { atom } from "jotai";

import LOCRA from "locra";
import { LocationType } from "neverquest/types/core";
import { UNKNOWN } from "neverquest/utilities/constants";

// PRIMITIVES

export const autoEquip = atom(true);

export const gameOver = atom(false);

export const level = atom(1);

export const mode = atom<LocationType>(LocationType.Wilderness);

export const nsfw = atom(true);

export const progress = atom(0);

// READERS

export const isLevelCompleted = atom((get) => {
  const progressValue = get(progress);
  const progressMaxValue = get(progressMax);

  return progressValue === progressMaxValue;
});

export const isWilderness = atom((get) => {
  const modeValue = get(mode);

  return modeValue === LocationType.Wilderness;
});

export const progressMax = atom((get) => {
  const levelValue = get(level);

  return levelValue + 2;
});

// DERIVED

export const location = atom(
  (get) => {
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
  (get, set) => {
    const levelValue = get(level);
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(mode, LocationType.Caravan);
    } else {
      set(mode, LocationType.Wilderness);
      set(level, levelValue + 1);
      set(progress, 0);
    }
  }
);
