import { ReactComponent as IconHide } from "@neverquest/icons/animal-hide.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/bullseye.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/checked-shield.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/crossed-slashes.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/fish-scales.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/gavel.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/metal-scales.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/roman-shield.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/rosa-shield.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/round-shield.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/shoulder-armor.svg";
import type { ArmorClass, ShieldSize, WeaponClass } from "@neverquest/LOCRA/types";
import type { Armor, Range, Shield, Weapon } from "@neverquest/types";
import { SkillType, WeaponGrip } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

// Armor

export const ARMOR_ICON = IconArmor;

export const ARMOR_NONE: Readonly<Armor> = {
  coinPrice: 0,
  deflectionChance: 0,
  dodgeChanceModifier: 0,
  level: 0,
  name: "Unarmored",
  protection: 0,
  scrapPrice: 0,
  staminaCost: 0,
  weight: 0,
} as const;

export const ARMOR_SPECIFICATIONS: Readonly<
  Record<
    ArmorClass,
    {
      Icon: SVGIcon;
      deflectionChanceModifier: number;
      dodgeChanceModifier: number;
      dodgeCostModifier: number;
      protectionModifier: number;
      weightModifier: number;
    }
  >
> = {
  hide: {
    deflectionChanceModifier: 0,
    dodgeChanceModifier: 0,
    dodgeCostModifier: 0,
    Icon: IconHide,
    protectionModifier: 0.5,
    weightModifier: 0.5,
  },
  plate: {
    deflectionChanceModifier: 1,
    dodgeChanceModifier: -1,
    dodgeCostModifier: 0,
    Icon: IconPlate,
    protectionModifier: 1,
    weightModifier: 1,
  },
  reinforced: {
    deflectionChanceModifier: 0.5,
    dodgeChanceModifier: 0,
    dodgeCostModifier: 1,
    Icon: IconReinforced,
    protectionModifier: 0.75,
    weightModifier: 0.75,
  },
} as const;

// Shield

export const SHIELD_ICON = IconShield;

export const SHIELD_NONE: Readonly<Shield> = {
  blockChance: 0,
  coinPrice: 0,
  level: 0,
  name: "None",
  scrapPrice: 0,
  staggerChance: 0,
  staminaCost: 0,
  weight: 0,
} as const;

export const SHIELD_SPECIFICATIONS: Readonly<
  Record<
    ShieldSize,
    {
      Icon: SVGIcon;
      blockRange: Range;
      staggerModifier: number;
      staminaCostModifier: number;
      weightModifier: number;
    }
  >
> = {
  medium: {
    blockRange: { maximum: 0.49, minimum: 0.25 },
    Icon: IconShieldMedium,
    staggerModifier: 0.75,
    staminaCostModifier: 0.75,
    weightModifier: 0.75,
  },
  small: {
    blockRange: { maximum: 0.24, minimum: 0.1 },
    Icon: IconShieldSmall,
    staggerModifier: 0.5,
    staminaCostModifier: 0.5,
    weightModifier: 0.5,
  },
  tower: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    Icon: IconShieldTower,
    staggerModifier: 1,
    staminaCostModifier: 1,
    weightModifier: 1,
  },
} as const;

// Weapon

export const WEAPON_ICON = IconWeapon;

export const WEAPON_NONE: Readonly<Weapon> = {
  abilityChance: 0,
  coinPrice: 0,
  damage: 10,
  gearClass: "blunt",
  grip: WeaponGrip.OneHanded,
  level: 0,
  modality: "melee",
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
  weight: 0,
} as const;

export const WEAPON_SPECIFICATIONS: Readonly<
  Record<
    WeaponClass,
    {
      Icon: SVGIcon;
      abilityChance: Range;
      abilityName: string;
      skillType: SkillType;
    }
  >
> = {
  blunt: {
    abilityChance: { maximum: 0.7, minimum: 0.1 },
    abilityName: "Stagger",
    Icon: IconBlunt,
    skillType: SkillType.Stagger,
  },
  piercing: {
    abilityChance: { maximum: 0.7, minimum: 0.2 },
    abilityName: "Bleed",
    Icon: IconPiercing,
    skillType: SkillType.Bleed,
  },
  slashing: {
    abilityChance: { maximum: 0.6, minimum: 0.15 },
    abilityName: "Parry",
    Icon: IconSlashing,
    skillType: SkillType.Parry,
  },
} as const;
