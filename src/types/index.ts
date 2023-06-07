import type { ArmorClass, ShieldClass, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { WeaponGrip } from "@neverquest/types/unions";

export type Armor = GearBase & {
  deflection: number;
  gearClass?: ArmorClass;
  protection: number;
  ranges: {
    deflection: Range;
  };
  staminaCost: number;
};

export type AttributeOrMastery = UnlockedState & {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
  maximum?: number;
  name: string;
};

export type Consumable = ItemBase & {
  description: string;
  name: ConsumableName;
};

export type ConsumableName = "Bandages" | "Elixir" | "Salve";

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

export type Item = Consumable | Gear | Trinket;

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
  block: number;
  gearClass?: ShieldClass;
  ranges: {
    block: Range;
  };
  stagger: number;
  staminaCost: number;
};

export type Trinket = ItemBase & {
  description: string;
  name: TrinketName;
};

export const TRINKET_NAMES = ["Compass", "Hearthstone", "Knapsack"] as const;
export type TrinketName = (typeof TRINKET_NAMES)[number];

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
    damage: Range;
    rate: Range;
  };
  rate: number;
  staminaCost: number;
};
