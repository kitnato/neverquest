import { Armor, Shield, Trinket, Weapon } from "neverquest/types/core";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isArmor(equipment: unknown): equipment is Armor {
  return isObject(equipment) && equipment.protection !== undefined;
}

export function isShield(equipment: unknown): equipment is Shield {
  return isObject(equipment) && equipment.block !== undefined;
}

// TODO
export function isTrinket(equipment: unknown): equipment is Trinket {
  return false;
}

export function isWeapon(equipment: unknown): equipment is Weapon {
  return isObject(equipment) && equipment.damage !== undefined;
}
