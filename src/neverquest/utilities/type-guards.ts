import { Armor, Gear, Item, Shield, Trinket, Weapon } from "neverquest/types/core";

export function isArmor(gear: unknown): gear is Armor {
  return isObject(gear) && gear.protection !== undefined;
}

export function isGear(gear: unknown): gear is Gear {
  return isObject(gear) && (isArmor(gear) || isShield(gear) || isTrinket(gear) || isWeapon(gear));
}

export function isItem(item: unknown): item is Item {
  return isObject(item) && item.isPortable !== undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isShield(gear: unknown): gear is Shield {
  return isObject(gear) && gear.block !== undefined;
}

// TODO
export function isTrinket(gear: unknown): gear is Trinket {
  return false;
}

export function isWeapon(gear: unknown): gear is Weapon {
  return isObject(gear) && gear.damage !== undefined;
}
