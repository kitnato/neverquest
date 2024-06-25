import { computed } from "@preact/signals"

import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions"
import { persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const earnedTraits = computed(() => {
	const currentEarnedTraits = {} as Record<Trait, boolean>

	for (const trait of TRAIT_TYPES) {
		currentEarnedTraits[trait] = isTraitEarned(trait).get()
	}

	return currentEarnedTraits
})

// SIGNALS

export const isTraitEarned = persistentSignalFamily<Trait, boolean>({
	key: "isTraitEarned",
	value: false,
})

export const selectedTrait = persistentSignal<Trait | null>({
	key: "selectedTrait",
	value: null,
})
