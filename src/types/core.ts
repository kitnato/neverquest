import { ShieldType, WeaponType } from "@neverquest/locra/types";

export type Armor = ItemBase & {
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
  description: string;
  increment: number;
  name: string;
  points: number;
}

export enum CrewHireStatus {
  Hirable,
  Hired,
  Unavailable,
}

export interface CrewMember {
  Component: () => JSX.Element;
  description: string;
  interaction: string;
  hirableLevel: number;
  monologues: string[];
  name: string;
  price: number;
}

export enum CrewType {
  Blacksmith,
  Cook,
  Medic,
  Mercenary,
  Merchant,
  Tailor,
}

interface InventoryBase {
  item: Gear | Item;
  key: string;
}

export interface Inventory {
  [id: symbol]: InventoryBase & {
    isEquipped: boolean;
  };
}

export interface InventoryMerchant {
  [id: symbol]: InventoryBase & {
    isReturned: boolean;
  };
}

export type Item = ItemBase & {
  description: string;
  icon: string;
  isPortable: boolean;
};

interface ItemBase {
  name: string;
  price: number;
  weight: number;
}

// TODO - add Trinket
export type Gear = Armor | Shield | Weapon;

export enum LocationType {
  Caravan,
  Wilderness,
}

export enum LootType {
  Essence,
  Coins,
  Scrap,
}

export type Shield = ItemBase & {
  block: number;
  stagger: number;
  staminaCost: number;
  type?: ShieldType;
};

export interface Skill {
  description: string;
  icon: string;
  name: string;
  price: number;
}

export enum SkillType {
  Criticals,
  Dodging,
  Parrying,
}

// TODO
export type Trinket = ItemBase;

export type Weapon = ItemBase & {
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
