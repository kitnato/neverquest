import type { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Gem, Grip, Showing, Trinket } from "@neverquest/types/unions";

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

export type AttributeOrMasteryBaseData = UnlockedState & {
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

export type FletcherInventory = Weapon | null;

export type GearBase = {
  coinPrice: GeneratorRange;
  scrapPrice: GeneratorRange;
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

export type GearItemUnequipped = typeof ARMOR_NONE | typeof SHIELD_NONE | typeof WEAPON_NONE;

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

export type Melee = WeaponBase & {
  grip: Grip;
};

export type MerchantInventory = {
  isReturned: boolean;
  item: InventoryItem;
}[];

export type Ranged = WeaponBase & {
  ammunitionCost: number;
  range: number;
};

export type Shield = GearItemBase & {
  block: number;
  gearClass?: ShieldClass;
  gems: GemItem[];
  stagger: number;
  staminaCost: number;
};

export type StackableItem = ConsumableItem | GemItem;

export type TrinketItem = TrinketItemAmmunitionPouch | TrinketItemDefault;

export type TrinketItemDefault = ItemBase & {
  description: string;
  type: Trinket;
};

export type TrinketItemAmmunitionPouch = TrinketItemDefault & {
  current: number;
  maximum: number;
  type: "ammunition pouch";
};

export type UnlockedState = {
  isUnlocked: boolean;
};

type WeaponBase = GearItemBase & {
  abilityChance: number;
  damage: number;
  gearClass: WeaponClass;
  gems: GemItem[];
  rate: number;
  staminaCost: number;
};

export type Weapon = Melee | Ranged;
