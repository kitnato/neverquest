import { useRecoilCallback } from "recoil";

import { QUEST_TYPES } from "@neverquest/data/quests";
import { questStatuses } from "@neverquest/state/quests";
import { QUEST_BONUS_TYPES } from "@neverquest/types/unions";

export function useResetCompletedQuests() {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        const questBonusTypes = new Set<string>(QUEST_BONUS_TYPES);

        for (const quest of QUEST_TYPES) {
          set(questStatuses(quest), (currentStatuses) =>
            currentStatuses.map((currentStatus) =>
              questBonusTypes.has(currentStatus) ? "achieved" : currentStatus,
            ),
          );
        }
      },
    [],
  );
}
