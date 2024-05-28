import { atom, atomFamily, selector } from "recoil"

import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const earnedTraits = withStateKey("earnedTraits", key =>
	selector({
		get: ({ get }) => {
			const currentEarnedTraits = {} as Record<Trait, boolean>

			for (const trait of TRAIT_TYPES) {
				currentEarnedTraits[trait] = get(isTraitEarned(trait))
			}

			return currentEarnedTraits
		},
		key,
	}),
)

// ATOMS

export const isTraitEarned = withStateKey("isTraitEarned", key =>
	atomFamily<boolean, Trait>({
		default: false,
		effects: trait => [handleStorage({ key, parameter: trait })],
		key,
	}),
)

export const selectedTrait = withStateKey("selectedTrait", key =>
	atom<Trait | undefined>({
		default: undefined,
		effects: [handleStorage({ key })],
		key,
	}),
)
