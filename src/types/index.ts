import type { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Consumable,
  Gem,
  Grip,
  QuestClass,
  QuestStatus,
  Trinket,
} from "@neverquest/types/unions";

export type ActiveQuest = {
  description: string;
  progressionMaximum: number;
  questClass: QuestClass;
  status: QuestStatus;
  title: string;
};

export type AmmunitionPouchItem = TrinketItem & {
  current: number;
  description: string;
  maximum: number;
  name: "ammunition pouch";
};

export type Armor = GearItemBase & {
  deflection: number;
  gearClass: ArmorClass;
  protection: number;
  staminaCost: number;
};

export type AttributeOrMasteryBaseData = {
  base: number;
  description: string;
  Icon: SVGIcon;
  increment: number;
  maximum?: number;
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
  name: Consumable;
};

export type FletcherInventory = Weapon | null;

export type GearBase = {
  price: GeneratorRange;
  staminaCost: [GeneratorRange, GeneratorRange];
  weight: [GeneratorRange, GeneratorRange];
};

export type GearItem = Armor | Shield | Weapon;

type GearItemBase = ItemBase & {
  gems: GemItem[];
  isEquipped: boolean;
  level: number;
  name: string;
  price: number;
};

export type GearItemUnequipped = typeof ARMOR_NONE | typeof SHIELD_NONE | typeof WEAPON_NONE;

export type GemItem = ItemBase & {
  name: Gem;
};

export type GeneratorRange = {
  maximum: number;
  minimum: number;
};

export type InfusableItem = ItemBase & {
  description: string;
  level: number;
  name: "monkey paw" | "tome of power";
};

export type InventoryItem = ConsumableItem | GearItem | GemItem | UsableItem;

type ItemBase = {
  id: string;
  price: number;
  weight: number;
};

export type Melee = WeaponBase & {
  grip: Grip;
};

export type MerchantInventory = {
  isReturned: boolean;
  item: InventoryItem;
}[];

export type QuestData = {
  description: string;
  hidden?: string;
  progression: [number, ...number[]];
  title: string;
};

export type Ranged = WeaponBase & {
  ammunitionCost: number;
  range: number;
};

export type Shield = GearItemBase & {
  block: number;
  gearClass: ShieldClass;
  stagger: number;
  staminaCost: number;
};

export type StackableItem = ConsumableItem | GemItem;

export type TrinketItem = ItemBase & {
  description: string;
  name: Trinket;
};

export type UsableItem = AmmunitionPouchItem | InfusableItem | TrinketItem;

type WeaponBase = GearItemBase & {
  abilityChance: number;
  damage: number;
  gearClass: WeaponClass;
  rate: number;
  staminaCost: number;
};

export type Weapon = Melee | Ranged;
