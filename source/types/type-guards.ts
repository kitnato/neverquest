import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import type {
  Armor,
  ConsumableItem,
  GearItem,
  GemItem,
  InfusableItem,
  InheritableItem,
  Melee,
  Ranged,
  Shield,
  StackableItem,
  TrinketItem,
  Weapon,
} from "@neverquest/types";
import {
  CONQUEST_TYPES,
  CONSUMABLE_TYPES,
  type Conquest,
  FINALITY_TYPES,
  type Finality,
  GEAR_TYPES,
  GEM_TYPES,
  GRIP_TYPES,
  type Gear,
  INFUSABLE_TYPES,
  QUEST_BONUS_TYPES,
  type QuestBonus,
  ROUTINE_TYPES,
  type Routine,
  TRINKET_TYPES,
} from "@neverquest/types/unions";

export function isArmor(thing: unknown): thing is Armor {
  return isObject(thing) && typeof thing.protection === "number";
}

export function isConquest(thing: unknown): thing is Conquest {
  return typeof thing === "string" && new Set<string>(CONQUEST_TYPES).has(thing);
}

export function isConsumableItem(thing: unknown): thing is ConsumableItem {
  return (
    isObject(thing) &&
    typeof thing.name === "string" &&
    new Set<string>(CONSUMABLE_TYPES).has(thing.name)
  );
}

export function isFinality(thing: unknown): thing is Finality {
  return typeof thing === "string" && new Set<string>(FINALITY_TYPES).has(thing);
}

export function isGear(thing: unknown): thing is Gear {
  return typeof thing === "string" && new Set<string>(GEAR_TYPES).has(thing);
}

export function isGearItem(thing: unknown): thing is GearItem {
  return isObject(thing) && (isArmor(thing) || isShield(thing) || isWeapon(thing));
}

export function isGemItem(thing: unknown): thing is GemItem {
  return (
    isObject(thing) && typeof thing.name === "string" && new Set<string>(GEM_TYPES).has(thing.name)
  );
}

export function isInheritableItem(thing: unknown): thing is InheritableItem {
  return isInfusableItem(thing) || isTrinketItem(thing);
}

export function isInfusableItem(thing: unknown): thing is InfusableItem {
  return (
    isObject(thing) &&
    typeof thing.name === "string" &&
    new Set<string>(INFUSABLE_TYPES).has(thing.name)
  );
}

function isObject(thing: unknown): thing is Record<string, unknown> {
  return typeof thing === "object" && thing !== null && Object.keys(thing).length > 0;
}

export function isMelee(thing: unknown): thing is Melee {
  return (
    isObject(thing) && typeof thing.grip === "string" && new Set<string>(GRIP_TYPES).has(thing.grip)
  );
}

export function isQuestBonus(thing: unknown): thing is QuestBonus {
  return typeof thing === "string" && new Set<string>(QUEST_BONUS_TYPES).has(thing);
}

export function isRanged(thing: unknown): thing is Ranged {
  return isObject(thing) && typeof thing.range === "number";
}

export function isRoutine(thing: unknown): thing is Routine {
  return typeof thing === "string" && new Set<string>(ROUTINE_TYPES).has(thing);
}

export function isShield(thing: unknown): thing is Shield {
  return isObject(thing) && typeof thing.block === "number";
}

export function isStackableItem(thing: unknown): thing is StackableItem {
  return isConsumableItem(thing) || isGemItem(thing);
}

export function isTrinketItem(thing: unknown): thing is TrinketItem {
  return (
    isObject(thing) &&
    typeof thing.name === "string" &&
    new Set<string>(TRINKET_TYPES).has(thing.name)
  );
}

export function isUnarmed(thing: unknown): thing is typeof WEAPON_NONE {
  return isGearItem(thing) && thing.ID === WEAPON_NONE.ID;
}

export function isUnarmored(thing: unknown): thing is typeof ARMOR_NONE {
  return isGearItem(thing) && thing.ID === ARMOR_NONE.ID;
}

export function isUnshielded(thing: unknown): thing is typeof SHIELD_NONE {
  return isGearItem(thing) && thing.ID === SHIELD_NONE.ID;
}

export function isWeapon(thing: unknown): thing is Weapon {
  return isMelee(thing) || isRanged(thing);
}
