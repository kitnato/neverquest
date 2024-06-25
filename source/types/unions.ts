const ELEMENTAL_AILMENT_TYPES = ["burning", "frozen", "shocked"] as const
export type ElementalAilment = (typeof ELEMENTAL_AILMENT_TYPES)[number]

export const AILMENT_TYPES = [
	"bleeding",
	"staggered",
	"stunned",
	...ELEMENTAL_AILMENT_TYPES,
] as const

export type Ailment = (typeof AILMENT_TYPES)[number]
export const ATTRIBUTE_TYPES = [
	"strength",
	"speed",
	"vitality",
	"endurance",
	"vigor",
	"dexterity",
	"perception",
	"agility",
] as const
export type Attribute = (typeof ATTRIBUTE_TYPES)[number]

export type Capability = "attributes" | "skills" | "traits"

export const CONSUMABLE_TYPES = ["antidote", "bandages", "elixir", "salve", "phylactery"] as const
export type Consumable = (typeof CONSUMABLE_TYPES)[number]

export const CONQUEST_TYPES = [
	"killing",
	"looting",
	"blocking",
	"killingBoss",
	"killingEnraged",
	"killingLowHealth",
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
	"distantKilling",
	"burning",
	"freezing",
	"shocking",
	"thorns",
	"thornsKill",
	"poisoning",
	"blighting",
] as const
export type Conquest = (typeof CONQUEST_TYPES)[number]

export const CREW_MEMBER_TYPES = [
	"merchant",
	"medic",
	"tailor",
	"blacksmith",
	"mercenary",
	"fletcher",
	"witch",
	"alchemist",
	"occultist",
] as const
export type CrewMember = (typeof CREW_MEMBER_TYPES)[number]

export type Delta =
	Attribute
	| Mastery
	| QuestBonus
	| QuestClass
	| Reserve
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
	| "healthRegenerationRate"
	| "infusionLevel"
	| "lifeLeech"
	| "marksmanshipProgress"
	| "mightProgress"
	| "monsterAttackRate"
	| "monsterDamage"
	| "monsterHealth"
	| "monsterHealthMaximum"
	| "munitions"
	| "munitionsCapacity"
	| "parryRating"
	| "powerLevel"
	| "progress"
	| "protection"
	| "rage"
	| "range"
	| "recoveryRate"
	| "resilienceProgress"
	| "stabilityProgress"
	| "stage"
	| "staggerRating"
	| "staminaMaximum"
	| "staminaRegenerationRate"
	| "stunRating"
	| "thorns"

export const ELEMENTAL_TYPES = ["lightning", "fire", "ice"] as const
export type Elemental = (typeof ELEMENTAL_TYPES)[number]

export type Extent = "high" | "low" | "medium"

export const FINALITY_TYPES = ["res cogitans", "res dominus"] as const
export type Finality = (typeof FINALITY_TYPES)[number]

export type FletcherOption = "munitions" | "ranged"

export const GEAR_TYPES = ["weapon", "armor", "shield"] as const
export type Gear = (typeof GEAR_TYPES)[number]

export const GEM_TYPES = ["amethyst", "ruby", "sapphire"] as const
export type Gem = (typeof GEM_TYPES)[number]

export const GRIP_TYPES = ["one-handed", "two-handed"] as const
export type Grip = (typeof GRIP_TYPES)[number]

export const INFUSABLE_TYPES = ["eldritch codex", "mysterious egg"] as const
export type Infusable = (typeof INFUSABLE_TYPES)[number]

export type Inheritable = Infusable | Relic

export const MASTERY_TYPES = [
	"butchery",
	"cruelty",
	"finesse",
	"marksmanship",
	"might",
	"resilience",
	"stability",
] as const
export type Mastery = (typeof MASTERY_TYPES)[number]

export type NumberFormat =
	| "abbreviated"
	| "float"
	| "integer"
	| "multiplier"
	| "percentage"
	| "time"

export const PERK_TYPES = ["essenceBonus", "monsterReduction", "startingEssence"] as const
export type Perk = (typeof PERK_TYPES)[number]

export type Quest = Conquest | Routine | Triumph

export const QUEST_BONUS_TYPES = ["healthBonus", "staminaBonus", "damageBonus"] as const
export type QuestBonus = (typeof QUEST_BONUS_TYPES)[number]

export const QUEST_CLASS_TYPES = ["conquest", "routine", "triumph"] as const
export type QuestClass = (typeof QUEST_CLASS_TYPES)[number]

export type QuestStatus = QuestBonus | "complete" | "incomplete"

export type Reserve = "health" | "stamina"

export const ROUTINE_TYPES = [
	"settingName",
	"purchasingInheritable",
	"equipping",
	"stages",
	"knapsackExpanding",
	"powerLevel",
	"purchasingConsumable",
	"selling",
	"buyingBack",
	"spendingEssence",
	"discarding",
	"eradicating",
	"warpingWilderness",
	"warpingCaravan",
	"retreating",
	"bandaging",
	"flatlining",
	"scavengingCorpse",
	"hiring",
	"crafting",
	"acquiringGems",
	"gemsApplying",
	"gemsApplyingAll",
	"gemsTransmuting",
	"potions",
	"acquiringRanged",
	"munitionsCrafting",
	"acquiringTwoHanded",
	"fillingLacrimatory",
	"infusing",
	"attributesUnlocking",
	"attributesIncreasing",
	"skillsTraining",
	"skillsCraft",
	"masteriesUnlocking",
	"masteriesRank",
	"resurrecting",
	"retiring",
	"purgingEssence",
	"purgingMemories",
	"traits",
] as const
export type Routine = (typeof ROUTINE_TYPES)[number]

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
	| "wildernessStatus"

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
	"impermeability",
] as const
export type Skill = (typeof SKILL_TYPES)[number]

export const TRAIT_TYPES = [
	"acanthaceous",
	"brawler",
	"bruiser",
	"colossus",
	"executioner",
	"nudist",
	"sharpshooter",
	"shredder",
	"stalwart",
	"tank",
	"inoculated",
] as const
export type Trait = (typeof TRAIT_TYPES)[number]

export const RELIC_TYPES = [
	"[S751NQ]",
	"munitions satchel",
	"automincer",
	"compass",
	"ender hook",
	"dream catcher",
	"familiar",
	"hearthstone",
	"journal",
	"knapsack",
	"lacrimatory",
	"memento",
	"thaumaturgic goggles",
	"torn manuscript",
	"war mask",
] as const
export type Relic = (typeof RELIC_TYPES)[number]

export const TRIUMPH_TYPES = [
	"deciphering",
	"settingSubjectName",
	"survivingNoGear",
	"survivingNoAttributes",
	"killingOneStrike",
	"killingStage",
	"damage",
	"protection",
	"noRecovery",
	"essenceCount",
	"masteriesRankMaximum",
	"hiringBlacksmithFirst",
	"acquiringArcheryFirst",
	"acquiringMemento",
	"acquiringTornManuscript",
	"acquiringDreamCatcher",
	"infusingMaximum",
	"killingResDominus",
	"killingResDominusNoTraits",
	"visitingVoid",
	"acquiringFamiliar",
	"killingResCogitans",
	"deciding",
	"acquiringLogEntry",
	"completing",
] as const
type Triumph = (typeof TRIUMPH_TYPES)[number]

export type WeaponAbility = "bleed"
	| "parry" | "stun"
