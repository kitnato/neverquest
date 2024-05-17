import { atom, atomFamily, selector } from "recoil"

import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const acquiredTraits = withStateKey("acquiredTraits", key =>
	selector({
		get: ({ get }) => {
			const currentAcquiredTraits = {} as Record<Trait, boolean>

			for (const trait of TRAIT_TYPES) {
				currentAcquiredTraits[trait] = get(isTraitAcquired(trait))
			}

			return currentAcquiredTraits
		},
		key,
	}),
)

// ATOMS

export const isTraitAcquired = withStateKey("isTraitAcquired", key =>
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
