import type { ArmorClass, ShieldClass, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Gem, Showing, Trinket, WeaponGrip } from "@neverquest/types/unions";

export type Armor = GearBase & {
  deflection: number;
  gearClass?: ArmorClass;
  gems: GemItem[];
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

type AttributeOrMasteryBaseData = UnlockedState & {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
};

export type BlacksmithInventory = {
  armor: Armor | null;
  shield: Shield | null;
  weapon: Weapon | null;
};

export type ConsumableItem = ItemBase & {
  description: string;
  type: Consumable;
};

export type InventoryItem = ConsumableItem | GearItem | GemItem | TrinketItem;

type ItemBase = {
  coinPrice: number;
  id: string;
  weight: number;
};

export type GearItem = Armor | Shield | Weapon;

type GearBase = ItemBase & {
  gems: GemItem[];
  isEquipped: boolean;
  level: number;
  name: string;
  scrapPrice: number;
};

export type MasteryData = AttributeOrMasteryBaseData & {
  instructions: string;
  maximum: number;
};

export type MerchantInventory = {
  isReturned: boolean;
  item: InventoryItem;
}[];

export type Range = {
  maximum: number;
  minimum: number;
};

export type GemItem = ItemBase & {
  type: Gem;
};

export type Shield = GearBase & {
  block: number;
  gearClass?: ShieldClass;
  gems: GemItem[];
  ranges: {
    block: Range;
  };
  stagger: number;
  staminaCost: number;
};

export type StackableItem = ConsumableItem | GemItem;

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
  gems: GemItem[];
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
