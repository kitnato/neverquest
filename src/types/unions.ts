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

export const CONQUEST_TYPES = [
  "killing",
  "looting",
  "blocking",
  "staggering",
  "bleeding",
  "bleedingKill",
  "stunning",
  "parrying",
  "parryingKill",
  "deflecting",
  "dodging",
  "critical",
  "criticalKilling",
  "executing",
  "bandaging",
  "bosses",
  "burning",
  "freezing",
  "shocking",
  "thorns",
  "thornsKill",
  "poisoning",
  "blighting",
] as const;
export type Conquest = (typeof CONQUEST_TYPES)[number];

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
  | Attribute
  | Mastery
  | QuestBonus
  | QuestClass
  | Reserve
  | "ammunition"
  | "ammunitionMaximum"
  | "attackRate"
  | "attributePoints"
  | "bleedRating"
  | "blockChance"
  | "butcheryProgress"
  | "criticalRating"
  | "crueltyProgress"
  | "damage"
  | "damagePerSecond"
  | "deflection"
  | "dodgeChance"
  | "encumbranceMaximum"
  | "essence"
  | "essenceBonus"
  | "essenceLoot"
  | "executionThreshold"
  | "finesseProgress"
  | "healthMaximum"
  | "healthRegenerationAmount"
  | "healthRegenerationRate"
  | "infusionLevel"
  | "level"
  | "marksmanshipProgress"
  | "mightProgress"
  | "monsterHealth"
  | "parryRating"
  | "powerBonusBoost"
  | "progress"
  | "protection"
  | "range"
  | "recoveryRate"
  | "resilienceProgress"
  | "stabilityProgress"
  | "stage"
  | "staggerRating"
  | "staminaMaximum"
  | "staminaRegenerationAmount"
  | "staminaRegenerationRate"
  | "stunRating"
  | "thorns";

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

export const MASTERY_TYPES = [
  "butchery",
  "cruelty",
  "finesse",
  "marksmanship",
  "might",
  "resilience",
  "stability",
] as const;
export type Mastery = (typeof MASTERY_TYPES)[number];

export const MONSTER_AILMENT_ELEMENTAL_TYPES = ["burning", "frozen", "shocked"] as const;
export type MonsterAilmentElemental = (typeof MONSTER_AILMENT_ELEMENTAL_TYPES)[number];

export const MONSTER_AILMENT_TYPES = [
  "bleeding",
  "staggered",
  "stunned",
  ...MONSTER_AILMENT_ELEMENTAL_TYPES,
] as const;

export type MonsterAilment = (typeof MONSTER_AILMENT_TYPES)[number];

export type NumberFormat = "abbreviated" | "float" | "integer" | "percentage" | "time";

export type Quest = Conquest | Routine | Triumph;

export const QUEST_BONUS_TYPES = ["healthBonus", "staminaBonus", "damageBonus"] as const;
export type QuestBonus = (typeof QUEST_BONUS_TYPES)[number];

export const QUEST_CLASS_TYPES = ["conquest", "routine", "triumph"] as const;
export type QuestClass = (typeof QUEST_CLASS_TYPES)[number];

export type QuestStatus = QuestBonus | "achieved" | "incomplete";

export type Reserve = "health" | "stamina";

export const ROUTINE_TYPES = [
  "purchasingWeapon",
  "equippingWeapon",
  "purchasingArmor",
  "equippingArmor",
  "purchasingShield",
  "equippingShield",
  "acquiringKnapsack",
  "knapsackExpanding",
  "stages",
  "powerLevel",
  "purchasingUsable",
  "purchasingInfusable",
  "selling",
  "buyingBack",
  "spendingEssence",
  "warpingWilderness",
  "warpingCaravan",
  "hiringOne",
  "hiringAll",
  "crafting",
  "gems",
  "gemsOwned",
  "gemsSocketing",
  "gemsSocketingAll",
  "gemsTransmuting",
  "potions",
  "acquiringRanged",
  "acquiringTwoHanded",
  "infusion",
  "infusionMaximum",
  "attributesMaximum",
  "attributesAll",
  "skillsAcquiring",
  "skillsCraft",
  "skillAcquiringAll",
  "masteryRank",
  "masteryAll",
  "masteryRankMaximum",
  "resurrecting",
  "retiring",
  "ritualEssence",
  "ritualMemories",
  "acquiringAntiqueCoin",
  "traits",
  "traitsAll",
] as const;
export type Routine = (typeof ROUTINE_TYPES)[number];

