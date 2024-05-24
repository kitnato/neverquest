import { useRecoilCallback } from "recoil"

import { QUESTS } from "@neverquest/data/quests"
import {
	canTrackQuests,
	questNotifications,
	questProgress,
	questStatuses,
} from "@neverquest/state/quests"
import { getQuestData, getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Quest } from "@neverquest/types/unions"

export function useProgressQuest() {
	return useRecoilCallback(
		({ set, snapshot }) =>
			({
				amount = 1,
				isAbsolute,
				quest,
			}: {
				amount?: number
				isAbsolute?: boolean
				quest: Quest
			}) => {
				const get = getSnapshotGetter(snapshot)

				const questProgressState = questProgress(quest)
				const questProgressValue = get(questProgressState)

				const { progression, requiresTracking } = QUESTS[quest]
				const lastProgression = progression.at(-1)

				if (
					(requiresTracking && !get(canTrackQuests))
					|| (lastProgression !== undefined && questProgressValue >= lastProgression)
				) {
					return
				}

				const newProgress = isAbsolute ? amount : questProgressValue + amount
				const newCompletedQuests = getQuestData(quest)
					.filter(({ progressionIndex, progressionMaximum }) =>
						get(questStatuses(quest))[progressionIndex] === "incomplete"
						&& newProgress >= progressionMaximum)

				set(questProgressState, newProgress)

				newCompletedQuests.forEach(({ progressionIndex, quest }) => {
					set(questStatuses(quest), statuses => statuses.map((status, index) => index === progressionIndex ? "complete" : status))
				})

				if (newCompletedQuests.length > 0) {
					set(questNotifications, currentQuestNotifications => [
						...newCompletedQuests,
						...currentQuestNotifications,
					])
				}
			},
		[],
	)
}
