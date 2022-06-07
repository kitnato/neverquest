import { Armor, Equipment, Item, Shield, Trinket, Weapon } from "neverquest/types/core";

export function isArmor(equipment: unknown): equipment is Armor {
  return isObject(equipment) && equipment.protection !== undefined;
}

export function isEnum<T>(token: unknown, type: T): token is T {
  return Object.values(type).includes(token as T);
}

export function isEquipment(equipment: unknown): equipment is Equipment {
  return (
    isObject(equipment) &&
    (isArmor(equipment) || isShield(equipment) || isTrinket(equipment) || isWeapon(equipment))
  );
}

export function isItem(item: unknown): item is Item {
  return isObject(item) && item.isCarriable !== undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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
