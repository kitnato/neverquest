import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { LocationType } from "@neverquest/types/enums";
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
  effects: [handleLocalStorage<boolean>({ key: "isLevelStarted" })],
  key: "isLevelStarted",
});

export const level = atom({
  default: maximumLevel,
  effects: [handleLocalStorage<number>({ key: "level" })],
  key: "level",
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [handleLocalStorage<LocationType>({ key: "mode" })],
  key: "mode",
});

export const progress = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "progress" })],
  key: "progress",
});

export const wildernesses = atom<string[]>({
  default: [],
  effects: [handleLocalStorage<string[]>({ key: "wildernesses" })],
  key: "wildernesses",
});
