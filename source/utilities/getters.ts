import { nanoid } from "nanoid"

import { ATTRIBUTE_COST_BASE } from "@neverquest/data/attributes"
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
	AFFIX_STRUCTURE_WEIGHTS,
	CLASS_ANIMATED,
	CLASS_ANIMATE_PREFIX,
	GENERIC_MINIMUM,
	LEVELLING_END,
	LEVELLING_MAXIMUM,
	MILLISECONDS_IN_SECOND,
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
import { QUESTS, QUEST_TYPES_BY_CLASS } from "@neverquest/data/quests"
import { PERKS } from "@neverquest/data/retirement"
import IconArmorNone from "@neverquest/icons/armor-none.svg?react"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconOneHanded from "@neverquest/icons/one-handed.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconShieldNone from "@neverquest/icons/shield-none.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import IconWeaponNone from "@neverquest/icons/weapon-none.svg?react"
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
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

import type {
	AffixStructure,
	ArmorClass,
	ShieldClass,
	WeaponClass,
} from "@kitnato/locran/build/types"
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
import type { Animation, AnimationSpeed } from "@neverquest/types/general"
import type { Elemental, Grip, Perk, Quest, QuestClass } from "@neverquest/types/unions"
import type { RecoilValue, Snapshot } from "recoil"

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
			const factor = getExponential((amount - 1) / (GEMS_MAXIMUM - 1))

			effects[elemental] = {
				damage: Math.max(
					Math.round(
						(armorEffect ? gear.level : gear.damage) * getFromRange({
							factor,
							...armorEffect ? damageArmor : damageWeapon,
						}),
					),
					GENERIC_MINIMUM,
				),
				duration: Math.round(
					getFromRange({
						factor,
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
			factor: getExponential((amount - 1) / (GEMS_MAXIMUM - 1)),
			...GEM_ENHANCEMENT_RANGE,
		})
	}

	return effects
}

// f(0) = 0, f(0.25) = ~0.047, f(0.5) = ~0.21, f(0.75) = ~0.51, f(1+) = 1
export function getExponential(x: number) {
	if (x === 0) {
		return 0
	}

	if (x >= 1) {
		return 1
	}

	return Math.pow(Math.E, 0.6935 * x) * x - x
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
			? gearItem.grip === "one-handed"
				? IconOneHanded
				: IconTwoHanded
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
		: ((stage - offset) * (LEVELLING_END - 1)) / (LEVELLING_END - offset - 1) + 1
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

export function getQuestData(quest: Quest): [QuestData, ...QuestData[]] {
	const { description, hidden, progression, title } = QUESTS[quest]

	return progression.map((progress, index) => ({
		description: description.replace("@", formatNumber({ value: progress })),
		hidden,
		ID: nanoid(),
		progressionIndex: index,
		progressionMaximum: progress,
		quest,
		questClass: isConquest(quest) ? "conquest" : isRoutine(quest) ? "routine" : "triumph",
		title: `${title}${progression.length > 1 ? ` ${getRomanNumeral(index + 1)}` : ""}`,
	})) as [QuestData, ...QuestData[]]
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

export function getPerkEffect({
	generation,
	perk,
}: {
	generation: number
	perk: Perk
}) {
	const { generationMaximum, maximum, minimum } = PERKS[perk]
	const increasableGenerations = generationMaximum - 2

	if (generation === 1) {
		return 0
	}

	return getFromRange({
		factor: Math.min(generation - 2, increasableGenerations) / increasableGenerations,
		maximum,
		minimum,
	})
}

export function getQuestClass(quest: Quest): QuestClass {
	const { conquest, routine } = QUEST_TYPES_BY_CLASS

	if (conquest.some(currentQuest => currentQuest === quest)) {
		return "conquest"
	}

	if (routine.some(currentQuest => currentQuest === quest)) {
		return "routine"
	}

	return "triumph"
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

export function getSecondHandPrice({ gemsFitted, item }: { gemsFitted?: number, item: InventoryItem }) {
	const { price } = item
	let supplement = 0

	if (isGearItem(item) && gemsFitted !== undefined) {
		supplement += (
			getSecondHandPrice({
				item: {
					...GEM_BASE,
					ID: nanoid(),
					name: "ruby",
				},
			}) * gemsFitted
		) / 3
	}

	return Math.round(
		Math.max(
			price / (isGearItem(item) ? 4 : 2),
			GENERIC_MINIMUM,
		) + supplement)
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
// f(0) = 0, f(37) = ~0.28, f(50) = ~0.73, f(75+) = 1
export function getSigmoid(x: number) {
	if (x === 0) {
		return 0
	}

	if (x >= LEVELLING_MAXIMUM) {
		return 1
	}

	return (Math.tanh(x / 13 - 3) + 1) / 2
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
		damage: Math.round(damage * (1 + modifier)),
		duration: Math.round(duration * (1 + modifier)),
	}
}

// https://en.wikipedia.org/wiki/Triangular_number
export function getTriangular(n: number) {
	return (n * (n + 1)) / 2
}
