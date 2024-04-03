import type {
	AffixStructure,
	ArmorClass,
	ShieldClass,
	WeaponClass,
} from "@kitnato/locran/build/types"
import { nanoid } from "nanoid"
import type { RecoilValue, Snapshot } from "recoil"

import { ATTRIBUTE_COST_BASE } from "@neverquest/data/attributes"
import { AFFIX_STRUCTURE_WEIGHTS, PERKS } from "@neverquest/data/encounter"
import {
	type ARMOR_NONE,
	ARMOR_SPECIFICATIONS,
	SHIELD_ELEMENTAL_EFFECTS_BASE,
	type SHIELD_NONE,
	SHIELD_SPECIFICATIONS,
	WEAPON_BASE,
	WEAPON_MODIFIER,
	type WEAPON_NONE,
	WEAPON_SPECIFICATIONS,
} from "@neverquest/data/gear"
import {
	CLASS_ANIMATED,
	CLASS_ANIMATE_PREFIX,
	GENERIC_MINIMUM,
	LEVELLING_THRESHOLD,
	MILLISECONDS_IN_SECOND,
	RETIREMENT_STAGE,
	ROMAN_NUMERALS,
	ROMAN_NUMERAL_MAXIMUM,
} from "@neverquest/data/general"
import {
	CONSUMABLES,
	ELEMENTALS,
	GEMS,
	GEMS_MAXIMUM,
	GEM_BASE,
	GEM_ENHANCEMENT_RANGE,
	GEM_FITTING_COST_RANGE,
	INFUSABLES,
	RELICS,
} from "@neverquest/data/items"
import { QUESTS } from "@neverquest/data/quests"
import IconArmorNone from "@neverquest/icons/armor-none.svg?react"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconOneHanded from "@neverquest/icons/one-handed.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconShieldNone from "@neverquest/icons/shield-none.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import IconWeaponNone from "@neverquest/icons/weapon-none.svg?react"
import type {
	Armor,
	GearItem,
	GearItemUnequipped,
	GemItem,
	GeneratorRange,
	IncrementBonus,
	InventoryItem,
	QuestData,
	Shield,
	Weapon,
} from "@neverquest/types"
import {
	isArmor,
	isConquest,
	isConsumableItem,
	isGearItem,
	isGemItem,
	isInfusableItem,
	isMelee,
	isRelicItem,
	isRoutine,
	isShield,
	isUnarmed,
	isUnarmored,
	isUnshielded,
	isWeapon,
} from "@neverquest/types/type-guards"
import type { Animation, AnimationSpeed } from "@neverquest/types/ui"
import type { Elemental, Grip, Perk, Quest } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

export function getAffixStructure(): AffixStructure {
	let chance = Math.random()
	const result = AFFIX_STRUCTURE_WEIGHTS.find(([_, probability]) => (chance -= probability) <= 0)

	return result === undefined ? "noAffix" : result[0]
}

export function getAmountPerTick({
	amount,
	duration,
	ticks,
}: {
	amount: number
	duration: number
	ticks: number
}) {
	return (amount / duration) * (duration / ticks)
}

export function getAnimationClass({
	animation,
	isInfinite,
	speed,
}: {
	animation: Animation
	isInfinite?: boolean
	speed?: AnimationSpeed
}) {
	return `${CLASS_ANIMATED} ${CLASS_ANIMATE_PREFIX}${animation}${isInfinite
		? ` ${CLASS_ANIMATE_PREFIX}infinite`
		: ""}${speed ? ` ${CLASS_ANIMATE_PREFIX}${speed}` : ""}`
}

export function getArmorRanges({ factor, gearClass }: { factor: number, gearClass: ArmorClass }) {
	const { burden, deflectionChance, protection, weight } = ARMOR_SPECIFICATIONS[gearClass]

	return {
		burden: getRange({ factor, isRounded: true, ranges: burden }),
		deflectionChance: getRange({ factor, ranges: deflectionChance }),
		protection: getRange({ factor, isRounded: true, ranges: protection }),
		weight: getRange({ factor, isRounded: true, ranges: weight }),
	}
}

