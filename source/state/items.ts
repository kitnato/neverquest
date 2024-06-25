import { computed } from "@preact/signals"

import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import {
	INFUSABLES,
	INFUSION_BASE,
	INFUSION_DELTA,
	INFUSION_DURATION,
	MUNITIONS,
} from "@neverquest/data/items"
import { ownedItem } from "@neverquest/state/inventory"
import { essence } from "@neverquest/state/resources"
import { type Infusable, type Inheritable, RELIC_TYPES, type Relic } from "@neverquest/types/unions"
import { getFromRange, getSigmoid, getTriangular } from "@neverquest/utilities/getters"
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const equippedRelics = computed(() => {
	const currentEquippedRelics = {} as Record<Relic, boolean>

	for (const relic of RELIC_TYPES) {
		currentEquippedRelics[relic] = isRelicEquipped(relic).get()
	}

	return currentEquippedRelics
})

export const infusionEffect = computedFamily((infusable: Infusable) => () => {
	const infusionLevelValue = infusionLevel(infusable).get()
	const { effect } = INFUSABLES[infusable].item

	return ownedItem(infusable).value === undefined
		? 0
		: infusionLevelValue === LEVELLING_MAXIMUM
			? effect.maximum
			: getFromRange({
				factor: getSigmoid(infusionLevelValue),
				...effect,
			})
})

export const infusionMaximum = computedFamily((infusable: Infusable) => () => getTriangular(infusionLevel(infusable).get() + INFUSION_BASE))

export const infusionStep = computedFamily((infusable: Infusable) => () => Math.min(
	essence.get(),
	(infusionMaximum(infusable).value / INFUSION_DURATION) * INFUSION_DELTA,
))

export const isInfusionAtMaximum = computedFamily((infusable: Infusable) => () => infusionLevel(infusable).get() >= LEVELLING_MAXIMUM)

export const munitions = computed(() => ownedItem("munitions satchel").value === undefined
	? 0
	: munitionsCapacity.get(),
)

// SIGNALS

export const infusion = persistentSignalFamily<Infusable, number>({
	key: "infusion",
	value: 0,
})

export const infusionLevel = persistentSignalFamily<Infusable, number>({
	key: "infusionLevel",
	value: 0,
})

export const isInheritableLooted = persistentSignalFamily<Inheritable, boolean>({
	key: "isInheritableLooted",
	value: false,
})

export const isRelicEquipped = persistentSignalFamily<Relic, boolean>({
	key: "isRelicEquipped",
	value: false,
})

export const munitionsCapacity = persistentSignal({
	key: "munitionsCapacity",
	value: MUNITIONS.minimum,
})

export const tears = persistentSignal({
	key: "tears",
	value: 0,
})
