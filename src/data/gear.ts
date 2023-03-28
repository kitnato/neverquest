import { ReactComponent as IconHide } from "@neverquest/icons/animal-hide.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/bullseye.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/crossed-slashes.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/fish-scales.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/gavel.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/metal-scales.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/round-shield.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/shoulder-armor.svg";
import { ArmorClass, ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { Armor, Range, Shield, Weapon } from "@neverquest/types";
import { SkillType, WeaponGrip } from "@neverquest/types/enums";
import { SVGIcon } from "@neverquest/types/props";

export const ARMOR_NONE: Armor = {
  coinPrice: 0,
  deflectionChance: 0,
  dodgeChanceModifier: 0,
  name: "Unarmored",
  protection: 0,
  scrapPrice: 0,
  staminaCost: 0,
  weight: 0,
};

export const ARMOR_CLASS_ICONS: Record<ArmorClass, SVGIcon> = {
  [ArmorClass.Hide]: IconHide,
  [ArmorClass.Plate]: IconPlate,
  [ArmorClass.Reinforced]: IconReinforced,
};

export const ARMOR_ICON = IconArmor;

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  {
    deflectionChanceModifier: number;
    dodgeChanceModifier: number;
    dodgeCostModifier: number;
    protectionModifier: number;
    weightModifier: number;
  }
> = {
  [ArmorClass.Hide]: {
    deflectionChanceModifier: 0,
    dodgeChanceModifier: 0,
    dodgeCostModifier: 0,
    protectionModifier: 0.5,
    weightModifier: 0.5,
  },
  [ArmorClass.Plate]: {
    deflectionChanceModifier: 1,
    dodgeChanceModifier: -1,
    dodgeCostModifier: 0,
    protectionModifier: 1,
    weightModifier: 1,
  },
  [ArmorClass.Reinforced]: {
    deflectionChanceModifier: 0.5,
    dodgeChanceModifier: 0,
    dodgeCostModifier: 1,
    protectionModifier: 0.75,
    weightModifier: 0.75,
  },
};

export const SHIELD_ICON = IconShield;

export const SHIELD_NONE: Shield = {
  blockChance: 0,
  coinPrice: 0,
  name: "None",
  scrapPrice: 0,
  staggerChance: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldType,
  {
    blockRange: Range;
    staggerModifier: number;
    staminaCostModifier: number;
    weightModifier: number;
  }
> = {
  [ShieldType.Medium]: {
    blockRange: { maximum: 0.49, minimum: 0.25 },
    staggerModifier: 0.75,
    staminaCostModifier: 0.75,
    weightModifier: 0.75,
  },
  [ShieldType.Small]: {
    blockRange: { maximum: 0.24, minimum: 0.1 },
    staggerModifier: 0.5,
    staminaCostModifier: 0.5,
    weightModifier: 0.5,
  },
  [ShieldType.Tower]: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    staggerModifier: 1,
    staminaCostModifier: 1,
    weightModifier: 1,
  },
};

export const WEAPON_ABILITY_NAME = {
  [WeaponClass.Blunt]: "Stagger",
  [WeaponClass.Piercing]: "Bleed",
  [WeaponClass.Slashing]: "Parry",
};

export const WEAPON_CLASS_ICONS: Record<WeaponClass, SVGIcon> = {
  [WeaponClass.Blunt]: IconBlunt,
  [WeaponClass.Piercing]: IconPiercing,
  [WeaponClass.Slashing]: IconSlashing,
};

export const WEAPON_ICON = IconWeapon;

export const WEAPON_SKILL_TYPE: Record<WeaponClass, SkillType> = {
  [WeaponClass.Blunt]: SkillType.Stagger,
  [WeaponClass.Piercing]: SkillType.Bleed,
  [WeaponClass.Slashing]: SkillType.Parry,
};

export const WEAPON_NONE: Weapon = {
  abilityChance: 0,
  coinPrice: 0,
  damage: 10,
  grip: WeaponGrip.OneHanded,
  name: "Unarmed",
  ranges: {
    damage: {
      maximum: 10,
      minimum: 10,
    },
    rate: {
      maximum: 2500,
      minimum: 2500,
    },
  },
  rate: 2500,
  scrapPrice: 0,
  staminaCost: 0,
  type: WeaponType.Melee,
  weaponClass: WeaponClass.Blunt,
  weight: 0,
};
