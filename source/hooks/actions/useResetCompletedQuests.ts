import { useRecoilCallback } from "recoil";

import { QUEST_TYPES } from "@neverquest/data/quests";
import { questStatuses } from "@neverquest/state/quests";
import { isQuestBonus } from "@neverquest/types/type-guards";

export function useResetCompletedQuests() {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const quest of QUEST_TYPES) {
          set(questStatuses(quest), (statuses) =>
            statuses.map((status) => (isQuestBonus(status) ? "achieved" : status)),
          );
        }
      },
    [],
  );
}
