import { ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { ArmorClass, SkillType, WeaponGrip } from "@neverquest/types/enums";
import { SVGIcon } from "@neverquest/types/props";

export type Armor = ItemBase & {
  armorClass?: ArmorClass;
  deflectionChance?: number;
  penalty?: number;
  protection: number;
  staminaCost?: number;
};

export interface AttributeOrMastery {
  Icon: SVGIcon;
  base: number;
  description: string;
  increment: number;
  maximum?: number;
  name: string;
  requiredSkill?: SkillType;
}

export interface CrewMember {
  description: string;
  hirableLevel: number;
  interaction: string;
  monologues: string[];
  name: string;
  price: number;
}

interface InventoryBase {
  item: Item;
  key: string;
}

export interface Inventory {
  [id: string]: InventoryBase & {
    isEquipped: boolean;
  };
}

export interface InventoryMerchant {
  [id: string]: InventoryBase & {
    isReturned: boolean;
  };
}

export type Item = Gear | Trinket;

interface ItemBase {
  name: string;
  price: number;
  weight: number;
}

export type Gear = Armor | Shield | Weapon;

export type Shield = ItemBase & {
  blockChance: number;
  staggerChance: number;
  staminaCost: number;
  type?: ShieldType;
};

export interface Skill {
  Icon: SVGIcon;
  description: string;
  name: string;
  price: number;
  requiredLevel: number;
}

export type Trinket = ItemBase & {
  Icon: SVGIcon;
  description: string;
  isPortable: boolean;
};

export type Weapon = ItemBase & {
  abilityChance: number;
  damage: number;
  grip: WeaponGrip;
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weaponClass: WeaponClass;
};

export interface Wilderness {
  name: string;
  progress: number;
}
