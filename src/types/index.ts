import type { ArmorClass, ShieldClass, WeaponClass, WeaponModality } from "@neverquest/LOCRA/types";
import type { SkillType, WeaponGrip } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

export type Armor = GearBase & {
  deflectionChance: number;
  gearClass?: ArmorClass;
  protection: number;
  ranges: {
    deflectionChance: Range;
  };
  staminaCost: number;
};

export type AttributeOrMastery = {
  base: number;
  description: string;
  Icon: SVGIcon;
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

type GearBase = ItemBase & { level: number; scrapPrice: number };

export type Range = {
  maximum: number;
  minimum: number;
};

export type Shield = GearBase & {
  blockChance: number;
  gearClass?: ShieldClass;
  ranges: {
    blockChance: Range;
  };
  staggerChance: number;
  staminaCost: number;
};

export type Skill = {
  coinPrice: number;
  description: string;
  Icon: SVGIcon;
  name: string;
  requiredLevel: number;
};

export type StateKey =
  | "allowNSFW"
  | "areAttributesIncreasable"
  | "armor"
  | "attackDuration"
  | "attackRate"
  | "attackRateTotal"
  | "attributeCost"
  | "attributePoints"
  | "attributes"
  | "autoEquip"
  | "blacksmithInventory"
  | "bleedChance"
  | "bleedDamage"
  | "bleedRating"
  | "bleedTick"
  | "blockChance"
  | "canAttackOrParry"
  | "canBlock"
  | "canDodge"
  | "canFit"
  | "characterLevel"
  | "coins"
  | "coinsLoot"
  | "confirmControlWarnings"
  | "crew"
  | "crewActive"
  | "crewHirable"
  | "crewMapping"
  | "criticalChance"
  | "criticalDamage"
  | "criticalRating"
  | "currentHealth"
  | "currentStamina"
  | "damage"
  | "damagePerSecond"
  | "damageTotal"
  | "deflectionChance"
  | "deltas"
  | "dodgeChance"
  | "dodgeChanceTotal"
  | "encumbrance"
  | "encumbranceMaximum"
  | "equippedArmor"
  | "equippedGearIDs"
  | "equippedShield"
  | "equippedWeapon"
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "floatingTextQueues"
  | "freeBlockChance"
  | "geTotal"
  | "hasBoughtFromMerchant"
  | "hasKnapsack"
  | "hasLooted"
  | "healthRegenerationAmount"
  | "healthRegenerationDuration"
  | "healthRegenerationRate"
  | "inventory"
  | "isAttacking"
  | "isAttributeAtMaximum"
  | "isBlighted"
  | "isGameOver"
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isInventoryFull"
  | "isInventoryOpen"
  | "isLevelCompleted"
  | "isLevelStarted"
  | "isLooting"
  | "isMasteryAtMaximum"
  | "isMonsterDead"
  | "isMonsterNew"
  | "isMonsterStaggered"
  | "isRecovering"
  | "isShowing"
  | "isShowingDamagePerSecond"
  | "isShowingGearComparisons"
  | "isShowingGearLevel"
  | "isShowingMastery"
  | "isStaminaAtMaximum"
  | "isWilderness"
  | "level"
  | "locationName"
  | "lootingDuration"
  | "lootingRate"
  | "lowHealthWarning"
  | "masteries"
  | "masteryCost"
  | "maximumHealth"
  | "maximumLevel"
  | "maximumStamina"
  | "maximumStaminaTotal"
  | "merchantInventory"
  | "mode"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterBleedingDelta"
  | "monsterBleedingDuration"
  | "monsterCurrentHealth"
  | "monsterDamage"
  | "monsterDamagePerSecond"
  | "monsterElement"
  | "monsterLoot"
  | "monsterMaximumHealth"
  | "monsterName"
  | "monsterPoisonChance"
  | "monsterStaggeredDuration"
  | "name"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "poisonDuration"
  | "poisonedDelta"
  | "progress"
  | "progressMaximum"
  | "protection"
  | "recoveryDuration"
  | "recoveryRate"
  | "reserveRegenerationAmount"
  | "reserveRegenerationRate"
  | "scrap"
  | "scrapLoot"
  | "shield"
  | "skills"
  | "skillsStatus"
  | "skillsTrained"
  | "skipRecoveryChance"
  | "staggerChanceWeapon"
  | "staggerDuration"
  | "staggerRating"
  | "staminaDebuff"
  | "staminaRegenerationAmount"
  | "staminaRegenerationDuration"
  | "staminaRegenerationRate"
  | "statusElement"
  | "weapon"
  | "wilderness"
  | "wildernesses";

export type Trinket = ItemBase & {
  description: string;
  name: TrinketName;
};

export type TrinketName = "Compass" | "Hearthstone" | "Knapsack";

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
