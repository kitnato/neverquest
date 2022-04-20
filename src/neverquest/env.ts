// MAIN

import { WeaponType } from "locra/env";

export type Accessory = EquipmentBase;

export type Armor = EquipmentBase & {
  protection: number;
  weight: ArmorWeight;
};

export enum ArmorWeight {
  Light = "Light",
  None = "None",
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

export interface DeltaDisplay {
  color: UIFloatingTextType | null;
  value: string;
}

export type Inventory =
  | {
      [key: string]: InventoryContents;
    }
  | Record<string, never>;

export interface InventoryContents {
  item: Armor | Accessory | Shield | Weapon;
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
}

export enum EquipmentType {
  Armor,
  Accessory,
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
  item: Armor | Accessory | Shield | Weapon;
  type: EquipmentType;
}

export type MerchantInventory =
  | {
      [key: string]: MerchantInventoryContents;
    }
  | Record<string, never>;

export type Shield = EquipmentBase & {
  protection: number;
  stagger: number;
};

export type Weapon = EquipmentBase & {
  damage: number;
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weight: WeaponWeight;
};

export enum WeaponWeight {
  Balanced = "Balanced",
  Heavy = "Heavy",
  Light = "Light",
  None = "None",
  TwoHanded = "Two-handed",
}

// UI

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
