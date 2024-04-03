import {
	ARMOR_CLASS_TYPES,
	SHIELD_CLASS_TYPES,
	WEAPON_CLASS_TYPES,
} from "@kitnato/locran/build/types"
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear"
import type {
	Armor,
	ConsumableItem,
	GearItem,
	GearItemBase,
	GemItem,
	GeneratorRange,
	InfusableItem,
	InheritableItem,
	ItemBase,
	Melee,
	Ranged,
	RelicItem,
	Shield,
	StackableItem,
	Weapon,
	WeaponBase,
} from "@neverquest/types"
import {
	CONQUEST_TYPES,
	CONSUMABLE_TYPES,
	type Conquest,
	FINALITY_TYPES,
	type Finality,
	GEAR_TYPES,
	GEM_TYPES,
	GRIP_TYPES,
	type Gear,
	INFUSABLE_TYPES,
	QUEST_BONUS_TYPES,
	type QuestBonus,
	RELIC_TYPES,
	ROUTINE_TYPES,
	type Routine,
} from "@neverquest/types/unions"

export function isArmor(thing: unknown): thing is Armor {
	return (
		isGearItemBase(thing)
		&& "burden" in thing
		&& typeof thing.burden === "number"
		&& "deflectionChance" in thing
		&& typeof thing.burden === "number"
		&& "gearClass" in thing
		&& typeof thing.gearClass === "string"
		&& new Set<string>(ARMOR_CLASS_TYPES).has(thing.gearClass)
		&& "protection" in thing
		&& typeof thing.protection === "number"
	)
}

export function isConquest(thing: unknown): thing is Conquest {
	return typeof thing === "string" && new Set<string>(CONQUEST_TYPES).has(thing)
}

export function isConsumableItem(thing: unknown): thing is ConsumableItem {
	return isItem(thing) && new Set<string>(CONSUMABLE_TYPES).has(thing.name)
}

export function isFinality(thing: unknown): thing is Finality {
	return typeof thing === "string" && new Set<string>(FINALITY_TYPES).has(thing)
}

export function isGear(thing: unknown): thing is Gear {
	return typeof thing === "string" && new Set<string>(GEAR_TYPES).has(thing)
}

function isGearItemBase(thing: unknown): thing is GearItemBase {
	return isItem(thing) && "level" in thing && typeof thing.level === "number"
}

export function isGearItem(thing: unknown): thing is GearItem {
	return isArmor(thing) || isShield(thing) || isWeapon(thing)
}

export function isGemItem(thing: unknown): thing is GemItem {
	return isItem(thing) && new Set<string>(GEM_TYPES).has(thing.name)
}

function isGeneratorRange(thing: unknown): thing is GeneratorRange {
	return (
		isValidObject(thing)
		&& "maximum" in thing
		&& typeof thing.maximum === "number"
		&& "minimum" in thing
		&& typeof thing.minimum === "number"
	)
}

export function isInheritableItem(thing: unknown): thing is InheritableItem {
	return isInfusableItem(thing) || isRelicItem(thing)
}

export function isInfusableItem(thing: unknown): thing is InfusableItem {
	return (
		isItem(thing)
		&& "effect" in thing
		&& isGeneratorRange(thing.effect)
		&& new Set<string>(INFUSABLE_TYPES).has(thing.name)
	)
}

function isItem(thing: unknown): thing is ItemBase & { name: string } {
	return (
		isValidObject(thing)
		&& "ID" in thing
		&& typeof thing.ID === "string"
		&& "name" in thing
		&& typeof thing.name === "string"
		&& "price" in thing
		&& typeof thing.price === "number"
		&& "weight" in thing
		&& typeof thing.weight === "number"
	)
}

export function isMelee(thing: unknown): thing is Melee {
	return (
		isWeaponBase(thing)
		&& "grip" in thing
		&& typeof thing.grip === "string"
		&& new Set<string>(GRIP_TYPES).has(thing.grip)
	)
}

function isValidObject(thing: unknown): thing is Record<string, unknown> {
	return typeof thing === "object" && thing !== null && Object.keys(thing).length > 0
}

export function isQuestBonus(thing: unknown): thing is QuestBonus {
	return typeof thing === "string" && new Set<string>(QUEST_BONUS_TYPES).has(thing)
}

export function isRanged(thing: unknown): thing is Ranged {
	return (
		isWeaponBase(thing)
		&& "munitionsCost" in thing
		&& typeof thing.munitionsCost === "number"
		&& "range" in thing
		&& typeof thing.range === "number"
	)
}

export function isRelicItem(thing: unknown): thing is RelicItem {
	return (
		isItem(thing)
		&& "name" in thing
		&& typeof thing.name === "string"
		&& new Set<string>(RELIC_TYPES).has(thing.name)
	)
}

export function isRoutine(thing: unknown): thing is Routine {
	return typeof thing === "string" && new Set<string>(ROUTINE_TYPES).has(thing)
}

export function isShield(thing: unknown): thing is Shield {
	return (
		isGearItemBase(thing)
		&& "blockChance" in thing
		&& typeof thing.blockChance === "number"
		&& "burden" in thing
		&& typeof thing.burden === "number"
		&& "gearClass" in thing
		&& typeof thing.gearClass === "string"
		&& new Set<string>(SHIELD_CLASS_TYPES).has(thing.gearClass)
		&& "staggerChance" in thing
		&& typeof thing.staggerChance === "number"
	)
}

export function isStackableItem(thing: unknown): thing is StackableItem {
	return isConsumableItem(thing) || isGemItem(thing)
}

export function isUnarmed(thing: unknown): thing is typeof WEAPON_NONE {
	return thing === WEAPON_NONE
}

export function isUnarmored(thing: unknown): thing is typeof ARMOR_NONE {
	return thing === ARMOR_NONE
}

export function isUnshielded(thing: unknown): thing is typeof SHIELD_NONE {
	return thing === SHIELD_NONE
}

export function isWeapon(thing: unknown): thing is Weapon {
	return isMelee(thing) || isRanged(thing)
}

function isWeaponBase(thing: unknown): thing is WeaponBase {
	return (
		isGearItemBase(thing)
		&& "abilityChance" in thing
		&& typeof thing.abilityChance === "number"
		&& "burden" in thing
		&& typeof thing.burden === "number"
		&& "damage" in thing
		&& typeof thing.damage === "number"
		&& "gearClass" in thing
		&& typeof thing.gearClass === "string"
		&& new Set<string>(WEAPON_CLASS_TYPES).has(thing.gearClass)
		&& "rate" in thing
		&& typeof thing.rate === "number"
	)
}
