export const ATTRIBUTE_TYPES = [
  "strength",
  "speed",
  "vitality",
  "endurance",
  "vigor",
  "fortitude",
  "dexterity",
  "perception",
  "agility",
] as const;
export type Attribute = (typeof ATTRIBUTE_TYPES)[number];

export const CONSUMABLE_TYPES = ["antidote", "bandages", "elixir", "salve", "phylactery"] as const;
export type Consumable = (typeof CONSUMABLE_TYPES)[number];

export const CONQUEST_TYPES = [
  "killing",
  "looting",
  "blocking",
  "killingBoss",
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
  "exhausting",
  "executing",
  "bandaging",
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
  "merchant",
  "medic",
  "tailor",
  "blacksmith",
  "mercenary",
  "fletcher",
  "witch",
  "alchemist",
  "occultist",
] as const;
export type Crew = (typeof CREW_TYPES)[number];

export type CrewStatus = "hidden" | "hirable" | "hired";

export type Delta =
  | Attribute
  | Mastery
  | QuestBonus
  | QuestClass
  | Reserve
  | "ammunition"
  | "ammunitionCapacity"
  | "attackRate"
  | "attributePoints"
  | "bleedRating"
  | "blockChance"
  | "butcheryProgress"
  | "criticalRating"
  | "crueltyProgress"
  | "damage"
  | "damagePerSecond"
  | "deflectionChance"
  | "dodgeChance"
  | "encumbranceMaximum"
  | "essence"
  | "essenceBonus"
  | "essenceLoot"
  | "executionThreshold"
  | "finesseProgress"
  | "hatchingProgress"
  | "healthMaximum"
  | "healthRegenerationAmount"
  | "healthRegenerationRate"
  | "infusionLevel"
  | "marksmanshipProgress"
  | "mightProgress"
  | "monsterHealth"
  | "parryRating"
  | "powerBonusBoost"
  | "powerLevel"
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

export const FINALITY_TYPES = ["res cogitans", "res dominus"] as const;
export type Finality = (typeof FINALITY_TYPES)[number];

export const GEAR_TYPES = ["weapon", "armor", "shield"] as const;
export type Gear = (typeof GEAR_TYPES)[number];

export const GEM_TYPES = ["ruby", "sapphire", "topaz"] as const;
export type Gem = (typeof GEM_TYPES)[number];

export const GRIP_TYPES = ["one-handed", "two-handed"] as const;
export type Grip = (typeof GRIP_TYPES)[number];

export const INFUSABLE_TYPES = ["monkey paw", "mysterious egg", "tome of power"] as const;
export type Infusable = (typeof INFUSABLE_TYPES)[number];

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

const MONSTER_AILMENT_ELEMENTAL_TYPES = ["burning", "frozen", "shocked"] as const;
export type MonsterAilmentElemental = (typeof MONSTER_AILMENT_ELEMENTAL_TYPES)[number];

export const MONSTER_AILMENT_TYPES = [
  "bleeding",
  "staggered",
  "stunned",
  ...MONSTER_AILMENT_ELEMENTAL_TYPES,
] as const;

export type MonsterAilment = (typeof MONSTER_AILMENT_TYPES)[number];

export type NumberFormat =
  | "abbreviated"
  | "float"
  | "integer"
  | "multiplier"
  | "percentage"
  | "time";

export type Quest = Conquest | Routine | Triumph;

export const QUEST_BONUS_TYPES = ["healthBonus", "staminaBonus", "damageBonus"] as const;
export type QuestBonus = (typeof QUEST_BONUS_TYPES)[number];

export type QuestClass = "conquest" | "routine" | "triumph";

export type QuestStatus = QuestBonus | "achieved" | "incomplete";

export type Reserve = "health" | "stamina";

export const ROUTINE_TYPES = [
  "purchasingWeapon",
  "equippingWeapon",
  "purchasingArmor",
  "equippingArmor",
  "purchasingShield",
  "equippingShield",
  "knapsackExpanding",
  "stages",
  "powerLevel",
  "purchasingTrinket",
  "purchasingInfusable",
  "selling",
  "buyingBack",
  "spendingEssence",
  "warpingWilderness",
  "warpingCaravan",
  "hiring",
  "hiringAll",
  "crafting",
  "acquiringGems",
  "gemsApplying",
  "gemsApplyingAll",
  "gemsTransmuting",
  "potions",
  "acquiringRanged",
  "acquiringTwoHanded",
  "infusing",
  "infusingMaximum",
  "attributesIncreasingAll",
  "skills",
  "skillsCraft",
  "masteries",
  "masteriesRank",
  "masteriesRankMaximum",
  "resurrecting",
  "retiring",
  "purgingEssence",
  "purgingMemories",
  "traits",
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
  "damage",
  "damageDetails",
  "deflection",
  "dodgeChance",
  "essence",
  "gameOver",
  "gearClass",
  "grip",
  "health",
  "healthDetails",
  "location",
  "masteries",
  "monsterOffense",
  "protection",
  "questBonus",
  "recovery",
  "offhand",
  "skills",
  "stamina",
  "staminaDetails",
  "traits",
  "weapon",
  "weight",
  "wildernessStatus",
] as const;
export type Showing = (typeof SHOWING_TYPES)[number];

