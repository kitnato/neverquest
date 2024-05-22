import { nanoid } from "nanoid"
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
				forceSet,
				quest,
			}: {
				amount?: number
				forceSet?: boolean
				quest: Quest
			}) => {
				const get = getSnapshotGetter(snapshot)

				if (!forceSet && QUESTS[quest].requiresTracking && !get(canTrackQuests)) {
					return
				}

				const currentQuestProgressState = questProgress(quest)
				const newProgress = forceSet ? amount : get(currentQuestProgressState) + amount
				const currentQuestStatuses = get(questStatuses(quest))

				set(currentQuestProgressState, newProgress)

				set(questNotifications, currentQuestNotifications => [
					...getQuestData(quest)
						.filter(({ progressionIndex, progressionMaximum }) => currentQuestStatuses[progressionIndex] === "incomplete" && newProgress >= progressionMaximum)
						.map(questData => ({ ...questData, ID: nanoid() })),
					...currentQuestNotifications,
				])
			},
		[],
	)
}
