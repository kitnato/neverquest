import { useRecoilCallback } from "recoil"

import { QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests"
import { questProgress, questStatuses } from "@neverquest/state/quests"
import { isQuestBonus } from "@neverquest/types/type-guards"

export function useResetCompletedQuests() {
  return useRecoilCallback(
    ({ reset, set }) =>
      () => {
        for (const quest of Object.values(QUEST_TYPES_BY_CLASS).flat()) {
          set(questStatuses(quest), (statuses) =>
            statuses.map((status) => (isQuestBonus(status) ? `achieved` : status)),
          )
        }

        reset(questProgress(`completing`))
        reset(questStatuses(`completing`))
      },
    [],
  )
}
