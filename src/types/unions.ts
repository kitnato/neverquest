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

export const CONSUMABLE_TYPES = ["antidote", "bandages", "elixir", "salve", "phylactery"] as const;
export type Consumable = (typeof CONSUMABLE_TYPES)[number];

export type Crew =
  | "alchemist"
  | "blacksmith"
  | "fletcher"
  | "medic"
  | "mercenary"
  | "merchant"
  | "occultist"
  | "tailor"
  | "witch";

export type CrewStatus = "hirable" | "hired" | null;

export type DeltaText = "float" | "integer" | "percentage" | "time";

export type Delta =
  | "ammunition"
  | "attackRate"
  | "attributePoints"
  | "bleedRating"
  | "block"
  | "butchery"
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
  | "execution"
  | "finesse"
  | "health"
  | "healthRegenerationRate"
  | "level"
  | "lootBonus"
  | "marksmanship"
  | "might"
  | "monsterHealth"
  | "parry"
  | "progress"
  | "protection"
  | "range"
  | "recoveryRate"
  | "resilience"
  | "scrap"
  | "scrapLoot"
  | "stability"
  | "stage"
  | "staggerRating"
  | "stamina"
  | "staminaRegenerationRate"
  | "thorns";

export const ELEMENTAL_TYPES = ["lightning", "fire", "ice"] as const;
export type Elemental = (typeof ELEMENTAL_TYPES)[number];

export const GEAR_TYPES = ["weapon", "armor", "shield"] as const;
export type Gear = (typeof GEAR_TYPES)[number];

export const GEM_TYPES = ["ruby", "sapphire", "topaz"] as const;
export type Gem = (typeof GEM_TYPES)[number];

export const GRIP_TYPES = ["one-handed", "two-handed"] as const;
export type Grip = (typeof GRIP_TYPES)[number];

export type Item = Consumable | Gear | Trinket;

export type Location = "caravan" | "wilderness";

export type Mastery =
  | "butchery"
  | "cruelty"
  | "finesse"
  | "marksmanship"
  | "might"
  | "resilience"
  | "stability";

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
  "capabilitiesButton",
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
  "execution",
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
  "offhand",
  "skills",
  "stability",
  "stagger",
  "stamina",
  "staminaDetails",
  "statistics",
  "range",
  "thorns",
  "weapon",
  "weight",
  "wildernessStatus",
] as const;
export type Showing = (typeof SHOWING_TYPES)[number];

export const SKILL_TYPES = [
  "anatomy",
  "archery",
  "armorcraft",
  "assassination",
  "calisthenics",
  "escrime",
  "evasion",
  "siegecraft",
  "shieldcraft",
  "traumatology",
] as const;
export type Skill = (typeof SKILL_TYPES)[number];

export type StateKey =
  | "allowNSFW"
  | "appliedGems"
  | "areAttributesIncreasable"
  | "armor"
  | "attackDuration"
  | "attackRate"
  | "attackRateTotal"
  | "attributeCost"
  | "attributePoints"
  | "attributes"
  | "attributeStatistic"
  | "autoEquip"
  | "blacksmithInventory"
  | "bleed"
  | "bleedDamage"
  | "bleedDamageTotal"
  | "bleedRating"
  | "blight"
  | "blightAmount"
  | "blightMagnitude"
  | "block"
  | "canApplyGem"
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
  | "criticalStrike"
  | "damage"
  | "damagePerSecond"
  | "damageTotal"
  | "deflection"
  | "deltas"
  | "dodge"
  | "elementalEffects"
  | "encumbrance"
  | "encumbranceMaximum"
  | "essence"
  | "essenceAbsorbed"
  | "essenceLoot"
  | "execution"
  | "fletcherInventory"
  | "floatingTextQueues"
  | "hasBoughtFromMerchant"
  | "hasEnoughAmmunition"
  | "hasKnapsack"
  | "hasLooted"
  | "hasMonsterClosed"
  | "health"
  | "healthMaximum"
  | "healthMaximumTotal"
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
  | "isRegenerating"
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
  | "locationName"
  | "lootBonus"
  | "lootingDuration"
  | "lowHealthWarning"
  | "masteries"
  | "masteriesAcquired"
  | "masteryCost"
  | "masteryStatistic"
  | "merchantInventory"
  | "monsterAilmentDuration"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterBleedingDelta"
  | "monsterBlightChance"
  | "monsterDamage"
  | "monsterDamagePerSecond"
  | "monsterDistance"
  | "monsterElement"
  | "monsterHealth"
  | "monsterHealthMaximum"
  | "monsterLoot"
  | "monsterName"
  | "monsterPoisonChance"
  | "monsterPoisonLength"
  | "monsterPoisonMagnitude"
  | "name"
  | "notifyOverEncumbrance"
  | "ownedItem"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "parryRating"
  | "poisonDuration"
  | "powerBonus"
  | "progress"
  | "progressMaximum"
  | "protection"
  | "range"
  | "recoveryDuration"
  | "recoveryRate"
  | "regenerationAmount"
  | "regenerationDuration"
  | "regenerationRate"
  | "reserveRegenerationAmount"
  | "reserveRegenerationRate"
  | "scrap"
  | "scrapLoot"
  | "shield"
  | "showDamagePerSecond"
  | "showGearComparison"
  | "showGearLevel"
  | "skillPrice"
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
  | "statusElement"
  | "thorns"
  | "totalElementalEffects"
  | "trinketProperties"
  | "weapon"
  | "wildernesses";

export const TRINKET_TYPES = [
  "antique coin",
  "ammunition pouch",
  "compass",
  "hearthstone",
  "knapsack",
  "monkey paw",
  "tome of power",
] as const;
export type Trinket = (typeof TRINKET_TYPES)[number];
