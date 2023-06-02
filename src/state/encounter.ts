import { atom, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { Location } from "@neverquest/types/enums";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isStageCompleted = withStateKey("isStageCompleted", (key) =>
  selector({
    get: ({ get }) => get(progress) === get(progressMaximum),
    key,
  })
);

export const isWilderness = withStateKey("isWilderness", (key) =>
  selector({
    get: ({ get }) => get(mode) === Location.Wilderness,
    key,
  })
);

export const location = withStateKey("location", (key) =>
  selector({
    get: ({ get }) => {
      if (get(isWilderness)) {
        if (get(stageMaximum) === 1) {
          return LABEL_UNKNOWN;
        }

        return get(wilderness);
      }

      return "Caravan";
    },
    key,
  })
);

export const progressMaximum = withStateKey("progressMaximum", (key) =>
  selector({
    get: ({ get }) => 2 + Math.round(98 * getGrowthSigmoid(get(stage))),
    key,
  })
);

export const stageMaximum = withStateKey("stageMaximum", (key) =>
  selector({
    get: ({ get }) => get(wildernesses).length,
    key,
  })
);

export const wilderness = withStateKey("wilderness", (key) =>
  selector({
    get: ({ get }) => get(wildernesses)[get(stage) - 1],
    key,
  })
);

// ATOMS

export const isStageStarted = withStateKey("isStageStarted", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  })
);

export const stage = withStateKey("stage", (key) =>
  atom({
    default: stageMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const mode = withStateKey("mode", (key) =>
  atom({
    default: Location.Wilderness,
    effects: [handleLocalStorage<Location>({ key })],
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
