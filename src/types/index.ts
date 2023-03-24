import { ShieldType, WeaponClass, WeaponType } from "@neverquest/LOCRA/types";
import { ArmorClass, SkillType, WeaponGrip } from "@neverquest/types/enums";
import { SVGIcon } from "@neverquest/types/props";

export type Armor = GearBase & {
  armorClass?: ArmorClass;
  deflectionChance?: number;
  penalty?: number;
  protection: number;
  staminaCost?: number;
};

export interface AttributeOrMastery {
  Icon: SVGIcon;
  base: number;
  description: string;
  increment: number;
  maximum?: number;
  name: string;
  requiredSkill?: SkillType;
}

export interface CrewMember {
  coinPrice: number;
  description: string;
  hirableLevel: number;
  interaction: string;
  monologues: string[];
  name: string;
}

interface InventoryBase {
  item: Item;
  key: string;
}

export interface Inventory {
  [id: string]: InventoryBase & {
    isEquipped: boolean;
  };
}

export interface InventoryMerchant {
  [id: string]: InventoryBase & {
    isReturned: boolean;
  };
}

export type Item = Gear | Trinket;

interface ItemBase {
  coinPrice: number;
  name: string;
  weight: number;
}

export type Gear = Armor | Shield | Weapon;

type GearBase = ItemBase & { scrapPrice: number };

export interface Range {
  maximum: number;
  minimum: number;
}

export type Shield = GearBase & {
  blockChance: number;
  staggerChance: number;
  staminaCost: number;
  type?: ShieldType;
};

export interface Skill {
  Icon: SVGIcon;
  coinPrice: number;
  description: string;
  name: string;
  requiredLevel: number;
}

export type StorageKey =
  | "attackDuration"
  | "attributes"
  | "autoEquip"
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
  | "floatingTextQueues"
  | "hasBoughtFromMerchant"
  | "hasKnapsack"
  | "healthRegenerationDuration"
  | "inventory"
  | "isAttacking"
  | "isGameOver"
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
  | "wildernesses"
  | "isInventoryOpen";

export type Trinket = ItemBase & {
  Icon: SVGIcon;
  description: string;
  isPortable: boolean;
};

export type Weapon = GearBase & {
  abilityChance: number;
  damage: number;
  grip: WeaponGrip;
  ranges: {
    damage: Range;
    rate: Range;
  };
  rate: number;
  staminaCost: number;
  type: WeaponType;
  weaponClass: WeaponClass;
};
