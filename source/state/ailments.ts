import { computed } from "@preact/signals"

import { ELEMENTALS } from "@neverquest/data/items"
import { BLEED } from "@neverquest/data/statistics"
import { BRUISER } from "@neverquest/data/traits"
import { attributeRank } from "@neverquest/state/attributes"
import { elementalEffects, shield, weapon } from "@neverquest/state/gear"
import { isSkillTrained } from "@neverquest/state/skills"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShield, isUnarmed } from "@neverquest/types/type-guards"
import { AILMENT_TYPES, type Ailment, ELEMENTAL_TYPES } from "@neverquest/types/unions"
import { computedFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const bleed = computed(() => BLEED[isTraitEarned("shredder").get() ? "shredder" : "base"])

export const bleedChance = computed(() => {
	const { abilityChance, gearClass } = weapon.get()

	return isSkillTrained("anatomy").get() && gearClass === "piercing" ? abilityChance : 0
})

export const canReceiveAilment = computedFamily((ailment: Ailment) => () => {
	switch (ailment) {
		case "bleeding": {
			return bleedChance.value > 0
		}

		case "staggered": {
			return staggerChance.value > 0
		}

		case "stunned": {
			return stunChance.value > 0
		}

		case "burning":
		case "frozen":
		case "shocked": {
			const elemental = ELEMENTAL_TYPES.find(
				currentElemental => ELEMENTALS[currentElemental].ailment === ailment,
			)
			const { armor, weapon } = elementalEffects.value

			return elemental === undefined
				? false
				: armor[elemental].duration > 0 || weapon[elemental].duration > 0
		}
	}
})

export const canReceiveAilments = computed(() => AILMENT_TYPES.some(ailment => canReceiveAilment(ailment).value))

export const staggerChance = computed(() => {
	const shieldValue = shield.get()

	return isSkillTrained("shieldcraft").get() && isShield(shieldValue)
		? shieldValue.staggerChance
		: 0
})

export const stunChance = computed(() => {
	const weaponValue = weapon.get()
	const { abilityChance, gearClass } = weaponValue
	const {
		stun: { increment, maximum },
	} = BRUISER

	return isSkillTrained("traumatology").get() && gearClass === "blunt"
		? isTraitEarned("bruiser").get() && isUnarmed(weaponValue)
			? Math.min(increment * attributeRank("strength").get(), maximum)
			: abilityChance
		: 0
})
