import { atom, atomFamily, selectorFamily } from "recoil";

import { ownedItem } from "./items";
import { LABEL_UNKNOWN } from "@neverquest/data/general";
import {
  QUESTS,
  QUEST_COMPLETION_BONUS,
  QUEST_TYPES,
  QUEST_TYPES_BY_CLASS,
} from "@neverquest/data/quests";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { QuestData } from "@neverquest/types";
import { isConquest, isRoutine } from "@neverquest/types/type-guards";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestStatus,
} from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const activeQuests = withStateKey("activeQuests", (key) =>
  selectorFamily<QuestData[], Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questsValue = get(quests(parameter));
        const questProgressValue = get(questProgress(parameter));

        const activeQuests: QuestData[] = [];

        for (const quest of questsValue) {
          activeQuests.push(quest);

          if (quest.progressionMaximum > questProgressValue) {
            break;
          }
        }

        return activeQuests;
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

export const quests = withStateKey("quests", (key) =>
  selectorFamily<QuestData[], Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questStatusesValue = get(questStatuses(parameter));

        const { description, hidden, progression, title } = QUESTS[parameter];

        return progression.map((current) => {
          const index = progression.indexOf(current);
          const status = questStatusesValue[index] ?? false;

          return {
            description: (hidden !== undefined && status !== false
              ? description.replace(LABEL_UNKNOWN, hidden)
              : description
            ).replace("@", `${current}`),
            progressionMaximum: current,
            questClass: isConquest(parameter)
              ? "conquest"
              : isRoutine(parameter)
              ? "routine"
              : "triumph",
            status,
            title: `${title}${
              progression.length > 1 ? [" I", " II", " III", " IV", " V", " VI"][index] : ""
            }`,
          };
        });
      },
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
