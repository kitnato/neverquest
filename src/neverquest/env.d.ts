// MAIN

import { WeaponType } from "locra/env.d";

export type Accessory = EquipmentBase & {
  name: string;
};

export type Armor = EquipmentBase & {
  name: string;
  value: number;
};

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
  Alchemist = "alchemist",
  Blacksmith = "blacksmith",
  Cook = "cook",
  Medic = "medic",
  Mercenary = "mercenary",
  Merchant = "merchant",
  Tailor = "tailor",
  Witch = "witch",
  Wizard = "wizard",
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
  Equipped = "equipped",
  Rejected = "rejected",
  Stored = "stored",
}

export interface EquipmentBase {
  name: string;
  price: number;
}

export enum EquipmentType {
  Armor = "armor",
  Accessory = "accessory",
  Shield = "shield",
  Weapon = "weapon",
}

export enum LocationType {
  Caravan = "caravan",
  Wilderness = "wilderness",
}

export enum LootType {
  Aether = "aether",
  Coins = "coins",
  Scrap = "scrap",
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
  block: number;
  stagger: number;
  value: number;
};

export type Weapon = EquipmentBase & {
  damage: number;
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weight: WeaponWeight;
};

export enum WeaponWeight {
  Balanced = "balanced",
  Heavy = "heavy",
  Light = "light",
  TwoHanded = "twoHanded",
}

// UI

export enum UIAttachment {
  Above = "above",
  Below = "below",
}

export enum UISize {
  Normal = "normal",
  Tiny = "tiny",
}

// Using Bootstrap 5 variants.
export enum UIVariant {
  Outline = "outline-dark",
  Primary = "dark",
  Secondary = "secondary",
}
