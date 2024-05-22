import { useRecoilCallback } from "recoil"

import { QUESTS } from "@neverquest/data/quests"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { questRewards, questStatuses } from "@neverquest/state/quests"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Quest, QuestBonus } from "@neverquest/types/unions"

export function useCompleteQuest() {
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) => ({
			bonus,
			progression,
			quest,
		}: {
			bonus: QuestBonus
			progression: number
			quest: Quest
		}) => {
			const get = getSnapshotGetter(snapshot)

			const progressionIndex = QUESTS[quest].progression.indexOf(progression)

			if (get(questStatuses(quest))[progressionIndex] === "complete") {
				set(questRewards(quest), rewards => rewards.map((reward, index) => index === progressionIndex ? bonus : reward))

				progressQuest({ quest: "completing" })
			}
		},
		[progressQuest],
	)
}
