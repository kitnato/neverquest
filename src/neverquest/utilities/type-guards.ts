import { Accessory, Armor, Shield, Weapon } from "neverquest/env";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// TODO
export function isAccessory(equipment: unknown): equipment is Accessory {
  return false;
}

export function isArmor(equipment: unknown): equipment is Armor {
  return isObject(equipment) && equipment.protection !== undefined;
}

export function isShield(equipment: unknown): equipment is Shield {
  return isObject(equipment) && equipment.block !== undefined;
}

export function isWeapon(equipment: unknown): equipment is Weapon {
  return isObject(equipment) && equipment.damage !== undefined;
}
