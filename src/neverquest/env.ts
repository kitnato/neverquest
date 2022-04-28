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
      [key: string]: InventoryContents;
    }
  | Record<string, never>;

export interface InventoryContents {
  item: EquipmentObject;
  isEquipped?: boolean;
  type: EquipmentType;
}

export enum InventoryItemStatus {
  Equipped,
  Rejected,
  Stored,
}

export interface EquipmentBase {
  name: string;
  price: number;
  weight: number;
}

export type EquipmentObject = Armor | Accessory | Shield | Weapon;

export enum EquipmentType {
  Accessory,
  Armor,
  Shield,
  Weapon,
}

export enum LocationType {
  Caravan,
  Wilderness,
}

export enum LootType {
  Aether,
  Coins,
  Scrap,
}

export interface MerchantInventoryContents {
  item: EquipmentObject;
  type: EquipmentType;
}

export type MerchantInventory =
  | {
      [key: string]: MerchantInventoryContents;
    }
  | Record<string, never>;

export type Shield = EquipmentBase & {
  block: number;
  stagger: number;
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

export interface LootProps {
  tooltip?: string | undefined;
  value: number;
}

export interface RandomizedRange {
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
