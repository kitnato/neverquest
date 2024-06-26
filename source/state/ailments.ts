import { selector, selectorFamily } from "recoil"

import { ELEMENTALS } from "@neverquest/data/items"
import { BLEED } from "@neverquest/data/statistics"
import { BRUISER } from "@neverquest/data/traits"
import { attributeRank } from "@neverquest/state/attributes"
import { elementalEffects, shield, weapon } from "@neverquest/state/gear"
import { isSkillTrained } from "@neverquest/state/skills"
import { isTraitEarned } from "@neverquest/state/traits"
import { isUnarmed, isUnshielded } from "@neverquest/types/type-guards"
import { AILMENT_TYPES, type Ailment, ELEMENTAL_TYPES } from "@neverquest/types/unions"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const bleed = withStateKey("bleed", key =>
	selector({
		get: ({ get }) => BLEED[get(isTraitEarned("shredder")) ? "shredder" : "base"],
		key,
	}),
)

export const bleedChance = withStateKey("bleedChance", key =>
	selector({
		get: ({ get }) => {
			const { abilityChance, gearClass } = get(weapon)

			return get(isSkillTrained("anatomy")) && gearClass === "piercing" ? abilityChance : 0
		},
		key,
	}),
)

export const canReceiveAilment = withStateKey("canReceiveAilment", key =>
	selectorFamily({
		get:
			(ailment: Ailment) =>
				({ get }) => {
					switch (ailment) {
						case "bleeding": {
							return get(bleedChance) > 0
						}

						case "staggered": {
							return get(staggerChance) > 0
						}

						case "stunned": {
							return get(stunChance) > 0
						}

						case "burning":
						case "frozen":
						case "shocked": {
							const elemental = ELEMENTAL_TYPES.find(
								currentElemental => ELEMENTALS[currentElemental].ailment === ailment,
							)
							const { armor, weapon } = get(elementalEffects)

							return elemental === undefined
								? false
								: armor[elemental].duration > 0 || weapon[elemental].duration > 0
						}
					}
				},
		key,
	}),
)

export const canReceiveAilments = withStateKey("canReceiveAilments", key =>
	selector({
		get: ({ get }) => AILMENT_TYPES.some(ailment => get(canReceiveAilment(ailment))),
		key,
	}),
)

export const staggerChance = withStateKey("staggerChance", key =>
	selector({
		get: ({ get }) => {
			const shieldValue = get(shield)

			return get(isSkillTrained("shieldcraft")) && !isUnshielded(shieldValue)
				? get(shield).staggerChance
				: 0
		},
		key,
	}),
)

export const stunChance = withStateKey("stunChance", key =>
	selector({
		get: ({ get }) => {
			const weaponValue = get(weapon)
			const { abilityChance, gearClass } = weaponValue
			const {
				stun: { increment, maximum },
			} = BRUISER

			return get(isSkillTrained("traumatology")) && gearClass === "blunt"
				? get(isTraitEarned("bruiser")) && isUnarmed(weaponValue)
					? Math.min(increment * get(attributeRank("strength")), maximum)
					: abilityChance
				: 0
		},
		key,
	}),
)
