import type { ArmorClass, ShieldClass, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SkillType, WeaponGrip } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

export type Armor = GearBase & {
  deflectionChance: number;
  gearClass?: ArmorClass;
  protection: number;
  ranges: {
    deflectionChance: Range;
  };
  staminaCost: number;
};

export type AttributeOrMastery = {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
  maximum?: number;
  name: string;
  requiredSkill?: SkillType;
};

export type Inventory = Record<string, Item>;

export type InventoryBlacksmith = {
  armor: Armor | null;
  shield: Shield | null;
  weapon: Weapon | null;
};

export type InventoryMerchant = Record<
  string,
  {
    isReturned: boolean;
    item: Item;
  }
>;

export type Item = Gear | Trinket;

type ItemBase = {
  coinPrice: number;
  name: string;
  weight: number;
};

export type Gear = Armor | Shield | Weapon;

type GearBase = ItemBase & { level: number; scrapPrice: number };

export type Range = {
  maximum: number;
  minimum: number;
};

export type Shield = GearBase & {
  blockChance: number;
  gearClass?: ShieldClass;
  ranges: {
    blockChance: Range;
  };
  staggerChance: number;
  staminaCost: number;
};

export type Skill = {
  coinPrice: number;
  description: string;
  Icon: SVGIcon;
  name: string;
  requiredLevel: number;
};

export type Trinket = ItemBase & {
  description: string;
  name: TrinketName;
};

export type TrinketName = "Compass" | "Hearthstone" | "Knapsack";

export type Weapon = GearBase & {
  abilityChance: number;
  damage: number;
  gearClass: WeaponClass;
  grip: WeaponGrip;
  modality: WeaponModality;
  ranges: {
    damage: Range;
    rate: Range;
  };
  rate: number;
  staminaCost: number;
};
