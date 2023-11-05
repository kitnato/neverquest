import { atom, atomFamily, selectorFamily } from "recoil";

import {
  QUESTS,
  QUEST_COMPLETION_BONUS,
  QUEST_TYPES,
  QUEST_TYPES_BY_CLASS,
} from "@neverquest/data/quests";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/items";
import type { QuestData } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestStatus,
} from "@neverquest/types/unions";
import { getQuestsData } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const activeQuests = withStateKey("activeQuests", (key) =>
  selectorFamily<QuestData[], Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questProgressValue = get(questProgress(parameter));

        const quests = [];

        for (const quest of getQuestsData(parameter)) {
          quests.push(quest);

          if (quest.progressionMaximum > questProgressValue) {
            break;
          }
        }

        return quests;
      },
    key,
  }),
);

export const canCompleteQuests = withStateKey("canCompleteQuests", (key) =>
  selectorFamily<boolean, QuestClass>({
    get:
      (parameter) =>
      ({ get }) =>
        QUEST_TYPES_BY_CLASS[parameter].reduce(
          (accumulator, currentQuest) =>
            accumulator ||
            Object.values(get(questStatuses(currentQuest))).some(
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
            Object.values(get(questStatuses(currentQuest))).filter(
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
                Object.values(get(questStatuses(currentQuest))).filter(
                  (currentStatus) =>
                    typeof currentStatus !== "boolean" && parameter === currentStatus,
                ).length,
              0,
            ) * QUEST_COMPLETION_BONUS,
    key,
  }),
);

// ATOMS

export const questNotifications = withStateKey("questNotifications", (key) =>
  atom<QuestData[]>({
    default: [],
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

export const questStatuses = withStateKey("questStatuses", (key) =>
  atomFamily<QuestStatus[], Quest>({
    default: (parameter) => Object.keys(QUESTS[parameter].progression).map(() => false),
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
