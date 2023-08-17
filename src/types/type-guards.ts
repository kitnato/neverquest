import type {
  Armor,
  ConsumableItem,
  GearItem,
  ShardItem,
  Shield,
  TrinketItem,
  Weapon,
} from "@neverquest/types";
import { CONSUMABLE_TYPES, SHARD_TYPES, TRINKET_TYPES } from "@neverquest/types/unions";

export function isArmor(gear: unknown): gear is Armor {
  return isObject(gear) && gear.protection !== undefined;
}

export function isConsumable(consumable: unknown): consumable is ConsumableItem {
  return isObject(consumable) && CONSUMABLE_TYPES.some((type) => type === consumable.type);
}

export function isGear(gear: unknown): gear is GearItem {
  return isObject(gear) && (isArmor(gear) || isShield(gear) || isWeapon(gear));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isShard(shard: unknown): shard is ShardItem {
  return isObject(shard) && SHARD_TYPES.some((type) => type === shard.type);
}

export function isShield(gear: unknown): gear is Shield {
  return isObject(gear) && gear.block !== undefined;
}

export function isStackable(stackable: unknown): stackable is ConsumableItem | ShardItem {
  return isConsumable(stackable) || isShard(stackable);
}

export function isTrinket(trinket: unknown): trinket is TrinketItem {
  return isObject(trinket) && TRINKET_TYPES.some((type) => type === trinket.type);
}

export function isWeapon(gear: unknown): gear is Weapon {
  return isObject(gear) && gear.damage !== undefined;
}