export function getAttributePointCost(powerLevel: number) {
	return getTriangular(ATTRIBUTE_COST_BASE + powerLevel)
}

export function getAttributePoints({
	essence,
	powerLevel,
}: {
	essence: number
	powerLevel: number
}) {
	let points = 0
	let requiredEssence = getAttributePointCost(powerLevel)

	while (requiredEssence <= essence) {
		points += GENERIC_MINIMUM
		requiredEssence += getAttributePointCost(powerLevel + points)
	}

	return points
}

export function getComputedStatistic({
	base,
	bonus: { maximum, perRank } = { maximum: Number.POSITIVE_INFINITY, perRank: 0 },
	increment,
	rank,
}: {
	base: number
	bonus?: IncrementBonus
	increment: number
	rank: number
}) {
	const boost = increment * rank

	if (perRank === 0) {
		return base + boost
	}

	return (
		Array.from({ length: rank })
			.map((_, index) => Math.min(index * perRank, maximum))
			.reduce((sum, bonus) => sum + bonus, base) + boost
	)
}

export function getDamagePerRate({
	damage,
	damageModifier = 0,
	damageModifierChance = 0,
	rate,
	rateModifier = 0,
}: {
	damage: number
	damageModifier?: number
	damageModifierChance?: number
	rate: number
	rateModifier?: number
}) {
	return (
		(damage * (1 - damageModifierChance) + damage * damageModifierChance * damageModifier) / (rate / (MILLISECONDS_IN_SECOND * (1 - rateModifier)))
	)
}

export function getElementalEffects({
	gear,
	gems,
}: {
	gear: Armor | Weapon | typeof ARMOR_NONE | typeof WEAPON_NONE
	gems: GemItem[]
}): Record<Elemental, { damage: number, duration: number }>
export function getElementalEffects({
	gear,
	gems,
}: {
	gear: Shield | typeof SHIELD_NONE
	gems: GemItem[]
}): Record<Elemental, number>
export function getElementalEffects({
	gear,
	gems,
}: {
	gear: GearItem | GearItemUnequipped
	gems: GemItem[]
}): Record<Elemental, { damage: number, duration: number }> | Record<Elemental, number>
export function getElementalEffects({
	gear,
	gems,
}: {
	gear: GearItem | GearItemUnequipped
	gems: GemItem[]
}) {
	const armorEffect = isArmor(gear) || isUnarmored(gear)

	if (armorEffect || isUnarmed(gear) || isWeapon(gear)) {
		const effects = {
			fire: { damage: 0, duration: 0 },
			ice: { damage: 0, duration: 0 },
			lightning: { damage: 0, duration: 0 },
		}

		for (const { amount, item } of stackItems(gems)) {
			const { elemental } = GEMS[item.name]
			const { damageArmor, damageWeapon, duration } = ELEMENTALS[elemental]

			effects[elemental] = {
				damage: Math.max(
					Math.round(
						(armorEffect ? gear.level : gear.damage) * getFromRange({ factor: (amount - 1) / (GEMS_MAXIMUM - 1), ...(armorEffect ? damageArmor : damageWeapon) }),
					),
					GENERIC_MINIMUM,
				),
				duration: Math.round(
					getFromRange({
						factor: (amount - 1) / (GEMS_MAXIMUM - 1),
						...duration,
					}),
				),
			}
		}

		return effects
	}

	const effects = { ...SHIELD_ELEMENTAL_EFFECTS_BASE }

	for (const { amount, item } of stackItems(gems)) {
		const { elemental } = GEMS[item.name]

		effects[elemental] = getFromRange({
			factor: (amount - 1) / (GEMS_MAXIMUM - 1),
			...GEM_ENHANCEMENT_RANGE,
		})
	}

	return effects
}

