import { ShieldType, WeaponType } from "locra/env";
import {
  Armor,
  ArmorWeight,
  Accessory,
  Shield,
  Weapon,
  WeaponWeight,
  RandomizedRange,
} from "neverquest/env";

export const ANIMATE_PREFIX = "animate__";
export const ANIMATED_CLASS = `${ANIMATE_PREFIX}animated`;

export const ARMOR_SPECIFICATIONS: Record<
  ArmorWeight,
  { encumbrance: number; protectionModifier: number }
> = {
  [ArmorWeight.Light]: {
    encumbrance: 1,
    protectionModifier: 1.25,
  },
  [ArmorWeight.Reinforced]: {
    encumbrance: 2,
    protectionModifier: 2,
  },
  [ArmorWeight.Plate]: {
    encumbrance: 3,
    protectionModifier: 3,
  },
};

export const DELTA_DEFAULT = {
  color: null,
  value: "",
};

export const NO_ACCESSORY: Accessory = {
  encumbrance: 0,
  name: "None",
  price: 0,
};

export const NO_ARMOR: Armor = {
  encumbrance: 0,
  name: "Unarmored",
  price: 0,
  protection: 0,
};

export const NO_SHIELD: Shield = {
  block: 0,
  encumbrance: 0,
  name: "None",
  price: 0,
  stagger: 0,
};

export const NO_WEAPON: Weapon = {
  damage: 1,
  encumbrance: 0,
  name: "Unarmed",
  price: 0,
  rate: 3000,
  staminaCost: 0,
  type: WeaponType.Melee,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldType,
  { blockRange: RandomizedRange; encumbrance: number; staggerModifier: number }
> = {
  [ShieldType.Small]: {
    blockRange: { minimum: 0.1, maximum: 0.25 },
    encumbrance: 1,
    staggerModifier: 1.25,
  },
  [ShieldType.Medium]: {
    blockRange: { minimum: 0.25, maximum: 0.5 },
    encumbrance: 2,
    staggerModifier: 1.75,
  },
  [ShieldType.Tower]: {
    blockRange: { minimum: 0.5, maximum: 0.75 },
    encumbrance: 3,
    staggerModifier: 2.5,
  },
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const UNKNOWN = "???";

export const WEAPON_SPECIFICATIONS: Record<
  WeaponWeight,
  { damageModifier: number; encumbrance: number; rateRange: RandomizedRange; staminaCost: number }
> = {
  [WeaponWeight.Light]: {
    damageModifier: 1.25,
    encumbrance: 1,
    rateRange: { minimum: 3000, maximum: 3500 },
    staminaCost: 1,
  },
  [WeaponWeight.Balanced]: {
    damageModifier: 2,
    encumbrance: 2,
    rateRange: { minimum: 3400, maximum: 4000 },
    staminaCost: 2,
  },
  [WeaponWeight.Heavy]: {
    damageModifier: 3,
    encumbrance: 3,
    rateRange: { minimum: 3900, maximum: 4500 },
    staminaCost: 3,
  },
  [WeaponWeight.TwoHanded]: {
    damageModifier: 4,
    encumbrance: 4,
    rateRange: { minimum: 4000, maximum: 5000 },
    staminaCost: 3,
  },
};
