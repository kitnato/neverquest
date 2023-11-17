import { atom, selector } from "recoil";

import { ownedItem } from "./inventory";
import { PROGRESS } from "@neverquest/data/encounter";
import { LEVEL_MAXIMUM } from "@neverquest/data/general";
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START } from "@neverquest/data/monster";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { getFromRange, getGrowthSigmoid } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const encounter = withStateKey("encounter", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      return stageValue === LEVEL_MAXIMUM
        ? get(ownedItem("familiar")) === undefined
          ? "res dominus"
          : "res cogitans"
        : stageValue >= BOSS_STAGE_START && stageValue % BOSS_STAGE_INTERVAL === 0
          ? "boss"
          : "monster";
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

export const locationName = withStateKey("locationName", (key) =>
  selector({
    get: ({ get }) => {
      if (get(location) === "wilderness") {
        return get(wildernesses)[get(stage) - 1];
      }

      return "Caravan";
    },
    key,
  }),
);

export const progressMaximum = withStateKey("progressMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { maximum, minimum } = PROGRESS;

      return get(encounter) === "monster"
        ? Math.ceil(
            getFromRange({ factor: getGrowthSigmoid(get(stage)), maximum, minimum }) *
              (1 - get(progressReduction)),
          )
        : 1;
    },
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

export const consciousness = withStateKey("consciousness", (key) =>
  atom<"asleep" | "awakened" | "dead">({
    default: "awakened",
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isStageStarted = withStateKey("isStageStarted", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const location = withStateKey("location", (key) =>
  atom<"caravan" | "wilderness">({
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

export const progressReduction = withStateKey("progressReduction", (key) =>
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
