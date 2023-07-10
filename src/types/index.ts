import type { ArmorClass, ShieldClass, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Showing, Trinket, WeaponGrip } from "@neverquest/types/unions";

export type Armor = GearBase & {
  deflection: number;
  gearClass?: ArmorClass;
  protection: number;
  ranges: {
    deflection: Range;
  } | null;
  staminaCost: number;
};

export type AttributeData = AttributeOrMasteryBaseData & {
  maximum?: number;
  powerBonus: number;
  shows?: Showing;
};

export type AttributeOrMasteryBaseData = UnlockedState & {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
};

export type ConsumableItem = ItemBase & {
  description: string;
  type: Consumable;
};

export type InventoryBlacksmith = {
  armor: Armor | null;
  shield: Shield | null;
  weapon: Weapon | null;
};

export type InventoryMerchant = {
  isReturned: boolean;
  item: Item;
}[];

export type Item = ConsumableItem | GearItem | TrinketItem;

type ItemBase = {
  coinPrice: number;
  id: string;
  weight: number;
};

export type GearItem = Armor | Shield | Weapon;

type GearBase = ItemBase & { isEquipped: boolean; level: number; name: string; scrapPrice: number };

export type MasteryData = AttributeOrMasteryBaseData & {
  instructions: string;
  maximum: number;
};

export type Range = {
  maximum: number;
  minimum: number;
};

export type Shield = GearBase & {
  block: number;
  gearClass?: ShieldClass;
  ranges: {
    block: Range;
  };
  stagger: number;
  staminaCost: number;
};

export type TrinketItem = ItemBase & {
  description: string;
  type: Trinket;
};

export type UnlockedState = {
  isUnlocked: boolean;
};

export type Weapon = GearBase & {
  abilityChance: number;
  damage: number;
  gearClass: WeaponClass;
  grip: WeaponGrip;
  modality: WeaponModality;
  ranges: {
    ability: Range;
    damage: Range;
    rate: Range;
  };
  rate: number;
  staminaCost: number;
};