export function getGearIcon(gearItem: GearItem | GearItemUnequipped) {
	if (isArmor(gearItem)) {
		return IconArmor
	}

	if (isShield(gearItem)) {
		return IconShield
	}

	if (isUnarmed(gearItem)) {
		return IconWeaponNone
	}

	if (isUnarmored(gearItem)) {
		return IconArmorNone
	}

	if (isUnshielded(gearItem)) {
		return IconShieldNone
	}

	if (isWeapon(gearItem)) {
		return isMelee(gearItem)
			? (gearItem.grip === "one-handed"
				? IconOneHanded
				: IconTwoHanded)
			: IconRanged
	}

	return IconUnknown
}

export function getFromRange({ factor, maximum, minimum }: GeneratorRange & { factor?: number }) {
	return (factor ?? Math.random()) * (maximum - minimum) + minimum
}

export function getGemFittingCost(fitted: number) {
	return Math.round(
		getFromRange({ factor: fitted / (GEMS_MAXIMUM - 1), ...GEM_FITTING_COST_RANGE }),
	)
}

export function getItemIcon(item: InventoryItem) {
	if (isConsumableItem(item)) {
		return CONSUMABLES[item.name].Icon
	}

	if (isGearItem(item)) {
		return getGearIcon(item)
	}

	if (isGemItem(item)) {
		return GEMS[item.name].Icon
	}

	if (isInfusableItem(item)) {
		return INFUSABLES[item.name].Icon
	}

	if (isRelicItem(item)) {
		return RELICS[item.name].Icon
	}

	return IconUnknown
}

export function getLinearMapping({ offset, stage }: { offset: number, stage: number }) {
	return stage < offset
		? 0
		: ((stage - offset) * (LEVELLING_THRESHOLD - 1)) / (LEVELLING_THRESHOLD - offset - 1) + 1
}

export function getMeleeRanges({
	factor,
	gearClass,
	grip,
}: {
	factor: number
	gearClass: WeaponClass
	grip: Grip
}) {
	const {
		ability: abilityModifier,
		burden: burdenModifier,
		damage: damageModifier,
		rate: rateModifier,
		weight: weightModifier,
	} = WEAPON_MODIFIER[grip]
	const { burden, damage, rate, weight } = WEAPON_BASE
	const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass]

	return {
		abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
		burden: getRange({ factor, isRounded: true, modifier: burdenModifier, ranges: burden }),
		damage: getRange({ factor, isRounded: true, modifier: damageModifier, ranges: damage }),
		rate: getRange({ factor, isRounded: true, modifier: rateModifier, ranges: rate }),
		weight: getRange({ factor, isRounded: true, modifier: weightModifier, ranges: weight }),
	}
}

export function getQuestsData(quest: Quest): QuestData[] {
	const { description, hidden, progression, title } = QUESTS[quest]

	return progression.map((progress, index) => ({
		description: description.replace("@", formatNumber({ value: progress })),
		hidden,
		progressionIndex: index,
		progressionMaximum: progress,
		questClass: isConquest(quest) ? "conquest" : (isRoutine(quest) ? "routine" : "triumph"),
		title: `${title}${progression.length > 1 ? ` ${getRomanNumeral(index + 1)}` : ""}`,
	}))
}

export function getRange({
	factor,
	isRounded = false,
	modifier = 1,
	ranges,
}: {
	factor: number
	isRounded?: boolean
	modifier?: number
	ranges: [GeneratorRange, GeneratorRange]
}): GeneratorRange {
	const maximum
		= getFromRange({ factor, maximum: ranges[1].maximum, minimum: ranges[0].maximum }) * modifier
	const minimum
		= getFromRange({ factor, maximum: ranges[1].minimum, minimum: ranges[0].minimum }) * modifier

	return {
		maximum: isRounded ? Math.round(maximum) : maximum,
		minimum: isRounded ? Math.round(minimum) : minimum,
	}
}

