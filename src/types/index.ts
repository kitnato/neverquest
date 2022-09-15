import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { ArmorClass, SkillType, WeaponGrip } from "@neverquest/types/enums";
import { SVGIcon } from "@neverquest/types/props";

export type Armor = ItemBase & {
  armorClass?: ArmorClass;
  protection: number;
};

export interface Attribute {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
  name: string;
  requiredSkill?: SkillType;
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
  description: string;
  Icon: SVGIcon;
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
  description: string;
  Icon: SVGIcon;
  name: string;
  price: number;
}

export type Weapon = ItemBase & {
  damage: number;
  grip: WeaponGrip;
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weaponClass: WeaponClass;
};
