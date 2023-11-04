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
import type { ActiveQuest } from "@neverquest/types";
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
  selectorFamily<ActiveQuest[], Quest>({
    get:
      (parameter) =>
      ({ get }) => {
        const questStatusValue = get(questStatus(parameter));
        const questProgressValue = get(questProgress(parameter));

        const quests: ActiveQuest[] = [];
        const { description, hidden, progression, title } = QUESTS[parameter];

        for (const progressStep of progression) {
          const index = progression.indexOf(progressStep);
          const status = questStatusValue[index] ?? false;

          quests.push({
            description: (hidden !== undefined && status !== false
              ? description.replace(LABEL_UNKNOWN, hidden)
              : description
            ).replace("@", `${progressStep}`),
            progressionMaximum: progressStep,
            questClass: isConquest(parameter)
              ? "conquest"
              : isRoutine(parameter)
              ? "routine"
              : "triumph",
            status,
            title: `${title}${
              progression.length > 1 ? [" I", " II", " III", " IV", " V", " VI"][index] : ""
            }`,
          });

          if (progressStep > questProgressValue) {
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
  atom<ActiveQuest | null>({
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
  atomFamily<QuestStatus[], Quest>({
    default: (parameter) => Object.keys(QUESTS[parameter].progression).map(() => false),
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
