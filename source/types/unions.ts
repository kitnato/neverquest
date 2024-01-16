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

export const CREW_MEMBER_TYPES = [
  "merchant",
  "medic",
  "tailor",
  "blacksmith",
  "mercenary",
  "fletcher",
  "occultist",
  "alchemist",
  "witch",
] as const;
export type CrewMember = (typeof CREW_MEMBER_TYPES)[number];

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
  | "essenceLoot"
  | "executionThreshold"
  | "finesseProgress"
  | "frailty"
  | "hatchingProgress"
  | "healthMaximum"
  | "healthRegenerationAmount"
  | "healthRegenerationRate"
  | "infusionLevel"
  | "marksmanshipProgress"
  | "mightProgress"
  | "monsterDamageAiling"
  | "monsterHealth"
  | "monsterHealthMaximum"
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

export const INFUSABLE_TYPES = ["mysterious egg", "eldritch codex"] as const;
export type Infusable = (typeof INFUSABLE_TYPES)[number];

export type Inheritable = Infusable | Relic;

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

export const PERK_TYPES = ["essenceBonus", "monsterReduction"] as const;
export type Perk = (typeof PERK_TYPES)[number];

export type Quest = Conquest | Routine | Triumph;

export const QUEST_BONUS_TYPES = ["healthBonus", "staminaBonus", "damageBonus"] as const;
export type QuestBonus = (typeof QUEST_BONUS_TYPES)[number];

export const QUEST_CLASS_TYPES = ["conquest", "routine", "triumph"] as const;
export type QuestClass = (typeof QUEST_CLASS_TYPES)[number];

export type QuestStatus = QuestBonus | "achieved" | "incomplete";

export type Reserve = "health" | "stamina";

export const ROUTINE_TYPES = [
  "purchasingItem",
  "equippingWeapon",
  "equippingArmor",
  "equippingShield",
  "stages",
  "knapsackExpanding",
  "powerLevel",
  "purchasingConsumable",
  "selling",
  "buyingBack",
  "spendingEssence",
  "warpingWilderness",
  "warpingCaravan",
  "flatlining",
  "scavengingCorpse",
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
  "attributesIncreasing",
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

export type Showing =
  | "armor"
  | "attackRate"
  | "capabilities"
  | "crewMemberHiring"
  | "damage"
  | "essence"
  | "gearClass"
  | "gearLevel"
  | "grip"
  | "health"
  | "location"
  | "lootedEssenceProgress"
  | "monsterOffense"
  | "offhand"
  | "protection"
  | "recovery"
  | "stamina"
  | "weapon"
  | "weight"
  | "wildernessStatus";

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
  "memetics",
  "meditation",
] as const;
export type Skill = (typeof SKILL_TYPES)[number];

export type StateKey =
  | Gear
  | "absorbedEssence"
  | "acquiredItems"
  | "acquiredSkills"
  | "acquiredTraits"
  | "activeCrewMember"
  | "activeQuests"
  | "ammunition"
  | "ammunitionCapacity"
  | "areAttributesAffordable"
  | "attackDuration"
  | "attackRate"
  | "attributePoints"
  | "attributePowerBonus"
  | "attributeRank"
  | "attributeStatistic"
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
  | "canAutoProgress"
  | "canBlock"
  | "canCompleteQuests"
  | "canDodge"
  | "canReceiveAilment"
  | "canReceiveAilments"
  | "canTrackQuests"
  | "canTrainMastery"
  | "completedQuestsCount"
  | "consciousness"
  | "corpse"
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
  | "frailty"
  | "gems"
  | "hasEnoughAmmunition"
  | "hasFlatlined"
  | "hasLooted"
  | "hasMonsterClosed"
  | "health"
  | "healthMaximum"
  | "healthMaximumPoisoned"
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
  | "isHealthAtMaximum"
  | "isHealthLow"
  | "isHired"
  | "isInexhaustible"
  | "isInfusionAtMaximum"
  | "isInventoryOpen"
  | "isInvulnerable"
  | "isLootAvailable"
  | "isLooting"
  | "isMasteryAtMaximum"
  | "isMonsterAiling"
  | "isMonsterAtFullHealth"
  | "isMonsterDead"
  | "isMonsterNew"
  | "isMonsterRegenerating"
  | "isPoisoned"
  | "isRecovering"
  | "isRegenerating"
  | "isShowing"
  | "isShowingQuestBonus"
  | "isSkillAcquired"
  | "isSpinning"
  | "isStageCompleted"
  | "isStageStarted"
  | "isStaminaAtMaximum"
  | "isTraitAcquired"
  | "itemsLoot"
  | "knapsackCapacity"
  | "location"
  | "locationName"
  | "lootingDuration"
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
  | "monsterRegenerationDuration"
  | "name"
  | "notifyOverEncumbrance"
  | "ownedItem"
  | "parryAbsorption"
  | "parryChance"
  | "parryDamage"
  | "parryRating"
  | "perkEffect"
  | "poisonChance"
  | "poisonDuration"
  | "poisonLength"
  | "poisonMagnitude"
  | "powerLevel"
  | "progress"
  | "progressMaximum"
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

export const RELIC_TYPES = [
  "ammunition pouch",
  "compass",
  "ender hook",
  "familiar",
  "hearthstone",
  "journal",
  "knapsack",
  "memento",
  "spinning wheel",
  "thaumaturgic goggles",
  "torn manuscript",
] as const;
export type Relic = (typeof RELIC_TYPES)[number];

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
  "attributesUnlocking",
  "skillsAll",
  "masteriesAll",
  "traitsAll",
  "acquiringMemento",
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
