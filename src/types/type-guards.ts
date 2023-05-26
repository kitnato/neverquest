import {
  type Armor,
  type Gear,
  type Shield,
  TRINKET_NAMES,
  type Trinket,
  type Weapon,
} from "@neverquest/types";

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
  return isObject(gear) && gear.block !== undefined;
}

export function isTrinket(trinket: unknown): trinket is Trinket {
  return isObject(trinket) && TRINKET_NAMES.some((name) => name === trinket.name);
}

export function isWeapon(gear: unknown): gear is Weapon {
  return isObject(gear) && gear.damage !== undefined;
}
