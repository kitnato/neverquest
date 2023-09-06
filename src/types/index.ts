import type {
  ArmorClass,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRAN/types";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Consumable,
  Elemental,
  Gem,
  Showing,
  Trinket,
  WeaponGrip,
} from "@neverquest/types/unions";

export type Armor = GearItemBase & {
  deflection: number;
  gearClass?: ArmorClass;
  gems: GemItem[];
  protection: number;
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

export type BlightMagnitude = {
  amount: number;
  percentage: number;
};

export type ConsumableItem = ItemBase & {
  description: string;
  type: Consumable;
};

export type ElementalGearEffects = Record<Elemental, { damage: number; duration: number }>;

export type GearBase = {
  coinPrice: number;
  scrapPrice: number;
  staminaCost: [GeneratorRange, GeneratorRange];
  weight: [GeneratorRange, GeneratorRange];
};

export type GearItem = Armor | Shield | Weapon;

type GearItemBase = ItemBase & {
  gems: GemItem[];
  isEquipped: boolean;
  level: number;
  name: string;
  scrapPrice: number;
};

export type GemItem = ItemBase & {
  type: Gem;
};

export type GeneratorRange = {
  maximum: number;
  minimum: number;
};

export type InventoryItem = ConsumableItem | GearItem | GemItem | TrinketItem;

type ItemBase = {
  coinPrice: number;
  id: string;
  weight: number;
};

export type MasteryData = AttributeOrMasteryBaseData & {
  instructions: string;
  maximum: number;
};

export type MerchantInventory = {
  isReturned: boolean;
  item: InventoryItem;
}[];

export type Shield = GearItemBase & {
  block: number;
  gearClass?: ShieldClass;
  gems: GemItem[];
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

export type Weapon = GearItemBase & {
  abilityChance: number;
  damage: number;
  gearClass: WeaponClass;
  gems: GemItem[];
  grip: WeaponGrip;
  modality: WeaponModality;
  range: number;
  rate: number;
  staminaCost: number;
};
