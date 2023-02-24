import { DAMAGE_BASE } from "@neverquest/constants";
import { ReactComponent as IconHide } from "@neverquest/icons/animal-hide.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/bullseye.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/crossed-slashes.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/fish-scales.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/gavel.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/metal-scales.svg";
import { ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { Armor, Shield, Weapon } from "@neverquest/types";
import { ArmorClass, SkillType, WeaponGrip } from "@neverquest/types/enums";
import { RangeProps, SVGIcon } from "@neverquest/types/props";

export const ARMOR_NONE: Armor = {
  name: "Unarmored",
  price: 0,
  protection: 0,
  scrapCost: 0,
  weight: 0,
};

export const ARMOR_ICONS: Record<ArmorClass, SVGIcon> = {
  [ArmorClass.Hide]: IconHide,
  [ArmorClass.Plate]: IconPlate,
  [ArmorClass.Reinforced]: IconReinforced,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  {
    deflectionChanceModifier: number;
    name: string;
    penalty: number;
    protectionModifier: number;
    staminaCostModifier: number;
    weight: number;
  }
> = {
  [ArmorClass.Hide]: {
    deflectionChanceModifier: 0,
    name: "Hide",
    penalty: 0,
    protectionModifier: 1.25,
    staminaCostModifier: 0,
    weight: 1,
  },
  [ArmorClass.Plate]: {
    deflectionChanceModifier: 2,
    name: "Plate",
    penalty: 1,
    protectionModifier: 3,
    staminaCostModifier: 1,
    weight: 3,
  },
  [ArmorClass.Reinforced]: {
    deflectionChanceModifier: 1,
    name: "Reinforced",
    penalty: 0,
    protectionModifier: 2,
    staminaCostModifier: 0,
    weight: 2,
  },
};

export const SHIELD_NONE: Shield = {
  blockChance: 0,
  name: "None",
  price: 0,
  scrapCost: 0,
  staggerChance: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldType,
  {
    blockRange: RangeProps;
    staggerModifier: number;
    staminaCostModifier: number;
    weight: number;
  }
> = {
  [ShieldType.Medium]: {
    blockRange: { maximum: 0.49, minimum: 0.25 },
    staggerModifier: 1.75,
    staminaCostModifier: 1.5,
    weight: 2,
  },
  [ShieldType.Small]: {
    blockRange: { maximum: 0.24, minimum: 0.1 },
    staggerModifier: 1.2,
    staminaCostModifier: 1,
    weight: 1,
  },
  [ShieldType.Tower]: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    staggerModifier: 2.5,
    staminaCostModifier: 2.5,
    weight: 3,
  },
};

export const WEAPON_ABILITY_NAME = {
  [WeaponClass.Blunt]: "Stagger",
  [WeaponClass.Piercing]: "Bleed",
  [WeaponClass.Slashing]: "Parry",
};

export const WEAPON_ICONS: Record<WeaponClass, SVGIcon> = {
  [WeaponClass.Blunt]: IconBlunt,
  [WeaponClass.Piercing]: IconPiercing,
  [WeaponClass.Slashing]: IconSlashing,
};

export const WEAPON_SKILL_TYPE = {
  [WeaponClass.Blunt]: SkillType.Stagger,
  [WeaponClass.Piercing]: SkillType.Bleed,
  [WeaponClass.Slashing]: SkillType.Parry,
};

export const WEAPON_NONE: Weapon = {
  abilityChance: 0,
  damage: DAMAGE_BASE,
  grip: WeaponGrip.OneHanded,
  name: "Unarmed",
  price: 0,
  rate: 2500,
  scrapCost: 0,
  staminaCost: 0,
  type: WeaponType.Melee,
  weaponClass: WeaponClass.Blunt,
  weight: 0,
};
