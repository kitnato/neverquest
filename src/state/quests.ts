import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ownedItem } from "./items";
import {
  QUESTS,
  QUEST_COMPLETION_BONUS,
  QUEST_TYPES,
  QUEST_TYPES_BY_CLASS,
} from "@neverquest/data/quests";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { QuestData } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestProgression,
  type QuestStatus,
} from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const availableQuests = withStateKey("availableQuests", (key) =>
  selectorFamily<Partial<Record<QuestProgression, QuestData>>, Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questProgressValue = get(questProgress(parameter));

        const quests: Partial<Record<QuestProgression, QuestData>> = {};

        // TODO - achievable with .reduce()?
        for (const [key, current] of Object.entries(QUESTS[parameter])) {
          quests[key as QuestProgression] = current;

          if (current.progressionMaximum > questProgressValue) {
            break;
          }
        }

        return quests;
      },
    key,
  }),
);

export const canCompleteQuests = withStateKey("canCompleteQuests", (key) =>
  selector({
    get: ({ get }) =>
      QUEST_TYPES.reduce(
        (accumulator, currentQuest) =>
          accumulator ||
          Object.values(get(questStatus(currentQuest))).some(
            (currentStatus) => currentStatus === true,
          ),
        false,
      ),
    key,
  }),
);

export const completedQuestsCount = withStateKey("completedQuestsCount", (key) =>
  selectorFamily<number, QuestClass>({
    get:
      (parameter) =>
      ({ get }) =>
        QUEST_TYPES_BY_CLASS[parameter].reduce(
          (accumulator, currentQuest) =>
            accumulator +
            Object.values(get(questStatus(currentQuest))).filter(
              (currentStatus) =>
                typeof currentStatus !== "boolean" && QUEST_BONUS_TYPES.includes(currentStatus),
            ).length,
          0,
        ),
    key,
  }),
);

export const questsBonus = withStateKey("questsBonus", (key) =>
  selectorFamily<number, QuestBonus>({
    get:
      (parameter) =>
      ({ get }) =>
        get(ownedItem("journal")) === null
          ? 0
          : QUEST_TYPES.reduce(
              (accumulator, currentQuest) =>
                accumulator +
                Object.values(get(questStatus(currentQuest))).filter(
                  (currentStatus) =>
                    typeof currentStatus !== "boolean" && parameter === currentStatus,
                ).length,
              0,
            ) * QUEST_COMPLETION_BONUS,
    key,
  }),
);

// ATOMS

export const questNotification = withStateKey("questNotification", (key) =>
  atom<{ progression: QuestProgression; quest: Quest } | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const questProgress = withStateKey("questProgress", (key) =>
  atomFamily<number, Quest>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const questStatus = withStateKey("questStatus", (key) =>
  atomFamily<Partial<Record<QuestProgression, QuestStatus>>, Quest>({
    default: (parameter) =>
      Object.keys(QUESTS[parameter]).reduce(
        (accumulator, current) => ({ ...accumulator, [current]: false }),
        {},
      ),
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
