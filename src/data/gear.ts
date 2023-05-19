import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconHide } from "@neverquest/icons/hide.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRA/types";
import type { Range } from "@neverquest/types";
import { SkillType, WeaponGrip } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

// Armor

export const ARMOR_NONE = {
  deflection: 0,
  level: 0,
  name: "Unarmored",
  protection: 0,
  staminaCost: 0,
  weight: 0,
} as const;

export const ARMOR_SPECIFICATIONS: Readonly<
  Record<
    ArmorClass,
    {
      deflectionRange: Range;
      dodgeCostModifier: number;
      Icon: SVGIcon;
      priceModifier: number;
      protectionModifier: number;
      weightModifier: number;
    }
  >
> = {
  hide: {
    deflectionRange: { maximum: 0, minimum: 0 },
    dodgeCostModifier: 0,
    Icon: IconHide,
    priceModifier: 1,
    protectionModifier: 1,
    weightModifier: 1,
  },
  plate: {
    deflectionRange: { maximum: 0.6, minimum: 0.3 },
    dodgeCostModifier: Infinity,
    Icon: IconPlate,
    priceModifier: 2,
    protectionModifier: 2.5,
    weightModifier: 3,
  },
  reinforced: {
    deflectionRange: { maximum: 0.29, minimum: 0.1 },
    dodgeCostModifier: 1,
    Icon: IconReinforced,
    priceModifier: 1.5,
    protectionModifier: 1.5,
    weightModifier: 2,
  },
} as const;

// Shield

export const SHIELD_NONE = {
  block: 0,
  level: 0,
  name: "Unshielded",
  stagger: 0,
  staminaCost: 0,
  weight: 0,
} as const;

export const SHIELD_SPECIFICATIONS: Readonly<
  Record<
    ShieldClass,
    {
      blockRange: Range;
      Icon: SVGIcon;
      staggerModifier: number;
      staminaCostModifier: number;
      weightModifier: number;
    }
  >
> = {
  medium: {
    blockRange: { maximum: 0.49, minimum: 0.25 },
    Icon: IconShieldMedium,
    staggerModifier: 1.5,
    staminaCostModifier: 2,
    weightModifier: 1.5,
  },
  small: {
    blockRange: { maximum: 0.24, minimum: 0.1 },
    Icon: IconShieldSmall,
    staggerModifier: 1,
    staminaCostModifier: 1,
    weightModifier: 1,
  },
  tower: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    Icon: IconShieldTower,
    staggerModifier: 2.5,
    staminaCostModifier: 3,
    weightModifier: 2,
  },
} as const;

// Weapon

export const WEAPON_NONE = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  grip: WeaponGrip.OneHanded,
  level: 0,
  modality: "melee",
  name: "Unarmed",
  rate: 2500,
  staminaCost: 0,
  weight: 0,
} as const;

export const WEAPON_SPECIFICATIONS: Readonly<
  Record<
    WeaponClass,
    {
      abilityChance: Range;
      abilityName: string;
      IconAbility: SVGIcon;
      IconGearClass: SVGIcon;
      skillType: SkillType;
    }
  >
> = {
  blunt: {
    abilityChance: { maximum: 0.7, minimum: 0.1 },
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    skillType: SkillType.Stagger,
  },
  piercing: {
    abilityChance: { maximum: 0.7, minimum: 0.2 },
    abilityName: "Bleed",
    IconAbility: IconWeaponBleed,
    IconGearClass: IconPiercing,
    skillType: SkillType.Bleed,
  },
  slashing: {
    abilityChance: { maximum: 0.6, minimum: 0.15 },
    abilityName: "Parry",
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
    skillType: SkillType.Parry,
  },
} as const;
