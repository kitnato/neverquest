import { atom, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Location } from "@neverquest/types/unions";
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
    get: ({ get }) => get(mode) === "wilderness",
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

        return get(wildernesses)[get(stage) - 1];
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
  atom<Location>({
    default: "wilderness",
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
