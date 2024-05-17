import { nanoid } from "nanoid"
import { useRecoilCallback } from "recoil"

import { QUESTS } from "@neverquest/data/quests"
import {
	canTrackQuests,
	questNotifications,
	questProgress,
	questStatuses,
} from "@neverquest/state/quests"
import { getQuestsData, getSnapshotGetter } from "@neverquest/utilities/getters"

import type { QuestNotification } from "@neverquest/types"
import type { Quest } from "@neverquest/types/unions"

export function useProgressQuest() {
	return useRecoilCallback(
		({ set, snapshot }) =>
			({ amount = 1, quest }: { amount?: number, quest: Quest }) => {
				const get = getSnapshotGetter(snapshot)

				if (QUESTS[quest].requiresTracking && !get(canTrackQuests)) {
					return
				}

				const achievedQuests: QuestNotification[] = []
				const questProgressState = questProgress(quest)
				const quests = getQuestsData(quest)
				const newProgress = get(questProgressState) + amount

				set(questProgressState, newProgress)

				set(questStatuses(quest), statuses =>
					statuses.map((status, index) => {
						const currentQuest = quests[index]

						if (
							currentQuest !== undefined
							&& status === "incomplete"
							&& newProgress >= currentQuest.progressionMaximum
						) {
							achievedQuests.unshift({ ...currentQuest, ID: nanoid() })

							return "achieved"
						}

						return status
					}),
				)

				set(questNotifications, currentQuestNotifications => [
					...achievedQuests,
					...currentQuestNotifications,
				])
			},
		[],
	)
}
