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
  TrinketItemInfusable,
  Weapon,
} from "@neverquest/types";
import { CONSUMABLE_TYPES, GEM_TYPES, TRINKET_TYPES } from "@neverquest/types/unions";

export function isArmor(unknown: unknown): unknown is Armor {
  return isObject(unknown) && typeof unknown.protection === "number";
}

export function isConsumable(unknown: unknown): unknown is ConsumableItem {
  return isObject(unknown) && CONSUMABLE_TYPES.some((current) => current === unknown.name);
}

export function isGear(unknown: unknown): unknown is GearItem {
  return isObject(unknown) && (isArmor(unknown) || isShield(unknown) || isWeapon(unknown));
}

export function isGem(unknown: unknown): unknown is GemItem {
  return isObject(unknown) && GEM_TYPES.some((current) => current === unknown.name);
}

export function isGeneratorRange(unknown: unknown): unknown is GeneratorRange {
  return (
    isObject(unknown) && typeof unknown.minimum === "number" && typeof unknown.maximum === "number"
  );
}

export function isGeneratorRanges(unknown: unknown): unknown is [GeneratorRange, GeneratorRange] {
  return Array.isArray(unknown) && isGeneratorRange(unknown[0]) && isGeneratorRange(unknown[1]);
}

export function isInfusable(unknown: unknown): unknown is TrinketItemInfusable {
  return isObject(unknown) && typeof unknown.level === "string";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isMelee(unknown: unknown): unknown is Melee {
  return isObject(unknown) && typeof unknown.grip === "string";
}

export function isRanged(unknown: unknown): unknown is Ranged {
  return isObject(unknown) && typeof unknown.range === "number";
}

export function isShield(unknown: unknown): unknown is Shield {
  return isObject(unknown) && typeof unknown.block === "number";
}

export function isStackable(unknown: unknown): unknown is StackableItem {
  return isConsumable(unknown) || isGem(unknown);
}

export function isTrinket(unknown: unknown): unknown is TrinketItem {
  return isObject(unknown) && TRINKET_TYPES.some((current) => current === unknown.name);
}

export function isWeapon(unknown: unknown): unknown is Weapon {
  return isMelee(unknown) || isRanged(unknown);
}
