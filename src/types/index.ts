import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { ArmorClass, SkillType, WeaponGrip } from "@neverquest/types/enums";
import { SVGIcon } from "@neverquest/types/props";

export type Armor = ItemBase & {
  armorClass?: ArmorClass;
  protection: number;
};

export interface Attribute {
  Icon: SVGIcon;
  base: number;
  description: string;
  increment: number;
  name: string;
  requiredSkill?: SkillType;
}

export interface CrewMember {
  Component: () => JSX.Element;
  description: string;
  hirableLevel: number;
  interaction: string;
  monologues: string[];
  name: string;
  price: number;
}

interface InventoryBase {
  item: Gear | Item;
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

export type Item = ItemBase & {
  Icon: SVGIcon;
  description: string;
  isPortable: boolean;
};

interface ItemBase {
  name: string;
  price: number;
  weight: number;
}

export type Gear = Armor | Shield | Weapon;

export type Shield = ItemBase & {
  block: number;
  stagger: number;
  staminaCost: number;
  type?: ShieldType;
};

export interface Skill {
  Icon: SVGIcon;
  description: string;
  name: string;
  price: number;
}

export type Weapon = ItemBase & {
  bleedChance?: number;
  damage: number;
  grip: WeaponGrip;
  parryChance?: number;
  rate: number;
  staggerDuration?: number;
  staminaCost: number;
  type: WeaponType;
  weaponClass: WeaponClass;
};
