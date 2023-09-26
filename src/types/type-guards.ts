import type {
  Armor,
  ConsumableItem,
  GearItem,
  GemItem,
  GeneratorRange,
  Melee,
  Ranged,
  Shield,
  StackableItem,
  TrinketItem,
  Weapon,
} from "@neverquest/types";
import { CONSUMABLE_TYPES, GEM_TYPES, TRINKET_TYPES } from "@neverquest/types/unions";

export function isArmor(gearItem: unknown): gearItem is Armor {
  return isObject(gearItem) && typeof gearItem.protection === "number";
}

export function isConsumable(consumable: unknown): consumable is ConsumableItem {
  return isObject(consumable) && CONSUMABLE_TYPES.some((type) => type === consumable.type);
}

export function isGear(gearItem: unknown): gearItem is GearItem {
  return isObject(gearItem) && (isArmor(gearItem) || isShield(gearItem) || isWeapon(gearItem));
}

export function isGem(gem: unknown): gem is GemItem {
  return isObject(gem) && GEM_TYPES.some((type) => type === gem.type);
}

export function isGeneratorRange(range: unknown): range is GeneratorRange {
  return isObject(range) && typeof range.minimum === "number" && typeof range.maximum === "number";
}

export function isGeneratorRanges(ranges: unknown): ranges is [GeneratorRange, GeneratorRange] {
  return Array.isArray(ranges) && isGeneratorRange(ranges[0]) && isGeneratorRange(ranges[1]);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isMelee(gearItem: unknown): gearItem is Melee {
  return isObject(gearItem) && typeof gearItem.grip === "string";
}

export function isRanged(gearItem: unknown): gearItem is Ranged {
  return isObject(gearItem) && typeof gearItem.range === "number";
}

export function isShield(gearItem: unknown): gearItem is Shield {
  return isObject(gearItem) && typeof gearItem.block === "number";
}

export function isStackable(stackable: unknown): stackable is StackableItem {
  return isConsumable(stackable) || isGem(stackable);
}

export function isTrinket(trinket: unknown): trinket is TrinketItem {
  return isObject(trinket) && TRINKET_TYPES.some((type) => type === trinket.type);
}

export function isWeapon(gearItem: unknown): gearItem is Weapon {
  return isMelee(gearItem) || isRanged(gearItem);
}
