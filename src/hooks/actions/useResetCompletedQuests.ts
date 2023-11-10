import { useRecoilCallback } from "recoil";

import { QUEST_TYPES } from "@neverquest/data/quests";
import { questStatuses } from "@neverquest/state/quests";
import { QUEST_BONUS_TYPES } from "@neverquest/types/unions";

export function useResetCompletedQuests() {
  return useRecoilCallback(
    ({ set }) =>
      () =>
        QUEST_TYPES.forEach((currentQuest) =>
          set(questStatuses(currentQuest), (currentStatuses) =>
            currentStatuses.map((currentStatus) =>
              QUEST_BONUS_TYPES.some((currentBonus) => currentBonus === currentStatus)
                ? "achieved"
                : currentStatus,
            ),
          ),
        ),
    [],
  );
}
