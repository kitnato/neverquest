import { ShieldType, WeaponType } from "locra/types";

export type Armor = Item & {
  armorClass?: ArmorClass;
  protection: number;
};

export enum ArmorClass {
  Hide = "Hide",
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
  [id: symbol]: InventoryContents;
}

export interface InventoryContents {
  // Optional, because while in Merchant's inventory, it can't be equipped.
  isEquipped?: boolean;
  item: Item;
  key: string;
}

export interface Item {
  name: string;
  price: number;
  weight: number;
}
export type Equipment = Armor | Shield | Trinket | Weapon;

export enum LocationType {
  Caravan,
  Wilderness,
}

export enum LootType {
  Aether,
  Coins,
  Scrap,
}

export type Shield = Item & {
  block: number;
  stagger: number;
  staminaCost: number;
  type?: ShieldType;
};

export type Trinket = Item;

export type Weapon = Item & {
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
