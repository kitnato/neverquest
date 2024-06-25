import { computed } from "@preact/signals"

import {
	ARMOR_NONE,
	SHIELD_ELEMENTAL_EFFECTS_BASE,
	SHIELD_NONE,
	WEAPON_NONE,
} from "@neverquest/data/gear"
import { STALWART_BURDEN_REDUCTION } from "@neverquest/data/traits"
import { munitions } from "@neverquest/state/items"
import { reserveCurrent } from "@neverquest/state/reserves"
import { isTraitEarned } from "@neverquest/state/traits"
import { isMelee, isRanged, isUnarmed } from "@neverquest/types/type-guards"
import { getElementalEffects, getTotalElementalEffects } from "@neverquest/utilities/getters"
import { persistentSignal } from "@neverquest/utilities/persistentSignal"

import type { Armor, GemItem, Shield, Weapon } from "@neverquest/types"

// COMPUTED

export const armorBurden = computed(() => {
	const { burden } = armor.get()

	return isTraitEarned("stalwart").get()
		? Math.round(burden * STALWART_BURDEN_REDUCTION)
		: burden
})

export const canAttackOrParry = computed(() => reserveCurrent("stamina").get() >= weapon.get().burden)

export const canBlockOrStagger = computed(() => reserveCurrent("stamina").get() >= shield.get().burden)

export const canDodge = computed(() => isTraitEarned("stalwart").get() || reserveCurrent("stamina").get() >= armor.get().burden)

export const elementalEffects = computed(() => {
	const armorValue = armor.get()
	const shieldValue = shield.get()
	const weaponValue = weapon.get()
	const fittedGemsValue = fittedGems.get()

	const armorEffects = getElementalEffects({
		gear: armorValue,
		gems: fittedGemsValue[armorValue.ID] ?? [],
	})
	// Only apply shield effects if they're actively used.
	const shieldEffects = (
		isMelee(weaponValue)
		|| isUnarmed(weaponValue)
	) && (weaponValue.grip === "one-handed" || isTraitEarned("colossus").get())
		? getElementalEffects({
			gear: shieldValue,
			gems: fittedGemsValue[shieldValue.ID] ?? [],
		})
		: SHIELD_ELEMENTAL_EFFECTS_BASE
	const weaponEffects = getElementalEffects({
		gear: weaponValue,
		gems: fittedGemsValue[weaponValue.ID] ?? [],
	})

	return {
		armor: {
			fire: getTotalElementalEffects({ ...armorEffects.fire, modifier: shieldEffects.fire }),
			ice: getTotalElementalEffects({ ...armorEffects.ice, modifier: shieldEffects.ice }),
			lightning: getTotalElementalEffects({
				...armorEffects.lightning,
				modifier: shieldEffects.lightning,
			}),
		},
		weapon: {
			fire: getTotalElementalEffects({ ...weaponEffects.fire, modifier: shieldEffects.fire }),
			ice: getTotalElementalEffects({ ...weaponEffects.ice, modifier: shieldEffects.ice }),
			lightning: getTotalElementalEffects({
				...weaponEffects.lightning,
				modifier: shieldEffects.lightning,
			}),
		},
	}
})

export const isMunitionsSufficient = computed(() => {
	const weaponValue = weapon.get()

	return isRanged(weaponValue) ? munitions.get() >= weaponValue.munitionsCost : true
})

// SIGNALS

export const armor = persistentSignal<Armor | typeof ARMOR_NONE>({
	key: "armor",
	value: ARMOR_NONE,
})

export const fittedGems = persistentSignal<Record<string, GemItem[]>>({
	key: "fittedGems",
	value: {
		[ARMOR_NONE.ID]: [],
		[SHIELD_NONE.ID]: [],
		[WEAPON_NONE.ID]: [],
	},
})

export const shield = persistentSignal<Shield | typeof SHIELD_NONE>({
	key: "shield",
	value: SHIELD_NONE,
})

export const weapon = persistentSignal<Weapon | typeof WEAPON_NONE>({
	key: "weapon",
	value: WEAPON_NONE,
})
