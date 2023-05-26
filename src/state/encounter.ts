import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/data/internal";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { LocationType } from "@neverquest/types/enums";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isLevelCompleted = withStateKey("isLevelCompleted", (key) =>
  selector({
    get: ({ get }) => get(progress) === get(progressMaximum),
    key,
  })
);

export const isWilderness = withStateKey("isWilderness", (key) =>
  selector({
    get: ({ get }) => get(mode) === LocationType.Wilderness,
    key,
  })
);

export const locationName = withStateKey("locationName", (key) =>
  selector({
    get: ({ get }) => {
      if (get(isWilderness)) {
        if (get(maximumLevel) === 1) {
          return LABEL_UNKNOWN;
        }

        return get(wilderness);
      }

      return "Caravan";
    },
    key,
  })
);

export const maximumLevel = withStateKey("maximumLevel", (key) =>
  selector({
    get: ({ get }) => get(wildernesses).length,
    key,
  })
);

export const progressMaximum = withStateKey("progressMaximum", (key) =>
  selector({
    get: ({ get }) => 2 + Math.round(98 * getGrowthSigmoid(get(level))),
    key,
  })
);

export const wilderness = withStateKey("wilderness", (key) =>
  selector({
    get: ({ get }) => get(wildernesses)[get(level) - 1],
    key,
  })
);

// ATOMS

export const isLevelStarted = withStateKey("isLevelStarted", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const level = withStateKey("level", (key) =>
  atom({
    default: maximumLevel,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const mode = withStateKey("mode", (key) =>
  atom({
    default: LocationType.Wilderness,
    effects: [handleLocalStorage<LocationType>({ key })],
    key,
  })
);

export const progress = withStateKey("progress", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const wildernesses = withStateKey("wildernesses", (key) =>
  atom<string[]>({
    default: [],
    effects: [handleLocalStorage<string[]>({ key })],
    key,
  })
);
