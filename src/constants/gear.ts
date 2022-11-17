import { ReactComponent as IconPiercing } from "@neverquest/icons/bullseye.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/crossed-slashes.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/gavel.svg";
import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { Armor, Shield, Weapon } from "@neverquest/types";
import { ArmorClass, WeaponGrip } from "@neverquest/types/enums";
import { RangeProps } from "@neverquest/types/props";

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  { protectionModifier: number; weight: number }
> = {
  [ArmorClass.Hide]: {
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

export const NO_ARMOR: Armor = {
  name: "Unarmored",
  price: 0,
  protection: 0,
  weight: 0,
};

export const NO_SHIELD: Shield = {
  blockChance: 0,
  name: "None",
  price: 0,
  staggerChance: 0,
  staminaCost: 0,
  weight: 0,
};

export const NO_WEAPON: Weapon = {
  abilityChance: 0,
  damage: 1,
  grip: WeaponGrip.OneHanded,
  name: "Unarmed",
  price: 0,
  rate: 2500,
  staminaCost: 0,
  type: WeaponType.Melee,
  weaponClass: WeaponClass.Blunt,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldType,
  {
    blockRange: RangeProps;
    staggerModifier: number;
    staminaCost: number;
    weight: number;
  }
> = {
  [ShieldType.Medium]: {
    blockRange: { maximum: 0.5, minimum: 0.25 },
    staggerModifier: 1.75,
    staminaCost: 2,
    weight: 2,
  },
  [ShieldType.Small]: {
    blockRange: { maximum: 0.25, minimum: 0.1 },
    staggerModifier: 1.2,
    staminaCost: 1,
    weight: 1,
  },
  [ShieldType.Tower]: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    staggerModifier: 2.5,
    staminaCost: 3,
    weight: 3,
  },
};

export const WEAPON_CLASS_ICONS = {
  [WeaponClass.Blunt]: IconBlunt,
  [WeaponClass.Piercing]: IconPiercing,
  [WeaponClass.Slashing]: IconSlashing,
};