export function getRangedRanges({ factor, gearClass }: { factor: number, gearClass: WeaponClass }) {
	const {
		ability: abilityModifier,
		burden: burdenModifier,
		damage: damageModifier,
		rate: rateModifier,
		weight: weightModifier,
	} = WEAPON_MODIFIER.ranged
	const { burden, damage, munitionsCost, range, rate, weight } = WEAPON_BASE
	const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass]

	return {
		abilityChance: getRange({ factor, modifier: abilityModifier, ranges: abilityChance }),
		burden: getRange({ factor, isRounded: true, modifier: burdenModifier, ranges: burden }),
		damage: getRange({ factor, isRounded: true, modifier: damageModifier, ranges: damage }),
		munitionsCost: getRange({ factor, isRounded: true, ranges: munitionsCost }),
		range: getRange({ factor, isRounded: true, ranges: range }),
		rate: getRange({ factor, isRounded: true, modifier: rateModifier, ranges: rate }),
		weight: getRange({ factor, isRounded: true, modifier: weightModifier, ranges: weight }),
	}
}

export function getPerkEffect({ perk, stage }: { perk: Perk, stage: number }) {
	const { maximum, minimum } = PERKS[perk]

	if (stage < RETIREMENT_STAGE) {
		return 0
	}

	return getFromRange({
		factor: getSigmoid(
			getLinearMapping({
				offset: RETIREMENT_STAGE,
				stage,
			}),
		),
		maximum,
		minimum,
	})
}

function getRomanNumeral(value: number) {
	if (!Number.isInteger(value) || value < 1 || value > ROMAN_NUMERAL_MAXIMUM) {
		return value
	}

	const digits = [...Math.round(value).toString()]
	let position = digits.length - 1
	let currentNumeral = ""

	for (const digit of digits) {
		const numeral = ROMAN_NUMERALS[position]

		if (numeral !== undefined && digit !== "0") {
			currentNumeral += numeral[Number.parseInt(digit) - 1]
		}

		position -= 1
	}

	return currentNumeral
}

export function getSellPrice({ gemsFitted, item }: { gemsFitted?: number, item: InventoryItem }) {
	const { price } = item
	let supplement = 0

	if (isGearItem(item) && gemsFitted !== undefined && gemsFitted > 0) {
		supplement
			+= getSellPrice({
				item: {
					...GEM_BASE,
					ID: nanoid(),
					name: "ruby",
				},
			}) * gemsFitted
	}

	return Math.max(Math.round(price / 2), GENERIC_MINIMUM) + supplement
}

export function getShieldRanges({ factor, gearClass }: { factor: number, gearClass: ShieldClass }) {
	const { blockChance, burden, staggerChance, weight } = SHIELD_SPECIFICATIONS[gearClass]

	return {
		blockChance: getRange({ factor, ranges: blockChance }),
		burden: getRange({ factor, isRounded: true, ranges: burden }),
		staggerChance: getRange({ factor, ranges: staggerChance }),
		weight: getRange({ factor, isRounded: true, ranges: weight }),
	}
}

// https://en.wikipedia.org/wiki/Sigmoid_function
// f(0) = 0, f(38) = ~0.5, f(50) = ~0.75, f(77) = ~1
export function getSigmoid(x: number) {
	return x === 0
		? 0
		: (
			(1 / (1 + Math.pow(Math.E, -0.15 * (x - 45)) - 0.011) - 0.0012)
			* (9 * Math.pow(Math.E, -(Math.LN2 / 5) * x) + 1)
		)
}

export function getSnapshotGetter({ getLoadable }: Snapshot) {
	return <T>(state: RecoilValue<T>) => getLoadable(state).getValue()
}

export function getTotalElementalEffects({
	damage,
	duration,
	modifier,
}: {
	damage: number
	duration: number
	modifier: number
}) {
	return {
		damage: Math.round(damage + damage * modifier),
		duration: Math.round(duration + duration * modifier),
	}
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangular(x: number) {
	return (x * (x + 1)) / 2
}
