import { atomFamily, selector, selectorFamily } from "recoil";

import {
  QUESTS,
  QUEST_COMPLETION_BONUS,
  QUEST_TYPES,
  QUEST_TYPES_BY_CLASS,
} from "@neverquest/data/journal";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { QuestData } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestProgression,
  type QuestStatus,
} from "@neverquest/types/unions";

// SELECTORS

export const availableQuests = withStateKey("availableQuests", (key) =>
  selectorFamily<Partial<Record<QuestProgression, QuestData>>, Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questProgressValue = get(questProgress(parameter));
        let isAtLimit = false;

        return Object.values(QUESTS[parameter]).reduce(
          (accumulator, current) => {
            const { progressionMaximum } = current;
            const isWithinLimit = !isAtLimit && questProgressValue <= progressionMaximum;

            isAtLimit = true;

            return isWithinLimit
              ? { ...accumulator, [`${progressionMaximum}`]: current }
              : accumulator;
          },

          {},
        );
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

export const completedQuestCount = withStateKey("completedQuestCount", (key) =>
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

export const questBonus = withStateKey("completedQuestCount", (key) =>
  selectorFamily<number, QuestBonus>({
    get:
      (parameter) =>
      ({ get }) =>
        QUEST_TYPES.reduce(
          (accumulator, currentQuest) =>
            accumulator +
            Object.values(get(questStatus(currentQuest))).filter(
              (currentStatus) =>
                typeof currentStatus !== "boolean" && QUEST_BONUS_TYPES.includes(parameter),
            ).length,
          0,
        ) * QUEST_COMPLETION_BONUS,
    key,
  }),
);

// ATOMS

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
