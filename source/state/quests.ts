import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { QUESTS, QUEST_COMPLETION_BONUS, QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isQuestBonus } from "@neverquest/types/type-guards"
import {
	QUEST_CLASS_TYPES,
	type Quest,
	type QuestBonus,
	type QuestClass,
	type QuestStatus,
} from "@neverquest/types/unions"
import { getQuestClass, getQuestData } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { QuestNotification } from "@neverquest/types"

// SELECTORS

export const activeQuests = withStateKey("activeQuests", key =>
	selectorFamily({
		get: (quest: Quest) =>
			({ get }) => {
				const currentQuestStatuses = get(questStatuses(quest))

				const quests = []

				for (const currentQuestData of getQuestData(quest)) {
					quests.push(currentQuestData)

					if (currentQuestStatuses[currentQuestData.progressionIndex] === "incomplete") {
						break
					}
				}

				return quests
			},
		key,
	}),
)

export const canCompleteQuests = withStateKey("canCompleteQuests", key =>
	selectorFamily({
		get:
			(questClass: QuestClass) =>
				({ get }) => {
					if (!get(canTrackQuests)) {
						return false
					}

					return QUEST_TYPES_BY_CLASS[questClass].some(
						quest => Object.values(
							get(questStatuses(quest)),
						).includes("complete"))
				},
		key,
	}),
)

export const canTrackQuests = withStateKey("canTrackQuests", key =>
	selector({
		get: ({ get }) =>
			get(isSkillAcquired("memetics"))
			&& get(ownedItem("journal")) !== undefined
			&& get(questStatuses("decipheringJournal"))[0] !== "incomplete",
		key,
	}),
)

export const completedQuestsCount = withStateKey("completedQuestsCount", key =>
	selectorFamily({
		get: (questClass: QuestClass) =>
			({ get }) =>
				QUEST_TYPES_BY_CLASS[questClass].reduce(
					(sum, quest) =>
						sum + Object.values(get(questStatuses(quest))).filter(isQuestBonus).length,
					0,
				),
		key,
	}),
)

export const questsBonus = withStateKey("questsBonus", key =>
	selectorFamily({
		get: (questBonus: QuestBonus) =>
			({ get }) => {
				if (!get(canTrackQuests)) {
					return 0
				}

				let bonus = 0

				for (const questClass of QUEST_CLASS_TYPES) {
					for (const quest of QUEST_TYPES_BY_CLASS[questClass]) {
						bonus += Object.values(get(questStatuses(quest))).filter(status => questBonus === status).length * QUEST_COMPLETION_BONUS[getQuestClass(quest)]
					}
				}

				return bonus
			},
		key,
	}),
)

export const questStatuses = withStateKey("questStatuses", key =>
	selectorFamily<QuestStatus[], Quest>({
		get: (quest: Quest) =>
			({ get }) => QUESTS[quest]
				.progression
				.map((progress, index) =>
					get(questRewards(quest))[index]
					?? (get(questProgress(quest)) < progress ? "incomplete" : "complete"),
				),
		key,
	}),
)

// ATOMS

export const questNotifications = withStateKey("questNotifications", key =>
	atom<QuestNotification[]>({
		default: [],
		effects: [handleStorage({ key })],
		key,
	}),
)

export const questProgress = withStateKey("questProgress", key =>
	atomFamily<number, Quest>({
		default: 0,
		effects: quest => [handleStorage({ key, parameter: quest })],
		key,
	}),
)

export const questRewards = withStateKey("questRewards", key =>
	atomFamily<(QuestBonus | undefined)[], Quest>({
		default: quest => QUESTS[quest].progression.map(() => undefined) as [(QuestBonus | undefined), ...(QuestBonus | undefined)[]],
		effects: quest => [handleStorage({ key, parameter: quest })],
		key,
	}),
)
