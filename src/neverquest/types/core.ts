import { ShieldType, WeaponType } from "locra/types";

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

export interface Inventory {
  [key: symbol]: InventoryContents;
}

export interface InventoryContents {
  // Optional, because while in Merchant's inventory, it can't be equipped.
  isEquipped?: boolean;
  item: Equipment;
  key: string;
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
