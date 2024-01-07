import { atom, selector } from "recoil";

import { PROGRESS } from "@neverquest/data/encounter";
import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START } from "@neverquest/data/monster";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/inventory";
import type { Finality } from "@neverquest/types/unions";
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const encounter = withStateKey("encounter", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      if (stageValue === LEVELLING_MAXIMUM) {
        if (get(defeatedFinality) !== undefined) {
          return "void";
        }

        return get(ownedItem("familiar")) === undefined ? "res dominus" : "res cogitans";
      }

      return stageValue >= BOSS_STAGE_START && stageValue % BOSS_STAGE_INTERVAL === 0
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

      if (get(encounter) === "monster") {
        if (get(stage) < get(stageMaximum)) {
          return Number.POSITIVE_INFINITY;
        }

        const reducedMaximum =
          getFromRange({ factor: getSigmoid(get(stage)), maximum, minimum }) *
          (1 - get(progressReduction));

        return reducedMaximum < 1 ? 1 : Math.round(reducedMaximum);
      }

      return 1;
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
  atom<"mors" | "somnium" | "vigilans">({
    default: "somnium",
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const corpse = withStateKey("corpse", (key) =>
  atom<{ essence: number; stage: number } | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const defeatedFinality = withStateKey("defeatedFinality", (key) =>
  atom<Finality | undefined>({
    default: undefined,
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
