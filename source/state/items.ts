import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import {
	INFUSABLES,
	INFUSION_BASE,
	INFUSION_DELTA,
	INFUSION_DURATION,
	MUNITIONS,
} from "@neverquest/data/items"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { essence } from "@neverquest/state/resources"
import { type Infusable, type Inheritable, RELIC_TYPES, type Relic } from "@neverquest/types/unions"
import { getFromRange, getSigmoid, getTriangular } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const equippedRelics = withStateKey("equippedRelics", key =>
	selector({
		get: ({ get }) => {
			const currentEquippedRelics = {} as Record<Relic, boolean>

			for (const relic of RELIC_TYPES) {
				currentEquippedRelics[relic] = get(isRelicEquipped(relic))
			}

			return currentEquippedRelics
		},
		key,
	}),
)

export const infusionEffect = withStateKey("infusionEffect", key =>
	selectorFamily({
		get:
			(infusable: Infusable) =>
				({ get }) => {
					const infusionLevelValue = get(infusionLevel(infusable))
					const { effect } = INFUSABLES[infusable].item

					return get(ownedItem(infusable)) === undefined
						? 0
						: infusionLevelValue === LEVELLING_MAXIMUM
							? effect.maximum
							: getFromRange({
								factor: getSigmoid(infusionLevelValue),
								...effect,
							})
				},
		key,
	}),
)

export const infusionMaximum = withStateKey("infusionMaximum", key =>
	selectorFamily({
		get:
			(infusable: Infusable) => ({ get }) => getTriangular(get(infusionLevel(infusable)) + INFUSION_BASE),
		key,
	}),
)

export const infusionStep = withStateKey("infusionStep", key =>
	selectorFamily({
		get:
			(infusable: Infusable) =>
				({ get }) => Math.min(
					get(essence),
					(get(infusionMaximum(infusable)) / INFUSION_DURATION) * INFUSION_DELTA,
				),
		key,
	}),
)

export const isInfusionAtMaximum = withStateKey("isInfusionAtMaximum", key =>
	selectorFamily({
		get:
			(infusable: Infusable) =>
				({ get }) => get(infusionLevel(infusable)) >= LEVELLING_MAXIMUM,
		key,
	}),
)

export const munitions = withStateKey("munitions", key =>
	selector({
		get: ({ get }) => get(ownedItem("munitions satchel")) === undefined
			? 0
			: get(munitionsCapacity),
		key,
	}),
)

// ATOMS

export const infusion = withStateKey("infusion", key =>
	atomFamily<number, Infusable>({
		default: 0,
		effects: infusable => [handleStorage({ key, parameter: infusable })],
		key,
	}),
)

export const infusionLevel = withStateKey("infusionLevel", key =>
	atomFamily<number, Infusable>({
		default: 0,
		effects: infusable => [handleStorage({ key, parameter: infusable })],
		key,
	}),
)

export const isInheritableLooted = withStateKey("isInheritableLooted", key =>
	atomFamily<boolean, Inheritable>({
		default: false,
		effects: inheritable => [handleStorage({ key, parameter: inheritable })],
		key,
	}),
)

export const isRelicEquipped = withStateKey("isRelicEquipped", key =>
	atomFamily<boolean, Relic>({
		default: false,
		effects: relic => [handleStorage({ key, parameter: relic })],
		key,
	}),
)

export const munitionsCapacity = withStateKey("munitionsCapacity", key =>
	atom({
		default: MUNITIONS.minimum,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const tears = withStateKey("tears", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)
