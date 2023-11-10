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
  GEM_TYPES,
  INFUSABLE_TYPES,
  type Infusable,
  ROUTINE_TYPES,
  type Routine,
  TRINKET_TYPES,
  TRIUMPH_TYPES,
  type Trinket,
  type Triumph,
} from "@neverquest/types/unions";

export function isArmor(thing: unknown): thing is Armor {
  return isObject(thing) && typeof thing.protection === "number";
}

export function isConquest(thing: string): thing is Conquest {
  return CONQUEST_TYPES.some((current) => current === thing);
}

export function isConsumableItem(thing: unknown): thing is ConsumableItem {
  return isObject(thing) && CONSUMABLE_TYPES.some((current) => current === thing.name);
}

export function isGear(thing: unknown): thing is GearItem {
  return isObject(thing) && (isArmor(thing) || isShield(thing) || isWeapon(thing));
}

export function isGem(thing: unknown): thing is GemItem {
  return isObject(thing) && GEM_TYPES.some((current) => current === thing.name);
}

export function isGeneratorRange(thing: unknown): thing is GeneratorRange {
  return isObject(thing) && typeof thing.minimum === "number" && typeof thing.maximum === "number";
}

export function isGeneratorRanges(thing: unknown): thing is [GeneratorRange, GeneratorRange] {
  return Array.isArray(thing) && isGeneratorRange(thing[0]) && isGeneratorRange(thing[1]);
}

export function isInfusable(thing: string): thing is Infusable {
  return INFUSABLE_TYPES.some((current) => current === thing);
}

export function isInfusableItem(thing: unknown): thing is InfusableItem {
  return isObject(thing) && INFUSABLE_TYPES.some((current) => current === thing.name);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isMelee(thing: unknown): thing is Melee {
  return isObject(thing) && typeof thing.grip === "string";
}

export function isRanged(thing: unknown): thing is Ranged {
  return isObject(thing) && typeof thing.range === "number";
}

export function isRoutine(thing: string): thing is Routine {
  return ROUTINE_TYPES.some((current) => current === thing);
}

export function isShield(thing: unknown): thing is Shield {
  return isObject(thing) && typeof thing.block === "number";
}

export function isStackable(thing: unknown): thing is StackableItem {
  return isConsumableItem(thing) || isGem(thing);
}

export function isTrinket(thing: string): thing is Trinket {
  return TRINKET_TYPES.some((current) => current === thing);
}

export function isTrinketItem(thing: unknown): thing is TrinketItem {
  return isObject(thing) && TRINKET_TYPES.some((current) => current === thing.name);
}

export function isTriumph(thing: string): thing is Triumph {
  return TRIUMPH_TYPES.some((current) => current === thing);
}

export function isUsable(thing: unknown): thing is UsableItem {
  return isInfusableItem(thing) || isTrinketItem(thing);
}

export function isWeapon(thing: unknown): thing is Weapon {
  return isMelee(thing) || isRanged(thing);
}
