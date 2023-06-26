import { CONSUMABLES, TRINKETS } from "@neverquest/data/inventory";
import type {
  Armor,
  ConsumableItem,
  GearItem,
  Shield,
  TrinketItem,
  Weapon,
} from "@neverquest/types";

export function isArmor(gear: unknown): gear is Armor {
  return isObject(gear) && gear.protection !== undefined;
}

export function isConsumable(consumable: unknown): consumable is ConsumableItem {
  return isObject(consumable) && Object.keys(CONSUMABLES).some((type) => type === consumable.type);
}

export function isGear(gear: unknown): gear is GearItem {
  return isObject(gear) && (isArmor(gear) || isShield(gear) || isWeapon(gear));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isShield(gear: unknown): gear is Shield {
  return isObject(gear) && gear.block !== undefined;
}

export function isTrinket(trinket: unknown): trinket is TrinketItem {
  return isObject(trinket) && Object.keys(TRINKETS).some((type) => type === trinket.type);
}

export function isWeapon(gear: unknown): gear is Weapon {
  return isObject(gear) && gear.damage !== undefined;
}
