import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { LocationType, StorageKey } from "@neverquest/types/enums";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isLevelCompleted = selector({
  get: ({ get }) => get(progress) === get(progressMaximum),
  key: "isLevelCompleted",
});

export const isWilderness = selector({
  get: ({ get }) => get(mode) === LocationType.Wilderness,
  key: "isWilderness",
});

export const locationName = selector({
  get: ({ get }) => {
    if (get(isWilderness)) {
      if (get(maximumLevel) === 1) {
        return LABEL_UNKNOWN;
      }

      return get(wilderness);
    }

    return "Caravan";
  },
  key: "location",
});

export const maximumLevel = selector({
  get: ({ get }) => get(wildernesses).length,
  key: "maximumLevel",
});

export const progressMaximum = selector({
  get: ({ get }) => 2 + Math.round(98 * getGrowthSigmoid(get(level))),
  key: "progressMaximum",
});

export const wilderness = selector({
  get: ({ get }) => get(wildernesses)[get(level) - 1],
  key: "wilderness",
});

// ATOMS

export const isLevelStarted = atom({
  default: false,
  effects: [handleLocalStorage<boolean>(StorageKey.IsLevelStarted)],
  key: StorageKey.IsLevelStarted,
});

export const level = atom({
  default: maximumLevel,
  effects: [handleLocalStorage<number>(StorageKey.Level)],
  key: StorageKey.Level,
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [handleLocalStorage<LocationType>(StorageKey.Mode)],
  key: StorageKey.Mode,
});

export const progress = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.Progress)],
  key: StorageKey.Progress,
});

export const wildernesses = atom<string[]>({
  default: [],
  effects: [handleLocalStorage<string[]>(StorageKey.Wildernesses)],
  key: StorageKey.Wildernesses,
});
