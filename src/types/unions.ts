export const ATTRIBUTE_TYPES = [
  "agility",
  "dexterity",
  "endurance",
  "fortitude",
  "perception",
  "speed",
  "strength",
  "vigor",
  "vitality",
] as const;
export type Attribute = (typeof ATTRIBUTE_TYPES)[number];

export const CONSUMABLE_TYPES = ["antidote", "bandages", "elixir", "salve", "phylactery"] as const;
export type Consumable = (typeof CONSUMABLE_TYPES)[number];

export const CREW_TYPES = [
  "alchemist",
  "blacksmith",
  "fletcher",
  "medic",
  "mercenary",
  "merchant",
  "occultist",
  "tailor",
  "witch",
] as const;
export type Crew = (typeof CREW_TYPES)[number];

export type CrewStatus = "hirable" | "hired" | null;

export type Delta =
  | "agility"
  | "ammunition"
  | "ammunitionMaximum"
  | "attackRate"
  | "attributePoints"
  | "bleedRating"
  | "block"
  | "butchery"
  | "criticalRating"
  | "cruelty"
  | "damage"
  | "damagePerSecond"
  | "deflection"
  | "dexterity"
  | "dodge"
  | "encumbranceMaximum"
  | "endurance"
  | "essence"
  | "essenceBonus"
  | "essenceLoot"
  | "execution"
  | "finesse"
  | "fortitude"
  | "health"
  | "healthMaximum"
  | "healthRegenerationRate"
  | "infusionLevel"
  | "level"
  | "marksmanship"
  | "masteryProgress"
  | "masteryRank"
  | "might"
  | "monsterHealth"
  | "parry"
  | "perception"
  | "powerBonusBoost"
  | "progress"
  | "protection"
  | "range"
  | "recoveryRate"
  | "resilience"
  | "speed"
  | "stability"
  | "stage"
  | "staggerRating"
  | "stamina"
  | "staminaMaximum"
  | "staminaRegenerationRate"
  | "strength"
  | "stunRating"
  | "thorns"
  | "vigor"
  | "vitality";

export const ELEMENTAL_TYPES = ["lightning", "fire", "ice"] as const;
export type Elemental = (typeof ELEMENTAL_TYPES)[number];

export const GEAR_TYPES = ["weapon", "armor", "shield"] as const;
export type Gear = (typeof GEAR_TYPES)[number];

export const GEM_TYPES = ["ruby", "sapphire", "topaz"] as const;
export type Gem = (typeof GEM_TYPES)[number];

export const GRIP_TYPES = ["one-handed", "two-handed"] as const;
export type Grip = (typeof GRIP_TYPES)[number];

export const INFUSABLE_TYPES = ["monkey paw", "tome of power"] as const;
export type Infusable = (typeof INFUSABLE_TYPES)[number];

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
  "stunned",
] as const;
export type MonsterAilment = (typeof MONSTER_AILMENT_TYPES)[number];

export type NumberFormat = "float" | "integer" | "percentage" | "time";

export type Reserve = "health" | "stamina";

export const SHOWING_TYPES = [
  "armor",
  "attackRate",
  "attackRateDetails",
  "block",
  "capabilities",
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
  "masteries",
  "monsterAilments",
  "monsterOffense",
  "protection",
  "recovery",
  "offhand",
  "skills",
  "stamina",
  "staminaDetails",
  "statistics",
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
  | "absorbedEssence"
  | "acquiredMasteries"
  | "acquiredTraits"
  | "allowNSFW"
  | "ammunition"
  | "ammunitionMaximum"
  | "appliedGems"
  | "areAttributesAffordable"
  | "armor"
  | "attackDuration"
  | "attackRate"
  | "attackRateTotal"
  | "attributePointCost"
  | "attributePoints"
  | "attributePowerBonus"
  | "attributeRank"
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
  | "canAffordInfusion"
  | "canApplyGem"
  | "canAttackOrParry"
  | "canBlock"
  | "canDodge"
  | "canFit"
  | "canReceiveAilment"
  | "canReceiveAilments"
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
  | "equippableItems"
  | "essence"
  | "essenceBonus"
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
  | "infusionCurrent"
  | "infusionDelta"
  | "infusionLevel"
  | "infusionMaximum"
  | "infusionStep"
  | "inventory"
  | "isAttacking"
  | "isAttributeAtMaximum"
  | "isAttributeUnlocked"
  | "isBlighted"
  | "isBoss"
  | "isCrewHired"
  | "isGameOver"
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isImmortal"
  | "isInfusionAtMaximum"
  | "isInventoryFull"
  | "isInventoryOpen"
  | "isLooting"
  | "isMasteryAtMaximum"
  | "isMasteryUnlocked"
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
  | "isTraitAcquired"
  | "isWilderness"
  | "itemsAcquired"
  | "itemsLoot"
  | "level"
  | "location"
  | "locationName"
  | "lootingDuration"
  | "lowHealthWarning"
  | "masteryCost"
  | "masteryProgress"
  | "masteryRank"
  | "masteryStatistic"
  | "merchantInventory"
  | "monsterAilmentDuration"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterBleedingDelta"
  | "monsterBlightChance"
  | "monsterDamage"
  | "monsterDamagePerSecond"
  | "monsterDamageTotal"
  | "monsterDamageTotalPerSecond"
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
  | "nextAttributePoint"
  | "notifyOverEncumbrance"
  | "ownedItem"
  | "parry"
  | "parryAbsorption"
  | "parryDamage"
  | "parryRating"
  | "poisonDuration"
  | "powerBonusBoost"
  | "progress"
  | "progressMaximum"
  | "progressReduction"
  | "protection"
  | "range"
  | "recoveryDuration"
  | "recoveryRate"
  | "regenerationAmount"
  | "regenerationDuration"
  | "regenerationRate"
  | "reserveRegenerationAmount"
  | "reserveRegenerationRate"
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
  | "stagger"
  | "staggerRating"
  | "stamina"
  | "staminaMaximum"
  | "staminaMaximumTotal"
  | "statusElement"
  | "stunRating"
  | "thorns"
  | "totalElementalEffects"
  | "trinketProperties"
  | "weapon"
  | "wildernesses";

export const TRAIT_TYPES = [
  "brawler",
  "bruiser",
  "colossus",
  "executioner",
  "field surgeon",
  "inoculated",
  "nudist",
  "sharpshooter",
  "shredder",
  "stalwart",
  "tank",
  "tormentor",
] as const;
export type Trait = (typeof TRAIT_TYPES)[number];

export const TRINKET_TYPES = [
  "ammunition pouch",
  "antique coin",
  "compass",
  "hearthstone",
  "knapsack",
] as const;
export type Trinket = (typeof TRINKET_TYPES)[number];

export type WeaponAbility = "bleed" | "parry" | "stun";
