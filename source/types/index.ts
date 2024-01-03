import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types";
import type { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import type { SVGIcon } from "@neverquest/types/components";
import type {
  Consumable,
  Gem,
  Grip,
  Infusable,
  QuestClass,
  Trinket,
} from "@neverquest/types/unions";

export type Armor = GearItemBase & {
  burden: number;
  deflection: number;
  gearClass: ArmorClass;
  protection: number;
};

export type AttributeOrMasteryBaseData = {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
};

export type ConsumableItem = ItemBase & {
  description: string;
  name: Consumable;
};

export type GearItem = Armor | Shield | Weapon;

type GearItemBase = ItemBase & {
  level: number;
  name: string;
  price: number;
};

export type GearItemUnequipped = typeof ARMOR_NONE | typeof SHIELD_NONE | typeof WEAPON_NONE;

export type GearRangeBase = {
  burden: [GeneratorRange, GeneratorRange];
  price: GeneratorRange;
  weight: [GeneratorRange, GeneratorRange];
};

export type GemItem = ItemBase & {
  name: Gem;
};

export type GeneratorRange = {
  maximum: number;
  minimum: number;
};

export type InfusableItem = ItemBase & {
  description: string;
  effect: GeneratorRange;
  name: Infusable;
};

export type InheritableItem = InfusableItem | TrinketItem;

export type InventoryItem = GearItem | InheritableItem | StackableItem;

type ItemBase = {
  ID: string;
  price: number;
  weight: number;
};

export type Melee = WeaponBase & {
  grip: Grip;
};

export type MerchantInventoryItem = InventoryItem & {
  isEradicated: boolean;
  isReturned: boolean;
};

export type QuestData = {
  description: string;
  hidden?: string;
  progressionIndex: number;
  progressionMaximum: number;
  questClass: QuestClass;
  title: string;
};

export type QuestNotification = QuestData & { ID: string };

export type Ranged = WeaponBase & {
  ammunitionCost: number;
  range: number;
};

export type Shield = GearItemBase & {
  block: number;
  burden: number;
  gearClass: ShieldClass;
  stagger: number;
};

export type StackableItem = ConsumableItem | GemItem;

export type TrinketItem = ItemBase & {
  description: string;
  name: Trinket;
};

export type Weapon = Melee | Ranged;

type WeaponBase = GearItemBase & {
  abilityChance: number;
  burden: number;
  damage: number;
  gearClass: WeaponClass;
  rate: number;
};