export const SKILL_TYPES = [
  "anatomy",
  "assassination",
  "calisthenics",
  "escrime",
  "evasion",
  "traumatology",
  "armorcraft",
  "shieldcraft",
  "siegecraft",
  "archery",
] as const;
export type Skill = (typeof SKILL_TYPES)[number];

export type StateKey =
  | Gear
  | "absorbedEssence"
  | "acquiredItems"
  | "acquiredSkills"
  | "acquiredTraits"
  | "activeCrew"
  | "activeQuests"
  | "allowProfanity"
  | "ammunition"
  | "ammunitionCapacity"
  | "areAttributesAffordable"
  | "attackDuration"
  | "attackRate"
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
  | "blightChance"
  | "blightMagnitude"
  | "blockChance"
  | "canAttackOrParry"
  | "canBlock"
  | "canCompleteQuests"
  | "canDodge"
  | "canInfuseMysteriousEgg"
  | "canReceiveAilment"
  | "canReceiveAilments"
  | "canTrackQuests"
  | "canTrainMastery"
  | "completedQuestsCount"
  | "consciousness"
  | "criticalChance"
  | "criticalDamage"
  | "criticalRating"
  | "criticalStrike"
  | "damage"
  | "damagePerSecond"
  | "defeatedFinality"
  | "deflectionChance"
  | "deltas"
  | "distance"
  | "dodgeChance"
  | "elementalEffects"
  | "encounter"
  | "encumbrance"
  | "encumbranceExtent"
  | "encumbranceMaximum"
  | "essence"
  | "essenceLoot"
  | "executionThreshold"
  | "expandedBuyback"
  | "expandedMasteries"
  | "fletcherInventory"
  | "gems"
  | "hasDecipheredJournal"
  | "hasEnoughAmmunition"
  | "hasLooted"
  | "hasMonsterClosed"
  | "health"
  | "healthMaximum"
  | "healthMaximumPoisoned"
  | "hireStatus"
  | "infusion"
  | "infusionEffect"
  | "infusionLevel"
  | "infusionMaximum"
  | "infusionStep"
  | "inventory"
  | "isAttacking"
  | "isAttributeAtMaximum"
  | "isBlighted"
  | "isCaravanHired"
  | "isGameOver"
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isInfusionAtMaximum"
  | "isInventoryOpen"
  | "isInvulnerable"
  | "isLootAvailable"
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
  | "isShowingStatistics"
  | "isSkillAcquired"
  | "isStageCompleted"
  | "isStageStarted"
  | "isStaminaAtMaximum"
  | "isTraitAcquired"
  | "itemsLoot"
  | "knapsackCapacity"
  | "location"
  | "locationName"
  | "lootingDuration"
  | "lowHealthWarning"
  | "masteryCost"
  | "masteryProgress"
  | "masteryRank"
  | "masteryStatistic"
  | "merchantInventory"
  | "monologue"
  | "monsterAilmentDuration"
  | "monsterAttackDuration"
  | "monsterAttackRate"
  | "monsterDamage"
  | "monsterDamageAiling"
  | "monsterDamageAilingPerSecond"
  | "monsterElement"
  | "monsterHealth"
  | "monsterHealthMaximum"
  | "monsterLoot"
  | "monsterName"
  | "name"
  | "notifyOverEncumbrance"
  | "ownedItem"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "parryRating"
  | "poison"
  | "poisonChance"
  | "poisonDuration"
  | "poisonMagnitude"
  | "powerLevel"
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
  | "reserveRegenerationRateReduction"
  | "selectedTrait"
  | "showDamagePerSecond"
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
  | "unlockedMasteries"
  | "wildernesses";

export const TRAIT_TYPES = [
  "brawler",
  "bruiser",
  "colossus",
  "executioner",
  "inoculated",
  "nudist",
  "sharpshooter",
  "shredder",
  "stalwart",
  "tank",
] as const;
export type Trait = (typeof TRAIT_TYPES)[number];

export const TRINKET_TYPES = [
  "ammunition pouch",
  "antique coin",
  "compass",
  "ender hook",
  "hearthstone",
  "familiar",
  "journal",
  "knapsack",
  "torn manuscript",
] as const;
export type Trinket = (typeof TRINKET_TYPES)[number];

export const TRIUMPH_TYPES = [
  "decipheringJournal",
  "settingName",
  "survivingNoGear",
  "survivingNoAttributes",
  "killingOneStrike",
  "killingStage",
  "damage",
  "protection",
  "essenceCount",
  "hiringBlacksmithFirst",
  "acquiringArcheryFirst",
  "attributesUnlockingAll",
  "skillsAll",
  "masteriesAll",
  "traitsAll",
  "acquiringAntiqueCoin",
  "killingResDominus",
  "visitingVoid",
  "powerLevelUltra",
  "stagesEnd",
  "acquiringFamiliar",
  "killingResCogitans",
  "deciding",
  "completing",
] as const;
type Triumph = (typeof TRIUMPH_TYPES)[number];

export type WeaponAbility = "bleed" | "parry" | "stun";
