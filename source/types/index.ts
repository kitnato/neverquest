import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types"
import type { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear"
import type { SVGIcon } from "@neverquest/types/components"
import type { Description } from "@neverquest/types/ui"
import type { Consumable, Gem, Grip, Infusable, QuestClass, Relic } from "@neverquest/types/unions"

export type Armor = GearItemBase & {
  burden: number;
  deflection: number;
  gearClass: ArmorClass;
  protection: number;
}

export type AttributeOrMasteryBaseData = Description & {
  base: number;
  descriptionIcons: [SVGIcon, ...SVGIcon[]];
  Icon: SVGIcon;
  increment: number;
}

export type ConsumableItem = ItemBase & {
  name: Consumable;
}

export type GearItem = Armor | Shield | Weapon

export type GearItemBase = ItemBase & {
  level: number;
  name: string;
}

export type GearItemUnequipped = typeof ARMOR_NONE | typeof SHIELD_NONE | typeof WEAPON_NONE

export type GearRangeBase = {
  burden: [GeneratorRange, GeneratorRange];
  price: GeneratorRange;
  weight: [GeneratorRange, GeneratorRange];
}

export type GemItem = ItemBase & {
  name: Gem;
}

export type GeneratorRange = {
  maximum: number;
  minimum: number;
}

export type InfusableItem = ItemBase & {
  effect: GeneratorRange;
  name: Infusable;
}

export type InheritableItem = InfusableItem | RelicItem

export type InventoryItem = GearItem | InheritableItem | StackableItem

export type ItemBase = {
  ID: string;
  price: number;
  weight: number;
}

export type Melee = WeaponBase & {
  grip: Grip;
}

export type MerchantInventoryItem = InventoryItem & {
  isReturned: boolean;
}

export type QuestData = {
  description: string;
  hidden?: string;
  progressionIndex: number;
  progressionMaximum: number;
  questClass: QuestClass;
  title: string;
}

export type QuestNotification = QuestData & { ID: string }

export type Ranged = WeaponBase & {
  ammunitionCost: number;
  range: number;
}

export type Shield = GearItemBase & {
  block: number;
  burden: number;
  gearClass: ShieldClass;
  stagger: number;
}

export type StackableItem = ConsumableItem | GemItem

export type RelicItem = ItemBase & {
  name: Relic;
}

export type Weapon = Melee | Ranged

export type WeaponBase = GearItemBase & {
  abilityChance: number;
  burden: number;
  damage: number;
  gearClass: WeaponClass;
  rate: number;
}
