// MAIN

export interface Armor {
  name: string;
  value: number;
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

export enum LocationType {
  Caravan = "caravan",
  Wilderness = "wilderness",
}

export type Inventory =
  | {
      [key: string]: Armor | Accessory | Shield | Weapon;
    }
  | Record<string, never>;

export enum InventoryItemStatus {
  Equipped = "equipped",
  Rejected = "rejected",
  Stored = "stored",
}

export enum EquipmentType {
  Armor = "armor",
  Accessory = "accessory",
  Shield = "shield",
  Weapon = "weapon",
}

export interface Accessory {
  name: string;
}

export enum LootType {
  Aether = "aether",
  Coins = "coins",
  Scrap = "scrap",
}

export interface MerchantInventoryContents {
  cost: number;
  item: Armor | Accessory | Shield | Weapon;
  type: EquipmentType;
}

export type MerchantInventory =
  | {
      [key: string]: MerchantInventoryContents;
    }
  | Record<string, never>;

export interface Shield {
  block: number;
  name: string;
  stagger: number;
  value: number;
}

export interface Weapon {
  damage: { minimum: number; maximum: number };
  name: string;
  rate: number;
  staminaCost: number;
  type: string;
}

export enum WeaponType {
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
  Primary = "secondary",
  Secondary = "warning",
}
