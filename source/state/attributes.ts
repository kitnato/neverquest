import { computed } from "@preact/signals"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { essence } from "@neverquest/state/resources"
import { ATTRIBUTE_TYPES, type Attribute } from "@neverquest/types/unions"
import {
	getAttributePointCost,
	getAttributePoints,
	getComputedStatistic,
} from "@neverquest/utilities/getters"
import { computedFamily, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const absorbedEssence = computed(() => {
	let currentAbsorbedEssence = 0

	for (let index = 0; index < powerLevel.value; index++) {
		currentAbsorbedEssence += getAttributePointCost(index)
	}

	return currentAbsorbedEssence
})

export const areAttributesAffordable = computed(() => attributePoints.value > 0)

export const attributePoints = computed(() => getAttributePoints({
	essence: essence.get(),
	powerLevel: powerLevel.value,
}))

export const attributeStatistic = computedFamily((attribute: Attribute) => () => {
	const { base, increment: { amount, bonus } } = ATTRIBUTES[attribute]

	return getComputedStatistic({
		base,
		bonus,
		increment: amount,
		rank: attributeRank(attribute).get(),
	})
})

export const isAttributeAtMaximum = computedFamily((attribute: Attribute) => () => Math.abs(attributeStatistic(attribute).value) >= Math.abs(ATTRIBUTES[attribute].maximum ?? Number.POSITIVE_INFINITY))

export const powerLevel = computed(() => ATTRIBUTE_TYPES.reduce((sum, attribute) => sum + attributeRank(attribute).get(), 0))

// SIGNALS

export const attributeRank = persistentSignalFamily<Attribute, number>({
	key: "attributeRank",
	value: 0,
})
