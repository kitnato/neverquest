import type { ArmorClass, ShieldSize, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SkillType, WeaponGrip } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

export type Armor = GearBase & {
  deflectionChance: number;
  dodgeChanceModifier: number;
  gearClass?: ArmorClass;
  protection: number;
  staminaCost: number;
};

export type AttributeOrMastery = {
  Icon: SVGIcon;
  base: number;
  description: string;
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

type GearBase = ItemBase & { scrapPrice: number };

export type Range = {
  maximum: number;
  minimum: number;
};

export type Shield = GearBase & {
  blockChance: number;
  size?: ShieldSize;
  staggerChance: number;
  staminaCost: number;
};

export type Skill = {
  Icon: SVGIcon;
  coinPrice: number;
  description: string;
  name: string;
  requiredLevel: number;
};

export type StorageKey =
  | "attackDuration"
  | "attributes"
  | "autoEquip"
  | "blacksmithInventory"
  | "characterLevel"
  | "coins"
  | "coinsLoot"
  | "crewActive"
  | "crewHirable"
  | "crewMapping"
  | "currentHealth"
  | "currentStamina"
  | "deltas"
  | "encumbranceMaximum"
  | "essence"
  | "essenceLoot"
  | "equippedArmor"
  | "equippedShield"
  | "equippedWeapon"
  | "floatingTextQueues"
  | "hasBoughtFromMerchant"
  | "hasKnapsack"
  | "healthRegenerationDuration"
  | "inventory"
  | "isAttacking"
  | "isGameOver"
  | "isInventoryOpen"
  | "isLevelStarted"
  | "isMonsterNew"
  | "isNSFW"
  | "isShowing"
  | "isShowingDamagePerSecond"
  | "confirmControlWarnings"
  | "level"
  | "lootingDuration"
  | "lootingRate"
  | "lowHealthWarning"
  | "masteries"
  | "merchantInventory"
  | "mode"
  | "monsterAttackDuration"
  | "monsterBleedingDelta"
  | "monsterBleedingDuration"
  | "monsterCurrentHealth"
  | "monsterElement"
  | "monsterName"
  | "monsterStaggeredDuration"
  | "name"
  | "poisonDuration"
  | "poisonedDelta"
  | "progress"
  | "recoveryDuration"
  | "scrap"
  | "scrapLoot"
  | "skillsStatus"
  | "staminaDebuff"
  | "staminaRegenerationDuration"
  | "statusElement"
  | "wildernesses";

export type Trinket = ItemBase & {
  Icon: SVGIcon;
  description: string;
  isPortable: boolean;
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
