import { computed } from "@preact/signals"

import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { MASTERIES, MASTERY_COST } from "@neverquest/data/masteries"
import { shield, weapon } from "@neverquest/state/gear"
import { isSkillTrained } from "@neverquest/state/skills"
import { isMelee, isRanged, isShield } from "@neverquest/types/type-guards"
import { MASTERY_TYPES, type Mastery } from "@neverquest/types/unions"
import { getComputedStatistic } from "@neverquest/utilities/getters"
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const canIncreaseMastery = computedFamily((mastery: Mastery) => () => {
	const isSkillTrainedRequired = isSkillTrained(MASTERIES[mastery].requiredSkill).get()
	const weaponValue = weapon.get()
	const { gearClass } = weaponValue

	switch (mastery) {
		case "butchery": {
			return isSkillTrainedRequired && isMelee(weaponValue) && weaponValue.grip === "two-handed"
		}

		case "cruelty": {
			return isSkillTrainedRequired && gearClass === "piercing"
		}

		case "finesse": {
			return isSkillTrainedRequired && gearClass === "slashing"
		}

		case "marksmanship": {
			return isSkillTrainedRequired && isRanged(weaponValue)
		}

		case "might": {
			return isSkillTrainedRequired && gearClass === "blunt"
		}

		case "resilience": {
			return isSkillTrainedRequired
		}

		case "stability": {
			return isSkillTrainedRequired && isShield(get(shield))
		}
	}
})

export const isMasteryAtMaximum = computedFamily((mastery: Mastery) => () => masteryRank(mastery).get() === LEVELLING_MAXIMUM)

export const masteryCost = computedFamily((mastery: Mastery) => () => {
	const { base, maximum } = MASTERY_COST

	return Math.min(masteryRank(mastery).get() + base, maximum)
})

export const masteryStatistic = computedFamily((mastery: Mastery) => () => {
	const { base, maximum, requiredSkill } = MASTERIES[mastery]

	if (isSkillTrained(requiredSkill).get()) {
		return getComputedStatistic({
			base,
			increment: (maximum - base) / LEVELLING_MAXIMUM,
			rank: masteryRank(mastery).get(),
		})
	}

	return 0
})

export const unlockedMasteries = computed(() => {
	const currentUnlockedMasteries = {} as Record<Mastery, boolean>

	for (const mastery of MASTERY_TYPES) {
		currentUnlockedMasteries[mastery] = isSkillTrained(MASTERIES[mastery].requiredSkill).get()
	}

	return currentUnlockedMasteries
})

// SIGNALS

export const expandedMasteries = persistentSignal({
	key: "expandedMasteries",
	value: true,
})

export const masteryProgress = persistentSignalFamily<Mastery, number>({
	key: "masteryProgress",
	value: 0,
})

export const masteryRank = persistentSignalFamily<Mastery, number>({
	key: "masteryRank",
	value: 0,
})
