import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import LOCRA from "@neverquest/locra";
import { localStorageEffect } from "@neverquest/state/effects";
import { isNSFW } from "@neverquest/state/settings";
import { levelUp, merchantInventoryGeneration } from "@neverquest/state/transactions";
import { LocationType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const level = atom({
  default: 1,
  effects: [localStorageEffect<number>(StorageKey.Level)],
  key: StorageKey.Level,
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [localStorageEffect<LocationType>(StorageKey.Mode)],
  key: StorageKey.Mode,
});

export const progress = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.Progress)],
  key: StorageKey.Progress,
});

// SELECTORS

export const isLevelCompleted = selector({
  key: "isLevelCompleted",
  get: ({ get }) => get(progress) === get(progressMax),
});

export const isWilderness = selector({
  key: "isWilderness",
  get: ({ get }) => get(mode) === LocationType.Wilderness,
});

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => get(level) + 2,
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);
    const nsfwValue = get(isNSFW);

    if (isWildernessValue) {
      if (levelValue === 1) {
        return UNKNOWN;
      }

      return LOCRA.generateLocation({
        isNSFW: nsfwValue,
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(levelValue / 2),
      });
    }

    return "Caravan";
  },
  set: ({ get, set }) => {
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(merchantInventoryGeneration, null);
      set(mode, LocationType.Caravan);
    } else {
      set(levelUp, null);
      set(mode, LocationType.Wilderness);
    }
  },
});
