import { computed } from "@preact/signals"

import { GENERIC_MINIMUM } from "@neverquest/data/general"
import { BLIGHT, POISON } from "@neverquest/data/monster"
import { HEALTH_LOW_THRESHOLD, RESERVES } from "@neverquest/data/reserves"
import { attributeStatistic } from "@neverquest/state/attributes"
import { stage } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import { questsBonus } from "@neverquest/state/quests"
import { getFromRange, getLinearMapping, getSigmoid } from "@neverquest/utilities/getters"
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { Reserve } from "@neverquest/types/unions"

// COMPUTED

export const blightMagnitude = computed(() => blight.get() * BLIGHT.increment)

export const canResurrect = computed(() => isIncapacitated.value && ownedItem("phylactery").value !== undefined)

export const isFlatlined = computed(() => isIncapacitated.value && ownedItem("phylactery").value === undefined)

export const isBlighted = computed(() => blight.get() > 0)

export const isIncapacitated = computed(() => reserveCurrent("health").get() === 0)

export const isHealthLow = computed(() => reserveCurrent("health").get() < reserveMaximumAiling("health").value * HEALTH_LOW_THRESHOLD)

export const isPoisoned = computed(() => poisonDuration.get() > 0)

export const isReserveAtMaximum = computedFamily((reserve: Reserve) => () => reserveCurrent("health").get() >= reserveMaximumAiling(reserve).value)

export const isReserveRegenerating = computedFamily((reserve: Reserve) => () => reserveRegenerationDuration(reserve).get() > 0)

export const poisonLength = computed(() => {
	const {
		duration: { maximum, minimum },
		requiredStage,
	} = POISON

	return getFromRange({
		factor: getSigmoid(
			getLinearMapping({
				offset: requiredStage,
				stage: stage.get(),
			}),
		),
		maximum,
		minimum,
	})
})

export const poisonMagnitude = computed(() => {
	const {
		magnitude: { maximum, minimum },
		requiredStage,
	} = POISON

	return getFromRange({
		factor: getSigmoid(
			getLinearMapping({
				offset: requiredStage,
				stage: stage.get(),
			}),
		),
		maximum,
		minimum,
	})
})

export const reserveMaximum = computedFamily((reserve: Reserve) => () => {
	const { attribute } = RESERVES[reserve]
	const attributeStatisticValue = attributeStatistic(attribute).value
	const questsBonusValue = questsBonus(`${reserve}Bonus`).value

	return (
		attributeStatisticValue
		+ (
			questsBonusValue === 0
				? 0
				: Math.max(Math.round(attributeStatisticValue * questsBonusValue), GENERIC_MINIMUM)
		)
	)
})

export const reserveRegenerationAmount = computedFamily((reserve: Reserve) => () => Math.max(
	Math.round(RESERVES[reserve].regeneration * reserveMaximum(reserve).value),
	GENERIC_MINIMUM,
))

export const reserveRegenerationRate = computedFamily((reserve: Reserve) => () => {
	const { baseRegenerationRate } = RESERVES[reserve]

	return Math.round(
		baseRegenerationRate
		+ baseRegenerationRate * attributeStatistic("vigor").value)
})

export const reserveMaximumAiling = computedFamily((reserve: Reserve) => {
	if (reserve === "health") {
		return () => {
			const reserveMaximumValue = reserveMaximum(reserve).value

			return Math.max(
				Math.round(reserveMaximumValue - Math.round(
					reserveMaximumValue * poisonMagnitude.value * (poisonDuration.get() / poisonLength.value))),
				GENERIC_MINIMUM,
			)
		}
	}

	return () => {
		const reserveMaximumValue = reserveMaximum(reserve).value

		return Math.max(
			Math.round(reserveMaximumValue - reserveMaximumValue * blightMagnitude.value),
			GENERIC_MINIMUM,
		)
	}
})

// SIGNALS

export const blight = persistentSignal({
	key: "blight",
	value: 0,
})

export const isInexhaustible = persistentSignal({
	key: "isInexhaustible",
	value: false,
})

export const isInvulnerable = persistentSignal({
	key: "isInvulnerable",
	value: false,
})

export const poisonDuration = persistentSignal({
	key: "poisonDuration",
	value: 0,
})

export const isDreamCatcherEquippedElement = persistentSignal<HTMLDivElement | null>({
	key: "isDreamCatcherEquippedElement",
	value: null,
})

export const reserveCurrent = persistentSignalFamily({
	key: "reserveCurrent",
	value: (reserve: Reserve) => reserveMaximum(reserve).value,
})

export const reserveRegenerationDuration = persistentSignalFamily<Reserve, number>({
	key: "reserveCurrent",
	value: 0,
})
