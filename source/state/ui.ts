import { atom, atomFamily, selector } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { questsBonus } from "@neverquest/state/quests";
import { QUEST_BONUS_TYPES, type Showing } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isShowingQuestBonus = withStateKey("isShowingQuestBonus", (key) =>
  selector({
    get: ({ get }) =>
      QUEST_BONUS_TYPES.reduce((sum, questBonus) => sum + get(questsBonus(questBonus)), 0) > 0,
    key,
  }),
);

// ATOMS

export const activeControl = withStateKey("activeControl", (key) =>
  atom<"capabilities" | "inventory" | "quests" | undefined>({
    default: undefined,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, Showing>({
    default: false,
    effects: (showing) => [handleLocalStorage({ key, parameter: showing })],
    key,
  }),
);
