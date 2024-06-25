import { computed } from "@preact/signals"

import { questsBonus } from "@neverquest/state/quests"
import { QUEST_BONUS_TYPES, type Showing } from "@neverquest/types/unions"
import { persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const isShowingQuestBonus = computed(() => QUEST_BONUS_TYPES.reduce((sum, questBonus) => sum + questsBonus(questBonus).value, 0) > 0)

// SIGNALS

export const activeControl = persistentSignal<"capabilities" | "inventory" | "quests" | null>({
	key: "activeControl",
	value: null,
})

export const isShowing = persistentSignalFamily<Showing, boolean>({
	key: "isShowing",
	value: false,
})
