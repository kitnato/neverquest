import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types";

import IconArmorHeavy from "@neverquest/icons/armor-heavy.svg?react";
import IconArmorLight from "@neverquest/icons/armor-light.svg?react";
import IconReinforced from "@neverquest/icons/armor-reinforced.svg?react";
import IconBleed from "@neverquest/icons/bleed.svg?react";
import IconBlunt from "@neverquest/icons/blunt.svg?react";
import IconParry from "@neverquest/icons/parry.svg?react";
import IconPiercing from "@neverquest/icons/piercing.svg?react";
import IconShieldMedium from "@neverquest/icons/shield-medium.svg?react";
import IconShieldSmall from "@neverquest/icons/shield-small.svg?react";
import IconShieldTower from "@neverquest/icons/shield-tower.svg?react";
import IconSlashing from "@neverquest/icons/slashing.svg?react";
import IconStun from "@neverquest/icons/stun.svg?react";
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
      { maximum: 55, minimum: 50 },
    ],
    deflection: [
      { maximum: 0.3, minimum: 0.28 },
      { maximum: 0.7, minimum: 0.66 },
    ],
    Icon: IconArmorHeavy,
    price: { maximum: 15_000, minimum: 50 },
    protection: [
      { maximum: 10, minimum: 8 },
      { maximum: 2400, minimum: 2300 },
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
    price: { maximum: 6000, minimum: 1 },
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 1400, minimum: 1300 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  reinforced: {
    burden: [
      { maximum: 5, minimum: 3 },
      { maximum: 40, minimum: 35 },
    ],
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.31 },
    ],
    Icon: IconReinforced,
    price: { maximum: 10_000, minimum: 25 },
    protection: [
      { maximum: 6, minimum: 3 },
      { maximum: 1900, minimum: 1800 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 80, minimum: 70 },
    ],
  },
};

export const GEAR_LEVEL_RANGE_MAXIMUM = 3;

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
    stagger?: [GeneratorRange, GeneratorRange];
  }
> = {
  medium: {
    block: [
      { maximum: 0.13, minimum: 0.12 },
      { maximum: 0.3, minimum: 0.28 },
    ],
    burden: [
      { maximum: 4, minimum: 3 },
      { maximum: 25, minimum: 20 },
    ],
    Icon: IconShieldMedium,
    price: { maximum: 4000, minimum: 4 },
    stagger: [
      { maximum: 0.45, minimum: 0.4 },
      { maximum: 0.5, minimum: 0.5 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
  },
  small: {
    block: [
      { maximum: 0.1, minimum: 0.09 },
      { maximum: 0.22, minimum: 0.19 },
    ],
    burden: [
      { maximum: 2, minimum: 1 },
      { maximum: 15, minimum: 10 },
    ],
    Icon: IconShieldSmall,
    price: { maximum: 2000, minimum: 2 },
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
  },
  tower: {
    block: [
      { maximum: 0.3, minimum: 0.29 },
      { maximum: 0.55, minimum: 0.5 },
    ],
    burden: [
      { maximum: 7, minimum: 6 },
      { maximum: 40, minimum: 35 },
    ],
    Icon: IconShieldTower,
    price: { maximum: 5500, minimum: 7 },
    stagger: [
      { maximum: 0.65, minimum: 0.6 },
      { maximum: 0.95, minimum: 0.93 },
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
    { maximum: 30, minimum: 25 },
  ],
  burden: [
    { maximum: 2, minimum: 1 },
    { maximum: 35, minimum: 30 },
  ],
  damage: [
    { maximum: 15, minimum: 13 },
    { maximum: 1700, minimum: 1500 },
  ],
  price: { maximum: 10_000, minimum: 1 },
  range: [
    { maximum: 2000, minimum: 1500 },
    { maximum: 4000, minimum: 3500 },
  ],
  rate: [
    { maximum: 3100, minimum: 2900 },
    { maximum: 1800, minimum: 1700 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 75, minimum: 70 },
  ],
};

export const WEAPON_MODIFIER = {
  "one-handed": { ability: 1, burden: 1, damage: 1, price: 1, rate: 1, weight: 1 },
  ranged: { ability: 1, burden: 1.05, damage: 0.8, price: 1.2, rate: 1.3, weight: 1.15 },
  "two-handed": {
    ability: 1.1,
    burden: 1.15,
    damage: 1.25,
    price: 1.3,
    rate: 1.2,
    weight: 1.2,
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
  rate: 2000,
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
      { maximum: 0.2, minimum: 0.15 },
      { maximum: 0.5, minimum: 0.48 },
    ],
    IconAbility: IconStun,
    IconGearClass: IconBlunt,
  },
  piercing: {
    ability: "bleed",
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.6, minimum: 0.58 },
    ],
    IconAbility: IconBleed,
    IconGearClass: IconPiercing,
  },
  slashing: {
    ability: "parry",
    abilityChance: [
      { maximum: 0.23, minimum: 0.2 },
      { maximum: 0.4, minimum: 0.38 },
    ],
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
  },
};
