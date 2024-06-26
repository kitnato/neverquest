import { generateArtifact } from "@kitnato/locran"
import { nanoid } from "nanoid"

import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS, WEAPON_BASE } from "@neverquest/data/gear"
import {
	getArmorRanges,
	getFromRange,
	getMeleeRanges,
	getRangedRanges,
	getShieldRanges,
	getSigmoid,
} from "@neverquest/utilities/getters"

import type {
	ArmorClass,
	GeneratorParameters,
	ShieldClass,
	WeaponClass,
} from "@kitnato/locran/build/types"
import type { Armor, Melee, Ranged, Shield } from "@neverquest/types"
import type { Grip } from "@neverquest/types/unions"

export function generateArmor({
	gearClass,
	level,
	...generatorParameters
}: GeneratorParameters & {
	gearClass: ArmorClass
	level: number
}): Armor {
	const factor = getSigmoid(level)
	const { burden, deflectionChance, protection, weight } = getArmorRanges({
		factor,
		gearClass,
	})

	return {
		burden: Math.round(getFromRange(burden)),
		deflectionChance: getFromRange(deflectionChance),
		gearClass,
		ID: nanoid(),
		level,
		name: generateArtifact({
			query: {
				type: "armor",
			},
			...generatorParameters,
		}),
		price: Math.round(
			getFromRange({
				factor,
				...ARMOR_SPECIFICATIONS[gearClass].price,
			}),
		),
		protection: Math.round(getFromRange(protection)),
		weight: Math.round(getFromRange(weight)),
	}
}

export function generateMeleeWeapon({
	gearClass,
	grip,
	level,
	...generatorParameters
}: GeneratorParameters & {
	gearClass: WeaponClass
	grip: Grip
	level: number
}): Melee {
	const factor = getSigmoid(level)
	const { abilityChance, burden, damage, rate, weight } = getMeleeRanges({
		factor,
		gearClass,
		grip,
	})

	return {
		abilityChance: getFromRange(abilityChance),
		burden: Math.round(getFromRange(burden)),
		damage: Math.round(getFromRange(damage)),
		gearClass,
		grip,
		ID: nanoid(),
		level,
		name: generateArtifact({
			query: {
				artifactClass: gearClass,
				subtype: "melee",
				type: "weapon",
			},
			...generatorParameters,
		}),
		price: Math.round(getFromRange({ factor, ...WEAPON_BASE.price })),
		rate: Math.round(getFromRange(rate)),
		weight: Math.round(getFromRange(weight)),
	}
}

export function generateRangedWeapon({
	gearClass,
	level,
	...generatorParameters
}: GeneratorParameters & {
	gearClass: WeaponClass
	level: number
}): Ranged {
	const factor = getSigmoid(level)
	const { abilityChance, burden, damage, munitionsCost, range, rate, weight } = getRangedRanges({
		factor,
		gearClass,
	})

	return {
		abilityChance: getFromRange(abilityChance),
		burden: Math.round(getFromRange(burden)),
		damage: Math.round(getFromRange(damage)),
		gearClass,
		ID: nanoid(),
		level,
		munitionsCost: Math.round(getFromRange(munitionsCost)),
		name: generateArtifact({
			query: {
				artifactClass: gearClass,
				subtype: "ranged",
				type: "weapon",
			},
			...generatorParameters,
		}),
		price: Math.round(getFromRange({ factor, ...WEAPON_BASE.price })),
		range: Math.round(getFromRange(range)),
		rate: Math.round(getFromRange(rate)),
		weight: Math.round(getFromRange(weight)),
	}
}

export function generateShield({
	gearClass,
	level,
	...generatorParameters
}: GeneratorParameters & {
	gearClass: ShieldClass
	level: number
}): Shield {
	const factor = getSigmoid(level)
	const { blockChance, burden, staggerChance, weight } = getShieldRanges({
		factor,
		gearClass,
	})

	return {
		blockChance: getFromRange(blockChance),
		burden: Math.round(getFromRange(burden)),
		gearClass,
		ID: nanoid(),
		level,
		name: generateArtifact({
			query: {
				type: "shield",
			},
			...generatorParameters,
		}),
		price: Math.round(
			getFromRange({
				factor,
				...SHIELD_SPECIFICATIONS[gearClass].price,
			}),
		),
		staggerChance: getFromRange(staggerChance),
		weight: Math.round(getFromRange(weight)),
	}
}
