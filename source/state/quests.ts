import { computed } from "@preact/signals"

import { QUESTS, QUEST_COMPLETION_BONUS, QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests"
import { ownedItem } from "@neverquest/state/inventory"
import { isSkillTrained } from "@neverquest/state/skills"
import { isQuestBonus } from "@neverquest/types/type-guards"
import {
	QUEST_CLASS_TYPES,
	type Quest,
	type QuestBonus,
	type QuestClass,
	type QuestStatus,
} from "@neverquest/types/unions"
import { getQuestClass, getQuestData } from "@neverquest/utilities/getters"
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { QuestData } from "@neverquest/types"

// COMPUTED

export const activeQuests = computedFamily((quest: Quest) =>
	() => {
		const currentQuestStatuses = questStatuses(quest).get()

		const quests = []

		for (const currentQuestData of getQuestData(quest)) {
			quests.push(currentQuestData)

			if (currentQuestStatuses[currentQuestData.progressionIndex] === "incomplete") {
				break
			}
		}

		return quests
	},
)

export const canCompleteQuests = computedFamily((questClass: QuestClass) =>
	() => {
		if (!canTrackQuests.value) {
			return false
		}

		return QUEST_TYPES_BY_CLASS[questClass].some(
			quest => Object
				.values(questStatuses(quest).get())
				.includes("complete"),
		)
	},
)

export const canTrackQuests = computed(() =>
	isSkillTrained("memetics").get()
	&& ownedItem("journal").value !== undefined
	&& questStatuses("deciphering").get()[0] !== "incomplete",
)

export const completedQuestsCount = computedFamily((questClass: QuestClass) =>
	() =>
		QUEST_TYPES_BY_CLASS[questClass].reduce(
			(sum, quest) =>
				sum + Object.values(questStatuses(quest).get()).filter(isQuestBonus).length,
			0,
		),
)

export const questsBonus = computedFamily((questBonus: QuestBonus) =>
	() => {
		if (!canTrackQuests.value) {
			return 0
		}

		let bonus = 0

		for (const questClass of QUEST_CLASS_TYPES) {
			for (const quest of QUEST_TYPES_BY_CLASS[questClass]) {
				bonus += Object.values(questStatuses(quest).get()).filter(status => questBonus === status).length * QUEST_COMPLETION_BONUS[getQuestClass(quest)]
			}
		}

		return bonus
	},
)

// SIGNALS

export const questNotifications = persistentSignal<QuestData[]>({
	key: "questNotifications",
	value: [],
})

export const questProgress = persistentSignalFamily<Quest, number>({
	key: "questProgress",
	value: 0,
})

export const questStatuses = persistentSignalFamily<Quest, QuestStatus[]>({
	key: "questStatuses",
	value: quest => QUESTS[quest].progression.map(() => "incomplete"),
})
