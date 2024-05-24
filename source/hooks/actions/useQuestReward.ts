import { useRecoilCallback } from "recoil"

import { QUESTS } from "@neverquest/data/quests"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { questStatuses } from "@neverquest/state/quests"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Quest, QuestBonus } from "@neverquest/types/unions"

export function useQuestReward() {
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

			const questStatusesState = questStatuses(quest)
			const progressionIndex = QUESTS[quest].progression.indexOf(progression)

			if (get(questStatusesState)[progressionIndex] === "complete") {
				set(questStatusesState, statuses => statuses.map((status, index) => index === progressionIndex ? bonus : status))

				progressQuest({ quest: "completing" })
			}
		},
		[progressQuest],
	)
}
