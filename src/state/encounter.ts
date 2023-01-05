import { DefaultValue, atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { Wilderness } from "@neverquest/types";
import { LocationType, StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const isLevelCompleted = selector({
  get: ({ get }) => get(wilderness).progress === get(progressMaximum),
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

        if (amount === -1) {
          return {
            name,
            progress: get(progressMaximum),
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

export const progressMaximum = selector({
  get: ({ get }) => {
    const levelValue = get(level);

    return levelValue + 2 + Math.floor(levelValue / 5);
  },
  key: "progressMaximum",
});

export const wilderness = selector<Wilderness>({
  get: ({ get }) => get(wildernesses)[get(level) - 1],
  key: "wilderness",
});

// ATOMS

export const isLevelStarted = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsLevelStarted)],
  key: StorageKey.IsLevelStarted,
});

export const level = atom({
  default: maximumLevel,
  effects: [localStorage<number>(StorageKey.Level)],
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
