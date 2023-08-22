export type Attribute =
  | "agility"
  | "dexterity"
  | "endurance"
  | "fortitude"
  | "luck"
  | "perception"
  | "speed"
  | "strength"
  | "vigor"
  | "vitality";

export const CONSUMABLE_TYPES = ["antidote", "bandages", "elixir", "salve", "soulstone"] as const;
export type Consumable = (typeof CONSUMABLE_TYPES)[number];

export type Crew =
  | "alchemist"
  | "blacksmith"
  | "medic"
  | "mercenary"
  | "merchant"
  | "occultist"
  | "tailor"
  | "witch";

export type CrewStatus = "hirable" | "hired" | null;

export type DeltaText = "float" | "integer" | "percentage" | "time";

export type Delta =
  | "attackRate"
  | "attributePoints"
  | "bleedRating"
  | "block"
  | "coins"
  | "coinsLoot"
  | "criticalRating"
  | "cruelty"
  | "damage"
  | "damagePerSecond"
  | "deflection"
  | "dodge"
  | "encumbrance"
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "finesse"
  | "health"
  | "healthRegenerationRate"
  | "level"
  | "lootBonus"
  | "might"
  | "monsterHealth"
  | "parry"
  | "progress"
  | "protection"
  | "recoveryRate"
  | "resilience"
  | "scrap"
  | "scrapLoot"
  | "stability"
  | "stage"
  | "staggerRating"
  | "stamina"
  | "staminaRegenerationRate";

export const ELEMENTAL_TYPES = ["electric", "fire", "ice"] as const;
export type Elemental = (typeof ELEMENTAL_TYPES)[number];

export type Gear = "armor" | "shield" | "weapon";

export type Item = Consumable | Gear | Trinket;

export type Location = "caravan" | "wilderness";

export type Mastery = "cruelty" | "finesse" | "might" | "resilience" | "stability";

export const MONSTER_AILMENT_TYPES = [
  "bleeding",
  "burning",
  "frozen",
  "shocked",
  "staggered",
] as const;
export type MonsterAilment = (typeof MONSTER_AILMENT_TYPES)[number];

export type Reserve = "health" | "stamina";

export const RESOURCE_TYPES = ["coins", "essence", "scrap"] as const;
export type Resource = (typeof RESOURCE_TYPES)[number];

export const SHOWING_TYPES = [
  "armor",
  "attackRate",
  "attackRateDetails",
  "attributesButton",
  "bleed",
  "block",
  "coins",
  "crewHiring",
  "criticalRating",
  "damageDetails",
  "deflection",
  "dodge",
  "dodgePenalty",
  "essence",
  "gameOver",
  "gearClass",
  "healthDetails",
  "loot",
  "lootBonus",
  "lootBonusDetails",
  "masteries",
  "monsterAilments",
  "monsterOffense",
  "parry",
  "protection",
  "recovery",
  "reserveDetails",
  "scrap",
  "shield",
  "stability",
  "stagger",
  "stamina",
  "staminaDetails",
  "statistics",
  "weapon",
  "weight",
  "wildernessStatus",
] as const;
export type Showing = (typeof SHOWING_TYPES)[number];

export const SKILL_TYPES = [
  "anatomy",
  "armorcraft",
  "assassination",
  "calisthenics",
  "escrime",
  "evasion",
  "shieldcraft",
  "traumatology",
] as const;
export type Skill = (typeof SKILL_TYPES)[number];

export type StateKey =
  | "allowNSFW"
  | "appliedShards"
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
  | "bleed"
  | "bleedRating"
  | "bleedTick"
  | "blight"
  | "blightIncrement"
  | "block"
  | "canApplyShard"
  | "canAttackOrParry"
  | "canBlock"
  | "canDodge"
  | "canFit"
  | "canReceiveAilment"
  | "canReceiveAilments"
  | "coins"
  | "coinsLoot"
  | "confirmationWarnings"
  | "crewActive"
  | "criticalChance"
  | "criticalDamage"
  | "criticalRating"
  | "damage"
  | "damagePerSecond"
  | "damageTotal"
  | "deflection"
  | "deltas"
  | "dodge"
  | "encumbrance"
  | "encumbranceMaximum"
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "floatingTextQueues"
  | "hasBoughtFromMerchant"
  | "hasItem"
  | "hasKnapsack"
  | "hasLooted"
  | "health"
  | "healthMaximum"
  | "healthMaximumTotal"
  | "healthRegenerationAmount"
  | "healthRegenerationDuration"
  | "healthRegenerationRate"
  | "hireStatus"
  | "inventory"
  | "isAttacking"
  | "isAttributeAtMaximum"
  | "isBlighted"
  | "isBoss"
  | "isCrewHired"
  | "isGameOver"
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isImmortal"
  | "isInventoryFull"
  | "isInventoryOpen"
  | "isLooting"
  | "isMasteryAtMaximum"
  | "isMonsterAiling"
  | "isMonsterDead"
  | "isMonsterNew"
  | "isPoisoned"
  | "isRecovering"
  | "isShowing"
  | "isShowingEverything"
  | "isStageCompleted"
  | "isStageStarted"
  | "isStaminaAtMaximum"
  | "isWilderness"
  | "itemsAcquired"
  | "itemsLoot"
  | "level"
  | "location"
  | "lootBonus"
  | "lootingDuration"
  | "lootingRate"
  | "lowHealthWarning"
  | "masteries"
  | "masteryCost"
  | "merchantInventory"
  | "mode"
  | "monsterAilmentDuration"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterBleedingDelta"
  | "monsterBlightChance"
  | "monsterDamage"
  | "monsterDamagePerSecond"
  | "monsterElement"
  | "monsterHealth"
  | "monsterHealthMaximum"
  | "monsterLoot"
  | "monsterName"
  | "monsterPoisonChance"
  | "monsterPoisonDuration"
  | "monsterPoisonMagnitude"
  | "name"
  | "notifyOverEncumbrance"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "parryRating"
  | "poisonDuration"
  | "powerBonus"
  | "progress"
  | "progressMaximum"
  | "protection"
  | "rawAttributeStatistic"
  | "rawMasteryStatistic"
  | "recoveryDuration"
  | "recoveryRate"
  | "reserveRegenerationAmount"
  | "reserveRegenerationRate"
  | "scrap"
  | "scrapLoot"
  | "shield"
  | "showDamagePerSecond"
  | "showGearComparison"
  | "showGearLevel"
  | "skills"
  | "skillsTrained"
  | "stability"
  | "stage"
  | "stageMaximum"
  | "staggerRating"
  | "staggerWeapon"
  | "stamina"
  | "staminaMaximum"
  | "staminaMaximumTotal"
  | "staminaRegenerationAmount"
  | "staminaRegenerationDuration"
  | "staminaRegenerationRate"
  | "statusElement"
  | "weapon"
  | "weaponElementalEffects"
  | "wildernesses";

export const TRINKET_TYPES = [
  "antique coin",
  "compass",
  "hearthstone",
  "knapsack",
  "monkey paw",
  "tome of power",
] as const;
export type Trinket = (typeof TRINKET_TYPES)[number];

export type WeaponGrip = "one-handed" | "two-handed";
