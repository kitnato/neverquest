import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { GENERIC_MINIMUM } from "@neverquest/data/general"
import { BLIGHT, POISON } from "@neverquest/data/monster"
import { HEALTH_LOW_THRESHOLD, RESERVES } from "@neverquest/data/reserves"
import { attributeStatistic } from "@neverquest/state/attributes"
import { stage } from "@neverquest/state/character"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { questsBonus } from "@neverquest/state/quests"
import { getFromRange, getLinearMapping, getSigmoid } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { Reserve } from "@neverquest/types/unions"

// SELECTORS

export const blightMagnitude = withStateKey("blightMagnitude", key =>
	selector({
		get: ({ get }) => get(blight) * BLIGHT.increment,
		key,
	}),
)

export const canResurrect = withStateKey("canResurrect", key =>
	selector({
		get: ({ get }) => get(isIncapacitated) && get(ownedItem("phylactery")) !== undefined,
		key,
	}),
)

export const hasFlatlined = withStateKey("hasFlatlined", key =>
	selector({
		get: ({ get }) => get(isIncapacitated) && get(ownedItem("phylactery")) === undefined,
		key,
	}),
)

export const healthMaximumPoisoned = withStateKey("healthMaximumPoisoned", key =>
	selector({
		get: ({ get }) => {
			const healthMaximumValue = get(reserveMaximum("health"))

			return Math.max(
				Math.round(
					healthMaximumValue
					- Math.round(
						healthMaximumValue * get(poisonMagnitude) * (get(poisonDuration) / get(poisonLength)),
					),
				),
				GENERIC_MINIMUM,
			)
		},
		key,
	}),
)

export const isBlighted = withStateKey("isBlighted", key =>
	selector({
		get: ({ get }) => get(blight) > 0,
		key,
	}),
)

export const isIncapacitated = withStateKey("isIncapacitated", key =>
	selector({
		get: ({ get }) => get(reserveCurrent("health")) === 0,
		key,
	}),
)

export const isReserveAtMaximum = withStateKey("isReserveAtMaximum", key =>
	selectorFamily({
		get: (reserve: Reserve) =>
			({ get }) =>
				get(reserveCurrent(reserve)) >= get(reserve === "health" ? healthMaximumPoisoned : staminaMaximumBlighted),
		key,
	}),
)

export const isHealthLow = withStateKey("isHealthLow", key =>
	selector({
		get: ({ get }) => get(reserveCurrent("health")) <= get(healthMaximumPoisoned) * HEALTH_LOW_THRESHOLD,
		key,
	}),
)

export const isPoisoned = withStateKey("isPoisoned", key =>
	selector({
		get: ({ get }) => get(poisonDuration) > 0,
		key,
	}),
)

export const isRegenerating = withStateKey("isRegenerating", key =>
	selectorFamily({
		get: (reserve: Reserve) =>
			({ get }) =>
				get(regenerationDuration(reserve)) > 0,
		key,
	}),
)

export const poisonLength = withStateKey("poisonLength", key =>
	selector({
		get: ({ get }) => {
			const {
				duration: { maximum, minimum },
				requiredStage,
			} = POISON

			return getFromRange({
				factor: getSigmoid(
					getLinearMapping({
						offset: requiredStage,
						stage: get(stage),
					}),
				),
				maximum,
				minimum,
			})
		},
		key,
	}),
)

export const poisonMagnitude = withStateKey("poisonMagnitude", key =>
	selector({
		get: ({ get }) => {
			const {
				magnitude: { maximum, minimum },
				requiredStage,
			} = POISON

			return getFromRange({
				factor: getSigmoid(
					getLinearMapping({
						offset: requiredStage,
						stage: get(stage),
					}),
				),
				maximum,
				minimum,
			})
		},
		key,
	}),
)

export const regenerationAmount = withStateKey("regenerationAmount", key =>
	selectorFamily({
		get: (reserve: Reserve) => ({ get }) =>
			Math.max(
				Math.round(RESERVES[reserve].regeneration * get(reserve === "health" ? healthMaximumPoisoned : staminaMaximumBlighted)),
				GENERIC_MINIMUM,
			),
		key,
	}),
)

export const regenerationRate = withStateKey("regenerationRate", key =>
	selectorFamily({
		get: (reserve: Reserve) => ({ get }) => {
			const { baseRegenerationRate } = RESERVES[reserve]

			return Math.round(
				baseRegenerationRate
				+ baseRegenerationRate * get(attributeStatistic("vigor")),
			)
		},
		key,
	}),
)

export const reserveMaximum = withStateKey("reserveMaximum", key =>
	selectorFamily({
		get: (reserve: Reserve) => ({ get }) => {
			const { attribute } = RESERVES[reserve]
			const attributeStatisticValue = get(attributeStatistic(attribute))
			const questsBonusValue = get(questsBonus(`${reserve}Bonus`))

			return (
				attributeStatisticValue
				+ (
					questsBonusValue === 0
						? 0
						: Math.max(Math.round(attributeStatisticValue * questsBonusValue), GENERIC_MINIMUM)
				)
			)
		},
		key,
	}),
)

export const staminaMaximumBlighted = withStateKey("staminaMaximumBlighted", key =>
	selector({
		get: ({ get }) => {
			const staminaMaximumValue = get(reserveMaximum("stamina"))

			return Math.max(
				Math.round(staminaMaximumValue - staminaMaximumValue * get(blightMagnitude)),
				GENERIC_MINIMUM,
			)
		},
		key,
	}),
)

// ATOMS

export const blight = withStateKey("blight", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isInexhaustible = withStateKey("isInexhaustible", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isInvulnerable = withStateKey("isInvulnerable", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const poisonDuration = withStateKey("poisonDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const protectedElement = withStateKey("protectedElement", key =>
	atom<HTMLDivElement | null>({
		default: null,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const regenerationDuration = withStateKey("regenerationDuration", key =>
	atomFamily<number, Reserve>({
		default: 0,
		effects: reserve => [handleStorage({ key, parameter: reserve })],
		key,
	}),
)

export const reserveCurrent = withStateKey("reserveCurrent", key =>
	atomFamily<number, Reserve>({
		default: reserve => reserve === "health" ? healthMaximumPoisoned : staminaMaximumBlighted,
		effects: reserve => [handleStorage({ key, parameter: reserve })],
		key,
	}),
)
