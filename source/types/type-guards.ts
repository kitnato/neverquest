import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import type {
  Armor,
  ConsumableItem,
  GearItem,
  GemItem,
  GeneratorRange,
  InfusableItem,
  Melee,
  Ranged,
  Shield,
  StackableItem,
  TrinketItem,
  UsableItem,
  Weapon,
} from "@neverquest/types";
import {
  CONQUEST_TYPES,
  CONSUMABLE_TYPES,
  type Conquest,
  type Consumable,
  GEM_TYPES,
  GRIP_TYPES,
  type Gem,
  type Grip,
  INFUSABLE_TYPES,
  type Infusable,
  ROUTINE_TYPES,
  type Routine,
  TRINKET_TYPES,
  type Trinket,
} from "@neverquest/types/unions";

export function isArmor(thing: unknown): thing is Armor {
  return isObject(thing) && typeof thing.protection === "number";
}

export function isConquest(thing: unknown): thing is Conquest {
  return typeof thing === "string" && new Set<string>(CONQUEST_TYPES).has(thing);
}

export function isConsumableItem(thing: unknown): thing is ConsumableItem {
  return isObject(thing) && CONSUMABLE_TYPES.includes(thing.name as Consumable);
}

export function isGearItem(thing: unknown): thing is GearItem {
  return isObject(thing) && (isArmor(thing) || isShield(thing) || isWeapon(thing));
}

export function isGem(thing: unknown): thing is Gem {
  return typeof thing === "string" && new Set<string>(GEM_TYPES).has(thing);
}

export function isGemItem(thing: unknown): thing is GemItem {
  return isObject(thing) && GEM_TYPES.includes(thing.name as Gem);
}

export function isGeneratorRange(thing: unknown): thing is GeneratorRange {
  return isObject(thing) && typeof thing.minimum === "number" && typeof thing.maximum === "number";
}

export function isGeneratorRanges(thing: unknown): thing is [GeneratorRange, GeneratorRange] {
  return Array.isArray(thing) && isGeneratorRange(thing[0]) && isGeneratorRange(thing[1]);
}

export function isInfusable(thing: unknown): thing is Infusable {
  return typeof thing === "string" && new Set<string>(INFUSABLE_TYPES).has(thing);
}

export function isInfusableItem(thing: unknown): thing is InfusableItem {
  return isObject(thing) && isInfusable(thing.name);
}

function isObject(thing: unknown): thing is Record<string, unknown> {
  return typeof thing === "object" && thing !== null && Object.keys(thing).length > 0;
}

export function isMelee(thing: unknown): thing is Melee {
  return isObject(thing) && GRIP_TYPES.includes(thing.grip as Grip);
}

export function isRanged(thing: unknown): thing is Ranged {
  return isObject(thing) && typeof thing.range === "number";
}

export function isRoutine(thing: unknown): thing is Routine {
  return typeof thing === "string" && new Set<string>(ROUTINE_TYPES).has(thing);
}

export function isShield(thing: unknown): thing is Shield {
  return isObject(thing) && typeof thing.block === "number";
}

export function isStackableItem(thing: unknown): thing is StackableItem {
  return isConsumableItem(thing) || isGemItem(thing);
}

export function isTrinket(thing: unknown): thing is Trinket {
  return typeof thing === "string" && new Set<string>(TRINKET_TYPES).has(thing);
}

export function isTrinketItem(thing: unknown): thing is TrinketItem {
  return isObject(thing) && isTrinket(thing.name);
}

export function isUnarmed(thing: unknown): thing is typeof WEAPON_NONE {
  return isObject(thing) && thing.ID === WEAPON_NONE.ID;
}

export function isUnarmored(thing: unknown): thing is typeof ARMOR_NONE {
  return isObject(thing) && thing.ID === ARMOR_NONE.ID;
}

export function isUnshielded(thing: unknown): thing is typeof SHIELD_NONE {
  return isObject(thing) && thing.ID === SHIELD_NONE.ID;
}

export function isUsableItem(thing: unknown): thing is UsableItem {
  return isInfusableItem(thing) || isTrinketItem(thing);
}

export function isWeapon(thing: unknown): thing is Weapon {
  return isMelee(thing) || isRanged(thing);
}
