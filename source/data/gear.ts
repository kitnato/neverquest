import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types";

import IconArmorHeavy from "@neverquest/icons/armor-heavy.svg?react";
import IconArmorLight from "@neverquest/icons/armor-light.svg?react";
import IconReinforced from "@neverquest/icons/armor-reinforced.svg?react";
import IconBleedChance from "@neverquest/icons/bleed-chance.svg?react";
import IconBlunt from "@neverquest/icons/blunt.svg?react";
import IconParryChance from "@neverquest/icons/parry-chance.svg?react";
import IconPiercing from "@neverquest/icons/piercing.svg?react";
import IconShieldMedium from "@neverquest/icons/shield-medium.svg?react";
import IconShieldSmall from "@neverquest/icons/shield-small.svg?react";
import IconShieldTower from "@neverquest/icons/shield-tower.svg?react";
import IconSlashing from "@neverquest/icons/slashing.svg?react";
import IconStunChance from "@neverquest/icons/stun-chance.svg?react";
import type { Armor, GearRangeBase, GeneratorRange, Melee, Shield } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type { WeaponAbility } from "@neverquest/types/unions";

export const ARMOR_NONE: Omit<Armor, "gearClass" | "price"> = {
  burden: 0,
  deflection: 0,
  ID: "ARMOR_NONE",
  level: 0,
  name: "Unarmored",
  protection: 0,
  weight: 0,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  GearRangeBase & {
    deflection?: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    protection: [GeneratorRange, GeneratorRange];
  }
> = {
  heavy: {
    burden: [
      { maximum: 9, minimum: 4 },
      { maximum: 80, minimum: 75 },
    ],
    deflection: [
      { maximum: 0.3, minimum: 0.28 },
      { maximum: 0.7, minimum: 0.66 },
    ],
    Icon: IconArmorHeavy,
    price: { maximum: 13_000, minimum: 50 },
    protection: [
      { maximum: 8, minimum: 6 },
      { maximum: 900, minimum: 850 },
    ],
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 100, minimum: 90 },
    ],
  },
  light: {
    burden: [
      { maximum: 2, minimum: 1 },
      { maximum: 25, minimum: 20 },
    ],
    Icon: IconArmorLight,
    price: { maximum: 5000, minimum: 1 },
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 450, minimum: 400 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  reinforced: {
    burden: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.31 },
    ],
    Icon: IconReinforced,
    price: { maximum: 8000, minimum: 25 },
    protection: [
      { maximum: 6, minimum: 3 },
      { maximum: 600, minimum: 550 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 80, minimum: 70 },
    ],
  },
};

export const GEAR_LEVEL_RANGE_MAXIMUM = 3;

export const SHIELD_ELEMENTAL_EFFECTS_BASE = { fire: 0, ice: 0, lightning: 0 };

export const SHIELD_NONE: Omit<Shield, "gearClass" | "price"> = {
  block: 0,
  burden: 0,
  ID: "SHIELD_NONE",
  level: 0,
  name: "Unshielded",
  stagger: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldClass,
  GearRangeBase & {
    block: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    stagger: [GeneratorRange, GeneratorRange];
  }
> = {
  medium: {
    block: [
      { maximum: 0.2, minimum: 0.19 },
      { maximum: 0.35, minimum: 0.33 },
    ],
    burden: [
      { maximum: 4, minimum: 3 },
      { maximum: 35, minimum: 30 },
    ],
    Icon: IconShieldMedium,
    price: { maximum: 3500, minimum: 4 },
    stagger: [
      { maximum: 0.4, minimum: 0.35 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
  },
  small: {
    block: [
      { maximum: 0.11, minimum: 0.1 },
      { maximum: 0.25, minimum: 0.23 },
    ],
    burden: [
      { maximum: 2, minimum: 1 },
      { maximum: 20, minimum: 18 },
    ],
    Icon: IconShieldSmall,
    price: { maximum: 1500, minimum: 2 },
    stagger: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.3, minimum: 0.25 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
  },
  tower: {
    block: [
      { maximum: 0.33, minimum: 0.32 },
      { maximum: 0.5, minimum: 0.48 },
    ],
    burden: [
      { maximum: 7, minimum: 6 },
      { maximum: 50, minimum: 45 },
    ],
    Icon: IconShieldTower,
    price: { maximum: 7000, minimum: 7 },
    stagger: [
      { maximum: 0.55, minimum: 0.5 },
      { maximum: 0.95, minimum: 0.9 },
    ],
    weight: [
      { maximum: 9, minimum: 6 },
      { maximum: 70, minimum: 65 },
    ],
  },
};

export const WEAPON_BASE: GearRangeBase & {
  ammunitionCost: [GeneratorRange, GeneratorRange];
  damage: [GeneratorRange, GeneratorRange];
  range: [GeneratorRange, GeneratorRange];
  rate: [GeneratorRange, GeneratorRange];
} = {
  ammunitionCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 25, minimum: 23 },
  ],
  burden: [
    { maximum: 2, minimum: 1 },
    { maximum: 50, minimum: 45 },
  ],
  damage: [
    { maximum: 15, minimum: 13 },
    { maximum: 900, minimum: 800 },
  ],
  price: { maximum: 8000, minimum: 1 },
  range: [
    { maximum: 2200, minimum: 2000 },
    { maximum: 3500, minimum: 3400 },
  ],
  rate: [
    { maximum: 3000, minimum: 2900 },
    { maximum: 2200, minimum: 2100 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 75, minimum: 70 },
  ],
};

export const WEAPON_MODIFIER = {
  "one-handed": { ability: 1, burden: 1, damage: 1, price: 1, rate: 1, weight: 1 },
  ranged: { ability: 1.1, burden: 0.85, damage: 1.1, price: 1.2, rate: 1.1, weight: 1.15 },
  "two-handed": {
    ability: 1.2,
    burden: 1.3,
    damage: 1.2,
    price: 1.3,
    rate: 1.15,
    weight: 1.25,
  },
};

export const WEAPON_NONE: Omit<Melee, "price"> = {
  abilityChance: 0,
  burden: 0,
  damage: 7,
  gearClass: "blunt",
  grip: "one-handed",
  ID: "WEAPON_NONE",
  level: 0,
  name: "Unarmed",
  rate: 2200,
  weight: 0,
};

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  {
    ability: WeaponAbility;
    abilityChance: [GeneratorRange, GeneratorRange];
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
  }
> = {
  blunt: {
    ability: "stun",
    abilityChance: [
      { maximum: 0.2, minimum: 0.16 },
      { maximum: 0.55, minimum: 0.53 },
    ],
    IconAbility: IconStunChance,
    IconGearClass: IconBlunt,
  },
  piercing: {
    ability: "bleed",
    abilityChance: [
      { maximum: 0.3, minimum: 0.26 },
      { maximum: 0.65, minimum: 0.63 },
    ],
    IconAbility: IconBleedChance,
    IconGearClass: IconPiercing,
  },
  slashing: {
    ability: "parry",
    abilityChance: [
      { maximum: 0.23, minimum: 0.2 },
      { maximum: 0.4, minimum: 0.38 },
    ],
    IconAbility: IconParryChance,
    IconGearClass: IconSlashing,
  },
};
