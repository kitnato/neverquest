import { atom, atomFamily, selector } from "recoil";

import { PROGRESS } from "@neverquest/data/encounter";
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START, FINALITY_STAGE } from "@neverquest/data/monster";
import { handleStorage } from "@neverquest/state/effects/handleStorage";
import { ownedItem } from "@neverquest/state/inventory";
import type { Finality, Perk } from "@neverquest/types/unions";
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const encounter = withStateKey("encounter", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      if (stageValue === FINALITY_STAGE["res cogitans"]) {
        if (get(hasDefeatedFinality("res cogitans")) || get(ownedItem("familiar")) === undefined) {
          return "void";
        }

        return "res cogitans";
      }

      if (stageValue === FINALITY_STAGE["res dominus"]) {
        if (get(hasDefeatedFinality("res dominus"))) {
          return "void";
        }

        return "res dominus";
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
    get: ({ get }) => get(progress) >= get(progressMaximum),
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
          (1 - get(perkEffect("monsterReduction")));

        return Math.max(1, Math.round(reducedMaximum));
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
    effects: [handleStorage({ key })],
    key,
  }),
);

export const corpse = withStateKey("corpse", (key) =>
  atom<{ essence: number; stage: number } | undefined>({
    default: undefined,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const hasDefeatedFinality = withStateKey("hasDefeatedFinality", (key) =>
  atomFamily<boolean, Finality>({
    default: false,
    effects: (finality) => [handleStorage({ key, parameter: finality })],
    key,
  }),
);

export const isStageStarted = withStateKey("isStageStarted", (key) =>
  atom({
    default: false,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const location = withStateKey("location", (key) =>
  atom<"caravan" | "wilderness">({
    default: "wilderness",
    effects: [handleStorage({ key })],
    key,
  }),
);

export const progress = withStateKey("progress", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const perkEffect = withStateKey("perkEffect", (key) =>
  atomFamily<number, Perk>({
    default: 0,
    effects: (perk) => [handleStorage({ key, parameter: perk })],
    key,
  }),
);

export const stage = withStateKey("stage", (key) =>
  atom({
    default: stageMaximum,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const wildernesses = withStateKey("wildernesses", (key) =>
  atom<string[]>({
    default: [],
    effects: [handleStorage({ key })],
    key,
  }),
);
