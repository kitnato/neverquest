export type Attribute =
  | "agility"
  | "dexterity"
  | "endurance"
  | "fortitude"
  | "luck"
  | "perception"
  | "resilience"
  | "speed"
  | "strength"
  | "vigor"
  | "vitality";

export type CrewMember =
  | "alchemist"
  | "blacksmith"
  | "medic"
  | "mercenary"
  | "merchant"
  | "mystic"
  | "tailor"
  | "witch";

export type CrewStatus = "hirable" | "hired" | "locked";

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
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "finesse"
  | "health"
  | "healthRegenerationRate"
  | "level"
  | "might"
  | "monsterHealth"
  | "parry"
  | "progress"
  | "protection"
  | "recoveryRate"
  | "scrap"
  | "scrapLoot"
  | "stability"
  | "stage"
  | "staggerRating"
  | "stamina"
  | "staminaRegenerationRate"
  | "tenacity";

export type GearType = "armor" | "shield" | "weapon";

export type Location = "caravan" | "wilderness";

export type Mastery = "cruelty" | "finesse" | "might" | "stability" | "tenacity";

export type Reserve = "encumbrance" | "health" | "monsterHealth" | "stamina";

export const SHOWING = [
  "ailments",
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
  "defense",
  "deflection",
  "dodge",
  "dodgePenalty",
  "essence",
  "gameOver",
  "gearClass",
  "loot",
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
  "statistics",
  "support",
  "tenacity",
  "weapon",
  "weight",
  "wildernessStatus",
] as const;
export type Showing = (typeof SHOWING)[number];

export const SKILLS = [
  "anatomy",
  "armorcraft",
  "assassination",
  "calisthenics",
  "escrime",
  "evasion",
  "shieldcraft",
  "traumatology",
] as const;
export type Skill = (typeof SKILLS)[number];

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
  | "bleed"
  | "bleedDamage"
  | "bleedRating"
  | "bleedTick"
  | "blight"
  | "block"
  | "canAttackOrParry"
  | "canBlock"
  | "canDodge"
  | "canFit"
  | "coins"
  | "coinsLoot"
  | "confirmControlWarnings"
  | "crew"
  | "crewActive"
  | "crewAvailable"
  | "crewMapping"
  | "criticalChance"
  | "criticalDamage"
  | "criticalRating"
  | "damage"
  | "damagePerSecond"
  | "damageTotal"
  | "deflection"
  | "deltas"
  | "dodge"
  | "dodgeTotal"
  | "encumbrance"
  | "encumbranceMaximum"
  | "equippedGearID"
  | "equippedGearIDs"
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "floatingTextQueues"
  | "hasBoughtFromMerchant"
  | "hasKnapsack"
  | "hasLooted"
  | "healthCurrent"
  | "healthMaximum"
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
  | "isLooting"
  | "isMasteryAtMaximum"
  | "isMonsterDead"
  | "isMonsterNew"
  | "isMonsterStaggered"
  | "isRecovering"
  | "isShowing"
  | "isShowingEverything"
  | "isStageCompleted"
  | "isStageStarted"
  | "isStaminaAtMaximum"
  | "isWilderness"
  | "level"
  | "location"
  | "lootingDuration"
  | "lootingRate"
  | "lowHealthWarning"
  | "masteries"
  | "masteryCost"
  | "merchantInventory"
  | "mode"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterBleedingDelta"
  | "monsterBleedingDuration"
  | "monsterDamage"
  | "monsterDamagePerSecond"
  | "monsterElement"
  | "monsterHealthCurrent"
  | "monsterHealthMaximum"
  | "monsterLoot"
  | "monsterName"
  | "monsterPoison"
  | "monsterStaggerDuration"
  | "name"
  | "parry"
  | "parryAbsorption"
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
  | "showDamagePerSecond"
  | "showGearComparison"
  | "showGearLevel"
  | "skills"
  | "skillsTrained"
  | "stability"
  | "stage"
  | "stageMaximum"
  | "staggerDuration"
  | "staggerRating"
  | "staggerWeapon"
  | "staminaCurrent"
  | "staminaMaximum"
  | "staminaMaximumTotal"
  | "staminaRegenerationAmount"
  | "staminaRegenerationDuration"
  | "staminaRegenerationRate"
  | "statusElement"
  | "tenacity"
  | "weapon"
  | "wilderness"
  | "wildernesses";

export type WeaponGrip = "oneHanded" | "twoHanded";
