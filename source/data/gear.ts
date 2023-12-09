import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types";
import { nanoid } from "nanoid";

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
import type { Armor, GearBase, GeneratorRange, Melee, Shield } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type { WeaponAbility } from "@neverquest/types/unions";

export const ARMOR_NONE: Omit<Armor, "gearClass" | "isEquipped" | "price"> = {
  deflection: 0,
  gems: [],
  ID: nanoid(),
  level: 1,
  name: "Unarmored",
  protection: 0,
  staminaCost: 0,
  weight: 0,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  Omit<GearBase, "staminaCost"> & {
    deflection?: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    protection: [GeneratorRange, GeneratorRange];
    staminaCost: number | [GeneratorRange, GeneratorRange];
  }
> = {
  heavy: {
    deflection: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconArmorHeavy,
    price: { maximum: 10_000, minimum: 8 },
    protection: [
      { maximum: 10, minimum: 8 },
      { maximum: 1500, minimum: 1450 },
    ],
    staminaCost: Number.POSITIVE_INFINITY,
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 100, minimum: 90 },
    ],
  },
  light: {
    Icon: IconArmorLight,
    price: { maximum: 5000, minimum: 1 },
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 800, minimum: 700 },
    ],
    staminaCost: 0,
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  reinforced: {
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconReinforced,
    price: { maximum: 7500, minimum: 3 },
    protection: [
      { maximum: 6, minimum: 4 },
      { maximum: 1000, minimum: 950 },
    ],
    staminaCost: [
      { maximum: 3, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 80, minimum: 70 },
    ],
  },
};

export const SHIELD_NONE: Omit<Shield, "gearClass" | "isEquipped" | "price"> = {
  block: 0,
  gems: [],
  ID: nanoid(),
  level: 1,
  name: "Unshielded",
  stagger: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldClass,
  GearBase & {
    block: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    stagger?: [GeneratorRange, GeneratorRange];
  }
> = {
  medium: {
    block: [
      { maximum: 0.21, minimum: 0.2 },
      { maximum: 0.33, minimum: 0.31 },
    ],
    Icon: IconShieldMedium,
    price: { maximum: 4000, minimum: 4 },
    stagger: [
      { maximum: 0.45, minimum: 0.4 },
      { maximum: 0.55, minimum: 0.53 },
    ],
    staminaCost: [
      { maximum: 4, minimum: 3 },
      { maximum: 35, minimum: 30 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
  },
  small: {
    block: [
      { maximum: 0.12, minimum: 0.1 },
      { maximum: 0.22, minimum: 0.2 },
    ],
    Icon: IconShieldSmall,
    price: { maximum: 2000, minimum: 2 },
    staminaCost: [
      { maximum: 2, minimum: 1 },
      { maximum: 20, minimum: 15 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
  },
  tower: {
    block: [
      { maximum: 0.38, minimum: 0.35 },
      { maximum: 0.5, minimum: 0.48 },
    ],
    Icon: IconShieldTower,
    price: { maximum: 5500, minimum: 7 },
    stagger: [
      { maximum: 0.65, minimum: 0.6 },
      { maximum: 0.9, minimum: 0.88 },
    ],
    staminaCost: [
      { maximum: 7, minimum: 6 },
      { maximum: 45, minimum: 40 },
    ],
    weight: [
      { maximum: 8, minimum: 5 },
      { maximum: 65, minimum: 60 },
    ],
  },
};

export const WEAPON_BASE: GearBase & {
  ammunitionCost: [GeneratorRange, GeneratorRange];
  damage: [GeneratorRange, GeneratorRange];
  range: [GeneratorRange, GeneratorRange];
  rate: [GeneratorRange, GeneratorRange];
} = {
  ammunitionCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 50, minimum: 45 },
  ],
  damage: [
    { maximum: 12, minimum: 11 },
    { maximum: 1100, minimum: 1000 },
  ],
  price: { maximum: 7000, minimum: 1 },
  range: [
    { maximum: 4000, minimum: 3500 },
    { maximum: 7000, minimum: 6800 },
  ],
  rate: [
    { maximum: 2800, minimum: 2700 },
    { maximum: 800, minimum: 750 },
  ],
  staminaCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 60, minimum: 55 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 75, minimum: 70 },
  ],
};

export const WEAPON_MODIFIER = {
  "one-handed": { ability: 1, damage: 1, price: 1, rate: 1, stamina: 1, weight: 1 },
  ranged: { ability: 1, damage: 1.2, price: 1.1, rate: 1, stamina: 1.1, weight: 1.15 },
  "two-handed": {
    ability: 1.1,
    damage: 1.25,
    price: 1.2,
    rate: 1.3,
    stamina: 1.15,
    weight: 1.2,
  },
};

export const WEAPON_NONE: Omit<Melee, "isEquipped" | "price"> = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  gems: [],
  grip: "one-handed",
  ID: nanoid(),
  level: 1,
  name: "Unarmed",
  rate: 2000,
  staminaCost: 0,
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
