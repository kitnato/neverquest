import { useRecoilCallback } from "recoil";

import { QUEST_TYPES } from "@neverquest/data/quests";
import { questStatuses } from "@neverquest/state/quests";
import { QUEST_BONUS_TYPES, type QuestBonus } from "@neverquest/types/unions";

export function useResetCompletedQuests() {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const quest of QUEST_TYPES) {
          set(questStatuses(quest), (currentStatuses) =>
            currentStatuses.map((currentStatus) =>
              QUEST_BONUS_TYPES.includes(currentStatus as QuestBonus) ? "achieved" : currentStatus,
            ),
          );
        }
      },
    [],
  );
}
