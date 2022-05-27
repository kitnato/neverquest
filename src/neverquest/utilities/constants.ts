import { ShieldType, WeaponType } from "locra/types";
import { Armor, ArmorClass, Shield, Trinket, Weapon, WeaponClass } from "neverquest/types/core";
import { RangeProps } from "neverquest/types/props";

export const ANIMATE_PREFIX = "animate__";
export const ANIMATED_CLASS = `${ANIMATE_PREFIX}animated`;

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  { protectionModifier: number; weight: number }
> = {
  [ArmorClass.Light]: {
    protectionModifier: 1.25,
    weight: 1,
  },
  [ArmorClass.Plate]: {
    protectionModifier: 3,
    weight: 3,
  },
  [ArmorClass.Reinforced]: {
    protectionModifier: 2,
    weight: 2,
  },
};

export const DELTA_DEFAULT = {
  color: null,
  value: "",
};

export const NO_ARMOR: Armor = {
  name: "Unarmored",
  price: 0,
  protection: 0,
  weight: 0,
};

export const NO_SHIELD: Shield = {
  block: 0,
  name: "None",
  price: 0,
  stagger: 0,
  staminaCost: 0,
  weight: 0,
};

export const NO_TRINKET: Trinket = {
  name: "None",
  price: 0,
  weight: 0,
};

export const NO_WEAPON: Weapon = {
  damage: 1,
  name: "Unarmed",
  price: 0,
  rate: 3000,
  staminaCost: 0,
  type: WeaponType.Melee,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldType,
  { blockRange: RangeProps; staggerModifier: number; staminaCost: number; weight: number }
> = {
  [ShieldType.Medium]: {
    blockRange: { minimum: 0.25, maximum: 0.5 },
    staggerModifier: 1.75,
    staminaCost: 2,
    weight: 2,
  },
  [ShieldType.Small]: {
    blockRange: { minimum: 0.1, maximum: 0.25 },
    staggerModifier: 1.25,
    staminaCost: 1,
    weight: 1,
  },
  [ShieldType.Tower]: {
    blockRange: { minimum: 0.5, maximum: 0.75 },
    staggerModifier: 2.5,
    staminaCost: 3,
    weight: 3,
  },
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const UNKNOWN = "???";

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  { damageModifier: number; rateRange: RangeProps; staminaCost: number; weight: number }
> = {
  [WeaponClass.Balanced]: {
    damageModifier: 2,
    rateRange: { minimum: 3400, maximum: 4000 },
    staminaCost: 2,
    weight: 2,
  },
  [WeaponClass.Heavy]: {
    damageModifier: 3,
    rateRange: { minimum: 3900, maximum: 4500 },
    staminaCost: 3,
    weight: 3,
  },
  [WeaponClass.Light]: {
    damageModifier: 1.25,
    rateRange: { minimum: 3000, maximum: 3500 },
    staminaCost: 1,
    weight: 1,
  },
  [WeaponClass.TwoHanded]: {
    damageModifier: 4,
    rateRange: { minimum: 4000, maximum: 5000 },
    staminaCost: 3,
    weight: 4,
  },
};