export const SHOWING_TYPES = [
  "armor",
  "attackRate",
  "attackRateDetails",
  "attributes",
  "blockChance",
  "crewHiring",
  "criticalRating",
  "damageDetails",
  "deflection",
  "dodgeChance",
  "dodgePenalty",
  "essence",
  "gameOver",
  "gearClass",
  "grip",
  "healthDetails",
  "location",
  "loot",
  "masteries",
  "monsterAilments",
  "monsterOffense",
  "protection",
  "questBonus",
  "recovery",
  "offhand",
  "skills",
  "stamina",
  "staminaDetails",
  "statistics",
  "traits",
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
  | Gear
  | "absorbedEssence"
  | "acquiredTraits"
  | "activeCrew"
  | "activeQuests"
  | "allowNSFW"
  | "ammunition"
  | "ammunitionMaximum"
  | "appliedGems"
  | "areAttributesAffordable"
  | "attackDuration"
  | "attackRate"
  | "attributePointCost"
  | "attributePoints"
  | "attributePowerBonus"
  | "attributeRank"
  | "attributeStatistic"
  | "autoEquip"
  | "blacksmithInventory"
  | "bleed"
  | "bleedChance"
  | "bleedDamage"
  | "bleedingDelta"
  | "bleedingDeltaLength"
  | "bleedRating"
  | "blight"
  | "blightAmount"
  | "blightChance"
  | "blightMagnitude"
  | "blockChance"
  | "canAffordInfusion"
  | "canApplyGem"
  | "canAttackOrParry"
  | "canBlock"
  | "canCompleteQuests"
  | "canDodge"
  | "canFit"
  | "canReceiveAilment"
  | "canReceiveAilments"
  | "canUseJournal"
  | "completedQuestsCount"
  | "confirmationWarnings"
  | "criticalChance"
  | "criticalDamage"
  | "criticalRating"
  | "criticalStrike"
  | "damage"
  | "damagePerSecond"
  | "deflection"
  | "deltas"
  | "distance"
  | "dodgeChance"
  | "elementalEffects"
  | "encumbrance"
  | "encumbranceExtent"
  | "encumbranceMaximum"
  | "equippableItems"
  | "essence"
  | "essenceBonus"
  | "essenceLoot"
  | "executionThreshold"
  | "fletcherInventory"
  | "floatingTextQueues"
  | "hasEnoughAmmunition"
  | "hasLooted"
  | "hasMonsterClosed"
  | "health"
  | "healthMaximum"
  | "healthMaximumPoisoned"
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
  | "isCaravanHired"
  | "isGameOver"
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isImmortal"
  | "isInfusionAtMaximum"
  | "isInventoryOpen"
  | "isLootAvailable"
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
  | "isSkillAcquired"
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
  | "monsterDamage"
  | "monsterDamageAiling"
  | "monsterDamageAilingPerSecond"
  | "monsterDamagePerSecond"
  | "monsterElement"
  | "monsterHealth"
  | "monsterHealthMaximum"
  | "monsterLoot"
  | "monsterName"
  | "name"
  | "nextAttributePoint"
  | "notifyOverEncumbrance"
  | "ownedItem"
  | "ownsInheritableItems"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "parryRating"
  | "poisonChance"
  | "poisonDuration"
  | "poisonLength"
  | "poisonMagnitude"
  | "powerBonusBoost"
  | "progress"
  | "progressMaximum"
  | "progressReduction"
  | "protection"
  | "questNotifications"
  | "questProgress"
  | "questsBonus"
  | "questStatuses"
  | "range"
  | "recoveryDuration"
  | "recoveryRate"
  | "regenerationAmount"
  | "regenerationDuration"
  | "regenerationRate"
  | "reserveRegenerationAmount"
  | "reserveRegenerationRate"
  | "selectedTrait"
  | "showDamagePerSecond"
  | "showEssenceRequired"
  | "showGearComparison"
  | "showGearLevel"
  | "skillPrice"
  | "stability"
  | "stage"
  | "stageMaximum"
  | "staggerChance"
  | "staggerRating"
  | "stamina"
  | "staminaMaximum"
  | "staminaMaximumBlighted"
  | "statusElement"
  | "stunChance"
  | "stunRating"
  | "thorns"
  | "totalElementalEffects"
  | "trainedSkills"
  | "trinketProperties"
  | "unlockedMasteries"
  | "wildernesses";

export const TRAIT_TYPES = [
  "brawler",
  "bruiser",
  "colossus",
  "executioner",
  "inoculated",
  "ninja",
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
  "journal",
  "knapsack",
] as const;
export type Trinket = (typeof TRINKET_TYPES)[number];

export const TRIUMPH_TYPES = [
  "decipheringJournal",
  "settingName",
  "survivingNoGear",
  "survivingNoAttributes",
  "killingOneStrike",
  "exhausting",
  "damage",
  "protection",
  "essenceCount",
  "hiringBlacksmithFirst",
  "acquiringArcheryFirst",
  "powerLevelUltra",
  "killingResDominus",
  "acquiringFamiliar",
  "killingResCogitans",
  "completion",
] as const;
export type Triumph = (typeof TRIUMPH_TYPES)[number];

export type WeaponAbility = "bleed" | "parry" | "stun";
