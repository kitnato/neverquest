// MAIN

import { ShieldType, WeaponType } from "locra/env";

export type Accessory = EquipmentBase;

export type Armor = EquipmentBase & {
  armorClass?: ArmorClass;
  protection: number;
};

export enum ArmorClass {
  Light = "Light",
  Plate = "Plate",
  Reinforced = "Reinforced",
}

export interface Attribute {
  base: number;
  canAssign: boolean;
  cost: number;
  description: string;
  increment: number;
  name: string;
  points: number;
}

export enum CrewType {
  Alchemist,
  Blacksmith,
  Cook,
  Medic,
  Mercenary,
  Merchant,
  Tailor,
  Witch,
  Wizard,
}

export type DeltaDisplay = DeltaDisplayContents | DeltaDisplayContents[];

export interface DeltaDisplayContents {
  color: UIFloatingTextType | null;
  value: string;
}

export type Inventory =
  | {
      [key: string]: InventoryContent;
    }
  | Record<string, never>;

export interface InventoryContent {
  isEquipped?: boolean;
  item: Equipment;
}

export interface EquipmentBase {
  name: string;
  price: number;
  weight: number;
}

export type Equipment = Armor | Accessory | Shield | Weapon;

export enum LocationType {
  Caravan,
  Wilderness,
}

export enum LootType {
  Aether,
  Coins,
  Scrap,
}

export type Shield = EquipmentBase & {
  block: number;
  stagger: number;
  staminaCost: number;
  type?: ShieldType;
};

export type Weapon = EquipmentBase & {
  damage: number;
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weaponClass?: WeaponClass;
};

export enum WeaponClass {
  Balanced = "Balanced",
  Heavy = "Heavy",
  Light = "Light",
  TwoHanded = "Two-handed",
}

// PROPS

export type InventoryContentProps = InventoryContent & {
  key: string;
};

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RangeProps {
  maximum: number;
  minimum: number;
}

// UI

export enum UIAnimationSpeed {
  Fast = "fast",
  Faster = "faster",
  Slow = "slow",
  Slower = "Slower",
}

export enum UIAnimationType {
  HeadShake = "headShake",
  FadeInRight = "fadeInRight",
  FlipInX = "flipInX",
  Pulse = "pulse",
  ZoomInRight = "zoomInRight",
}

export enum UIAttachment {
  Above,
  Below,
}

export enum UIFloatingTextType {
  Negative = "text-danger",
  Neutral = "text-muted",
  Positive = "text-success",
}

export enum UIOverlayPlacement {
  Bottom = "bottom",
  Top = "top",
}

export enum UISize {
  Normal,
  Tiny,
}

// Using Bootstrap 5 variants.
export enum UIVariant {
  Outline = "outline-dark",
  Primary = "dark",
  Secondary = "secondary",
}
