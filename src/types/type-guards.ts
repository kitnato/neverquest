import type { Armor, Gear, Shield, Trinket, Weapon } from "@neverquest/types";

export function isArmor(gear: unknown): gear is Armor {
  return isObject(gear) && gear.protection !== undefined;
}

export function isGear(gear: unknown): gear is Gear {
  return isObject(gear) && (isArmor(gear) || isShield(gear) || isWeapon(gear));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isShield(gear: unknown): gear is Shield {
  return isObject(gear) && gear.blockChance !== undefined;
}

export function isTrinket(trinket: unknown): trinket is Trinket {
  return isObject(trinket) && trinket.isPortable !== undefined;
}

export function isWeapon(gear: unknown): gear is Weapon {
  return isObject(gear) && gear.damage !== undefined;
}
