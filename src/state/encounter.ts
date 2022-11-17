import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { LocationType, StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const maximumLevel = selector({
  get: ({ get }) => get(locations).length,
  key: "maximumLevel",
});

export const isLevelCompleted = selector({
  get: ({ get }) => get(progress) === get(progressMax),
  key: "isLevelCompleted",
});

export const isWilderness = selector({
  get: ({ get }) => get(mode) === LocationType.Wilderness,
  key: "isWilderness",
});

export const progressMax = selector({
  get: ({ get }) => get(level) + 2,
  key: "progressMax",
});

export const location = selector({
  get: ({ get }) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);
    const locationsValue = get(locations);
    const maximumLevelValue = get(maximumLevel);

    if (isWildernessValue) {
      if (levelValue === 1 && maximumLevelValue === 1) {
        return UNKNOWN;
      }

      return locationsValue[levelValue - 1];
    }

    return "Caravan";
  },
  key: "location",
});

// ATOMS

export const level = atom({
  default: maximumLevel,
  effects: [localStorage<LocationType>(StorageKey.Level)],
  key: StorageKey.Level,
});

export const locations = atom<string[]>({
  default: [],
  effects: [localStorage<string[]>(StorageKey.Locations)],
  key: StorageKey.Locations,
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [localStorage<LocationType>(StorageKey.Mode)],
  key: StorageKey.Mode,
});

export const progress = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.Progress)],
  key: StorageKey.Progress,
});
