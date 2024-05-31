import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { MASTERIES } from "@neverquest/data/masteries"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { shield, weapon } from "@neverquest/state/gear"
import { isSkillTrained } from "@neverquest/state/skills"
import { isMelee, isRanged, isShield } from "@neverquest/types/type-guards"
import { MASTERY_TYPES, type Mastery } from "@neverquest/types/unions"
import { getComputedStatistic } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const canIncreaseMastery = withStateKey("canIncreaseMastery", key =>
	selectorFamily({
		get: (mastery: Mastery) =>
			({ get }) => {
				const isSkillTrainedRequired = get(isSkillTrained(MASTERIES[mastery].requiredSkill))

				switch (mastery) {
					case "butchery": {
						const weaponValue = get(weapon)

						return isSkillTrainedRequired && isMelee(weaponValue) && weaponValue.grip === "two-handed"
					}

					case "cruelty": {
						return isSkillTrainedRequired && get(weapon).gearClass === "piercing"
					}

					case "finesse": {
						return isSkillTrainedRequired && get(weapon).gearClass === "slashing"
					}

					case "marksmanship": {
						return isSkillTrainedRequired && isRanged(get(weapon))
					}

					case "might": {
						return isSkillTrainedRequired && get(weapon).gearClass === "blunt"
					}

					case "resilience": {
						return isSkillTrainedRequired
					}

					case "stability": {
						return isSkillTrainedRequired && isShield(get(shield))
					}
				}
			},
		key,
	}),
)

export const isMasteryAtMaximum = withStateKey("isMasteryAtMaximum", key =>
	selectorFamily({
		get: (mastery: Mastery) =>
			({ get }) => get(masteryRank(mastery)) === LEVELLING_MAXIMUM,
		key,
	}),
)

export const masteryStatistic = withStateKey("masteryStatistic", key =>
	selectorFamily({
		get: (mastery: Mastery) =>
			({ get }) => {
				const { base, maximum, requiredSkill } = MASTERIES[mastery]

				if (get(isSkillTrained(requiredSkill))) {
					return getComputedStatistic({
						base,
						increment: (maximum - base) / LEVELLING_MAXIMUM,
						rank: get(masteryRank(mastery)),
					})
				}

				return 0
			},
		key,
	}),
)

export const unlockedMasteries = withStateKey("unlockedMasteries", key =>
	selector({
		get: ({ get }) => {
			const currentUnlockedMasteries = {} as Record<Mastery, boolean>

			for (const mastery of MASTERY_TYPES) {
				currentUnlockedMasteries[mastery] = get(isSkillTrained(MASTERIES[mastery].requiredSkill))
			}

			return currentUnlockedMasteries
		},
		key,
	}),
)

// ATOMS

export const expandedMasteries = withStateKey("expandedMasteries", key =>
	atom({
		default: true,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const masteryProgress = withStateKey("masteryProgress", key =>
	atomFamily<number, Mastery>({
		default: 0,
		effects: mastery => [handleStorage({ key, parameter: mastery })],
		key,
	}),
)

export const masteryRank = withStateKey("masteryRank", key =>
	atomFamily<number, Mastery>({
		default: 0,
		effects: mastery => [handleStorage({ key, parameter: mastery })],
		key,
	}),
)
