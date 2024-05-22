import { useRecoilCallback } from "recoil"

import { QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests"
import { questProgress, questRewards } from "@neverquest/state/quests"

export function useResetCompletedQuests() {
	return useRecoilCallback(
		({ reset }) =>
			() => {
				for (const quest of Object.values(QUEST_TYPES_BY_CLASS).flat()) {
					reset(questRewards(quest))
				}

				reset(questProgress("completing"))
			},
		[],
	)
}
