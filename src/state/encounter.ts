import { atom, selector } from "recoil";

import { PROGRESS } from "@neverquest/data/location";
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START } from "@neverquest/data/monster";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Location } from "@neverquest/types/unions";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

// SELECTORS

export const isBoss = withStateKey("isBoss", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      return stageValue >= BOSS_STAGE_START && stageValue % BOSS_STAGE_INTERVAL === 0;
    },
    key,
  }),
);

export const isStageCompleted = withStateKey("isStageCompleted", (key) =>
  selector({
    get: ({ get }) => get(progress) === get(progressMaximum),
    key,
  }),
);

export const isWilderness = withStateKey("isWilderness", (key) =>
  selector({
    get: ({ get }) => get(location) === "wilderness",
    key,
  }),
);

export const locationName = withStateKey("locationName", (key) =>
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
  }),
);

export const progressMaximum = withStateKey("progressMaximum", (key) =>
  selector({
    get: ({ get }) =>
      get(isBoss)
        ? 1
        : Math.round(
            PROGRESS.minimum + (PROGRESS.maximum - PROGRESS.minimum) * getGrowthSigmoid(get(stage)),
          ),
    key,
  }),
);

export const stageMaximum = withStateKey("stageMaximum", (key) =>
  selector({
    get: ({ get }) => get(wildernesses).length,
    key,
  }),
);

// ATOMS

export const isStageStarted = withStateKey("isStageStarted", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const location = withStateKey("location", (key) =>
  atom<Location>({
    default: "wilderness",
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const progress = withStateKey("progress", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const stage = withStateKey("stage", (key) =>
  atom({
    default: stageMaximum,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const wildernesses = withStateKey("wildernesses", (key) =>
  atom<string[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
