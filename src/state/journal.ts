import { atomFamily, selector, selectorFamily } from "recoil";

import { QUEST_COMPLETION_BONUS } from "@neverquest/data/journal";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import {
  CONQUEST_TYPES,
  type Conquest,
  type Quest,
  type QuestBonus,
  ROUTINE_TYPES,
  type Routine,
  TRIUMPH_TYPES,
} from "@neverquest/types/unions";

const ALL_QUESTS = [...CONQUEST_TYPES, ...ROUTINE_TYPES, ...TRIUMPH_TYPES];

// SELECTORS

export const canCompleteQuests = withStateKey("canCompleteQuests", (key) =>
  selector({
    get: ({ get }) => ALL_QUESTS.some((current) => get(canCompleteQuest(current))),
    key,
  }),
);

// TODO
export const canCompleteQuest = withStateKey("canCompleteQuest", (key) =>
  selectorFamily<boolean, Quest>({
    get: () => () => true,
    key,
  }),
);

export const conquestsCompleted = withStateKey("conquestsCompleted", (key) =>
  selector({
    get: ({ get }) =>
      CONQUEST_TYPES.filter((current) => get(questCompletion(current)) !== false).length,
    key,
  }),
);

export const questsBonus = withStateKey("questsBonus", (key) =>
  selector<Record<QuestBonus, number>>({
    get: ({ get }) => {
      const bonus = {
        damageBonus: 0,
        healthBonus: 0,
        staminaBonus: 0,
      };

      ALL_QUESTS.forEach((current) => {
        const questCompletionValue = get(questCompletion(current));

        if (questCompletionValue === false) {
          return;
        }

        bonus[questCompletionValue] += QUEST_COMPLETION_BONUS;
      });

      return bonus;
    },
    key,
  }),
);

export const routinesCompleted = withStateKey("routinesCompleted", (key) =>
  selector({
    get: ({ get }) =>
      ROUTINE_TYPES.filter((current) => get(questCompletion(current)) !== false).length,
    key,
  }),
);

export const triumphsCompleted = withStateKey("triumphsCompleted", (key) =>
  selector({
    get: ({ get }) =>
      TRIUMPH_TYPES.filter((current) => get(questCompletion(current)) !== false).length,
    key,
  }),
);

// ATOMS

// TODO
export const conquestProgress = withStateKey("conquestProgress", (key) =>
  atomFamily<number, Conquest>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const questCompletion = withStateKey("questCompletion", (key) =>
  atomFamily<QuestBonus | false, Quest>({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

// TODO
export const routineProgress = withStateKey("routineProgress", (key) =>
  atomFamily<number, Routine>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);