import { DefaultValue, atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { Wilderness } from "@neverquest/types";
import { LocationType, StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const isLevelCompleted = selector({
  get: ({ get }) => get(wilderness).progress === get(progressMax),
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
        return UNKNOWN;
      }

      return get(wilderness).name;
    }

    return "Caravan";
  },
  key: "location",
});

export const maximumLevel = selector({
  get: ({ get }) => get(wildernesses).length,
  key: "maximumLevel",
});

export const progress = selector({
  get: ({ get }) => get(wilderness).progress,
  key: "progress",
  set: ({ get, set }, amount) => {
    const target = get(level) - 1;
    const newWildernesses = [...get(wildernesses)].map((wilderness, index) => {
      if (index === target) {
        const { name } = wilderness;

        if (amount instanceof DefaultValue) {
          return {
            name,
            progress: 0,
          };
        }

        return {
          name,
          progress: amount,
        };
      }

      return wilderness;
    });

    set(wildernesses, newWildernesses);
  },
});

export const progressMax = selector({
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + 2 + Math.floor(levelValue / 3);
  },
  key: "progressMax",
});

export const wilderness = selector<Wilderness>({
  get: ({ get }) => get(wildernesses)[get(level) - 1],
  key: "wilderness",
});

// ATOMS

export const level = atom({
  default: maximumLevel,
  effects: [localStorage<LocationType>(StorageKey.Level)],
  key: StorageKey.Level,
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [localStorage<LocationType>(StorageKey.Mode)],
  key: StorageKey.Mode,
});

export const wildernesses = atom<Wilderness[]>({
  default: [{ name: "", progress: 0 }],
  effects: [localStorage<Wilderness[]>(StorageKey.Wildernesses)],
  key: StorageKey.Wildernesses,
});
