import { LABEL_UNKNOWN, LEVELLING_END, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { MUNITIONS, TEARS_MAXIMUM } from "@neverquest/data/items"
import IconConquest from "@neverquest/icons/conquest.svg?react"
import IconRoutine from "@neverquest/icons/routine.svg?react"
import IconTriumph from "@neverquest/icons/triumph.svg?react"
import {
	ATTRIBUTE_TYPES,
	CONQUEST_TYPES,
	CREW_MEMBER_TYPES,
	MASTERY_TYPES,
	type Quest,
	type QuestClass,
	ROUTINE_TYPES,
	SKILL_TYPES,
	type Skill,
	TRAIT_TYPES,
	TRIUMPH_TYPES,
} from "@neverquest/types/unions"
import { formatEnumeration, formatNumber } from "@neverquest/utilities/formatters"

import type { SVGIcon } from "@neverquest/types/components"

export const QUEST_CLASS_ICONS: Record<QuestClass, SVGIcon> = {
	conquest: IconConquest,
	routine: IconRoutine,
	triumph: IconTriumph,
}

export const QUEST_COMPLETION_BONUS: Record<QuestClass, number> = {
	conquest: 0.02,
	routine: 0.01,
	triumph: 0.03,
}

export const QUEST_NOTIFICATION_DURATION = 5000

export const QUEST_REQUIREMENTS = {
	damage: 2000,
	essenceCount: 7575,
	monstersKilled: 75,
	protection: 900,
	skillsCraft: ["armorcraft", "shieldcraft", "siegecraft"] as Skill[],
	survivingNoAttributes: 7,
	survivingNoGear: 7,
}

export const QUEST_TYPES_BY_CLASS = {
	conquest: CONQUEST_TYPES,
	routine: ROUTINE_TYPES,
	triumph: TRIUMPH_TYPES,
}

export const QUESTS: Record<
	Quest,
	{
		description: string
		hidden?: string
		progression: [number, ...number[]]
		requiresTracking: boolean
		title: string
	}
> = {
	acquiringArcheryFirst: {
		description: "Acquire archery as the first skill.",
		progression: [1],
		requiresTracking: true,
		title: "Ranger",
	},
	acquiringDreamCatcher: {
		description: `Acquire the ${LABEL_UNKNOWN}`,
		hidden: "dream catcher.",
		progression: [1],
		requiresTracking: false,
		title: "Deceptively useful",
	},
	acquiringFamiliar: {
		description: `Acquire the ${LABEL_UNKNOWN}`,
		hidden: "familiar.",
		progression: [1],
		requiresTracking: false,
		title: "Companionship",
	},
	acquiringGems: {
		description: "Acquire @ gems.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Shiny",
	},
	acquiringLogEntry: {
		description: `Find the ${LABEL_UNKNOWN}`,
		hidden: "log entry.",
		progression: [1],
		requiresTracking: false,
		title: "[ABNORMAL SEQUENCE TERMINATION]",
	},
	acquiringMemento: {
		description: `Acquire the ${LABEL_UNKNOWN}`,
		hidden: "memento.",
		progression: [1],
		requiresTracking: false,
		title: "Subversive",
	},
	acquiringRanged: {
		description: "Acquire a ranged weapon.",
		progression: [1],
		requiresTracking: true,
		title: "Sniper",
	},
	acquiringTornManuscript: {
		description: `Acquire the ${LABEL_UNKNOWN}`,
		hidden: "torn manuscript.",
		progression: [1],
		requiresTracking: false,
		title: "What is the cipher?",
	},
	acquiringTwoHanded: {
		description: "Acquire a two-handed weapon.",
		progression: [1],
		requiresTracking: true,
		title: "Highlander",
	},
	attributesIncreasing: {
		description: "Increase all attributes at least once.",
		progression: [ATTRIBUTE_TYPES.length],
		requiresTracking: true,
		title: "Polymath",
	},
	attributesUnlocking: {
		description: "Unlock all attributes.",
		progression: [ATTRIBUTE_TYPES.length],
		requiresTracking: false,
		title: "Jack of all",
	},
	bandaging: {
		description: "Use @ bandages.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Mummified",
	},
	bleeding: {
		description: "Inflict bleed @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Bloodlust",
	},
	bleedingKill: {
		description: "Kill @ monsters with bleed damage.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Phlebotomized",
	},
	blighting: {
		description: "Become blighted @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Coughing blood",
	},
	blocking: {
		description: "Block @ attacks.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "None shall pass",
	},
	burning: {
		description: "Inflict burning @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Kindling",
	},
	buyingBack: {
		description: "Buy back an item.",
		progression: [1],
		requiresTracking: true,
		title: "I changed my mind",
	},
	completing: {
		description: "Complete all quests",
		// See line 677.
		progression: [0],
		requiresTracking: true,
		title: "Completionist",
	},
	crafting: {
		description: "Craft @ items.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Factory",
	},
	critical: {
		description: "Inflict @ critical strikes.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Brutality",
	},
	criticalKilling: {
		description: "Kill @ monsters with a critical strike.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Fatality",
	},
	damage: {
		description: `Have at least ${formatNumber({
			value: QUEST_REQUIREMENTS.damage,
		})} total damage.`,
		progression: [QUEST_REQUIREMENTS.damage],
		requiresTracking: true,
		title: "Annihilator",
	},
	deciding: {
		description: `Decide to ${LABEL_UNKNOWN}`,
		hidden: "keep grinding.",
		progression: [1],
		requiresTracking: false,
		title: "Parable of Stanislav",
	},
	decipheringJournal: {
		description: "Decipher the journal.",
		progression: [1],
		requiresTracking: false,
		title: "Epiphany",
	},
	deflecting: {
		description: "Deflect @ ailments.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Incorruptible",
	},
	discarding: {
		description: "Discard @ items.",
		progression: [3],
		requiresTracking: true,
		title: "Litterbug",
	},
	distantKilling: {
		description: "Kill @ monsters at range.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Headshot",
	},
	dodging: {
		description: "Dodge @ attacks.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Grim fandango",
	},
	equippingArmor: {
		description: "Equip armor.",
		progression: [1],
		requiresTracking: true,
		title: "Locked & loaded",
	},
	equippingShield: {
		description: "Equip a shield.",
		progression: [1],
		requiresTracking: true,
		title: "This doesn't give protection?",
	},
	equippingWeapon: {
		description: "Equip a weapon.",
		progression: [1],
		requiresTracking: true,
		title: "Armed & dangerous",
	},
	eradicating: {
		description: "Eradicate @ items.",
		progression: [3],
		requiresTracking: true,
		title: "Vanishing act",
	},
	essenceCount: {
		description: `Have exactly ${formatNumber({
			value: QUEST_REQUIREMENTS.essenceCount,
		})} essence.`,
		progression: [1],
		requiresTracking: true,
		title: "Hangover",
	},
	executing: {
		description: "Execute @ monsters.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Capital punishment",
	},
	exhausting: {
		description: "Be too exhausted to attack, dodge, parry, block or stagger @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Wheeze",
	},
	fillingLacrimatory: {
		description: "Fill the lacrimatory",
		progression: [TEARS_MAXIMUM],
		requiresTracking: false,
		title: "Lilith & Niobe",
	},
	flatlining: {
		description: "Die.",
		progression: [1, 3, 5],
		requiresTracking: true,
		title: "Flatliner",
	},
	freezing: {
		description: "Inflict frozen @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Air conditioning",
	},
	gemsApplying: {
		description: "Socket @ gems.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Jeweller",
	},
	gemsApplyingAll: {
		description: "Have at least one gem in every equipped piece of gear.",
		progression: [1],
		requiresTracking: true,
		title: "Trifecta",
	},
	gemsTransmuting: {
		description: "Transmute any gems.",
		progression: [1],
		requiresTracking: true,
		title: "Better than mining",
	},
	hiring: {
		description: "Hire @ caravan crew members.",
		progression: [2, 5],
		requiresTracking: true,
		title: "Don't forget the doctor",
	},
	hiringAll: {
		description: "Hire all caravan crew members.",
		progression: [CREW_MEMBER_TYPES.length - 1],
		requiresTracking: true,
		title: "Haven't died of dysentery",
	},
	hiringBlacksmithFirst: {
		description: "Hire the blacksmith as the first crew member.",
		progression: [1],
		requiresTracking: true,
		title: "Straight to the good stuff",
	},
	infusing: {
		description: "Gain @ infusion levels.",
		progression: [5, 15, 30, 60],
		requiresTracking: false,
		title: "Voodoo",
	},
	infusingMaximum: {
		description: "Infuse an item to its maximum level.",
		progression: [1],
		requiresTracking: false,
		title: "Witch doctor",
	},
	killing: {
		description: "Kill @ monsters.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Monstrocide",
	},
	killingBoss: {
		description: "Kill @ boss monsters.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Giant killer",
	},
	killingEnraged: {
		description: "Kill @ enraged monsters.",
		progression: [5, 15],
		requiresTracking: true,
		title: "Tranquilizer",
	},
	killingLowHealth: {
		description: "Kill @ monsters while at low health.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Against all odds",
	},
	killingOneStrike: {
		description:
			"Kill a monster in one strike while at equal or lower power level than the current stage.",
		progression: [1],
		requiresTracking: true,
		title: "One Punch Person",
	},
	killingResCogitans: {
		description: `Defeat ${LABEL_UNKNOWN}`,
		hidden: "the thinking being.",
		progression: [1],
		requiresTracking: false,
		title: "Veritas tenebris",
	},
	killingResDominus: {
		description: "Defeat the dominant being.",
		progression: [1],
		requiresTracking: true,
		title: "Back to reality",
	},
	killingResDominusNoTraits: {
		description: "Defeat the dominant being without having any traits.",
		progression: [1],
		requiresTracking: true,
		title: "No rest for the wicked",
	},
	killingStage: {
		description: "Kill @ monsters in one stage.",
		progression: [QUEST_REQUIREMENTS.monstersKilled],
		requiresTracking: true,
		title: "Killing spree",
	},
	knapsackExpanding: {
		description: "Expand knapsack capacity @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: false,
		title: "Deep pockets",
	},
	looting: {
		description: "Collect loot @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Hoarder",
	},
	masteries: {
		description: "Unlock masteries.",
		progression: [1, 3],
		requiresTracking: true,
		title: "Apprentice",
	},
	masteriesAll: {
		description: "Unlock all masteries.",
		progression: [MASTERY_TYPES.length],
		requiresTracking: true,
		title: "Guru",
	},
	masteriesRank: {
		description: "Rank up masteries @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Practice makes perfect",
	},
	masteriesRankMaximum: {
		description: "Rank up a mastery to its maximum.",
		progression: [1],
		requiresTracking: true,
		title: "Virtuoso",
	},
	munitionsCrafting: {
		description: "Expand munitions satchel capacity @ times.",
		progression: [5, 15, 30, MUNITIONS.maximum - MUNITIONS.satchelCapacity],
		requiresTracking: false,
		title: "Quivering",
	},
	parrying: {
		description: "Parry @ attacks.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Stop hitting yourself",
	},
	parryingKill: {
		description: "Kill @ monsters with parry damage.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Nani?",
	},
	poisoning: {
		description: "Become poisoned @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Just a cough",
	},
	potions: {
		description: "Consume @ witch's concoctions.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Intestinal discomfort",
	},
	powerLevel: {
		description: "Reach power level @.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "One up",
	},
	powerLevelUltra: {
		description: `Reach power level ${formatNumber({
			value: LEVELLING_END,
		})}.`,
		progression: [LEVELLING_END],
		requiresTracking: true,
		title: `It's over ${formatNumber({ value: 9000 })}!`,
	},
	protection: {
		description: `Have at least ${formatNumber({
			value: QUEST_REQUIREMENTS.protection,
		})} protection.`,
		progression: [QUEST_REQUIREMENTS.protection],
		requiresTracking: true,
		title: "I like turtles",
	},
	purchasingConsumable: {
		description: "Purchase @ consumable items.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Target customer",
	},
	purchasingItem: {
		description: "Purchase @ gear items or relics.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "Reliquary",
	},
	purgingEssence: {
		description: "Undergo the essence purge ritual.",
		progression: [1, 3],
		requiresTracking: true,
		title: "Clean as a whistle",
	},
	purgingMemories: {
		description: "Undergo the memory purge ritual.",
		progression: [1, 3],
		requiresTracking: true,
		title: "Who? What? Where?",
	},
	resurrecting: {
		description: "Resurrect with a phylactery.",
		progression: [1, 5, 15],
		requiresTracking: true,
		title: "Lich king",
	},
	retiring: {
		description: "Go into retirement @ times.",
		progression: [3, 6, TRAIT_TYPES.length],
		requiresTracking: false,
		title: "Getting too old for this",
	},
	retreating: {
		description: "Retreat @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Thou needeth a wet-nurse",
	},
	scavengingCorpse: {
		description: "Scavenge corpses.",
		progression: [1, 3, 5],
		requiresTracking: true,
		title: "Necrophage",
	},
	selling: {
		description: "Sell an item.",
		progression: [1],
		requiresTracking: true,
		title: "Hustler",
	},
	settingName: {
		description: "Set a name.",
		progression: [1],
		requiresTracking: false,
		title: "Humble beginnings",
	},
	settingSubjectName: {
		description: "Set the true name.",
		progression: [1],
		requiresTracking: true,
		title: "Red pill",
	},
	shocking: {
		description: "Inflict the shocking ailment @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Raiden",
	},
	skills: {
		description: "Acquire skills.",
		progression: [1, 3, 7],
		requiresTracking: true,
		title: "Prodigy",
	},
	skillsAll: {
		description: "Acquire all skills.",
		progression: [SKILL_TYPES.length],
		requiresTracking: true,
		title: "The GOAT",
	},
	skillsCraft: {
		description: `Acquire the ${formatEnumeration(QUEST_REQUIREMENTS.skillsCraft)} skills.`,
		progression: [QUEST_REQUIREMENTS.skillsCraft.length],
		requiresTracking: true,
		title: "Warcraft",
	},
	spendingEssence: {
		description: "Spend @ essence.",
		progression: [100, 500, 1000, 2500, 5000, 10_000, 25_000],
		requiresTracking: true,
		title: "High roller",
	},
	stages: {
		description: "Reach stage @.",
		progression: [5, 15, 30, 60, LEVELLING_MAXIMUM],
		requiresTracking: true,
		title: "Sisyphean expedition",
	},
	stagesEnd: {
		description: `Reach stage ${formatNumber({ value: LEVELLING_END })}.`,
		progression: [LEVELLING_END],
		requiresTracking: true,
		title: "Does it end?",
	},
	staggering: {
		description: "Stagger monsters @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Stop wiggling",
	},
	stunning: {
		description: "Stun monsters @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Brain damage",
	},
	survivingNoAttributes: {
		description: `Complete the first ${formatNumber({
			value: QUEST_REQUIREMENTS.survivingNoAttributes,
		})} stages without spending any attribute points.`,
		progression: [QUEST_REQUIREMENTS.survivingNoAttributes],
		requiresTracking: true,
		title: "Deep throat",
	},
	survivingNoGear: {
		description: `Complete the first ${formatNumber({
			value: QUEST_REQUIREMENTS.survivingNoGear,
		})} stages without any gear equipped.`,
		progression: [QUEST_REQUIREMENTS.survivingNoGear],
		requiresTracking: true,
		title: "Going commando",
	},
	thorns: {
		description: "Inflict thorns damage @ times.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Cactus",
	},
	thornsKill: {
		description: "Kill @ monsters with thorns damage.",
		progression: [5, 15, 30, 60],
		requiresTracking: true,
		title: "Blue-shelling",
	},
	traits: {
		description: "Acquire traits.",
		progression: [1, 3, 6],
		requiresTracking: false,
		title: "Getting ink done",
	},
	traitsAll: {
		description: "Acquire all traits.",
		progression: [TRAIT_TYPES.length],
		requiresTracking: false,
		title: "Come at me",
	},
	visitingVoid: {
		description: "Visit nothingness.",
		progression: [1],
		requiresTracking: true,
		title: "Voidseeker",
	},
	warpingCaravan: {
		description: "Warp to the caravan @ times.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "... And back again",
	},
	warpingWilderness: {
		description: "Navigate to a different wilderness @ times.",
		progression: [5, 15, 30],
		requiresTracking: true,
		title: "There ...",
	},
}

export const QUESTS_COUNT = {
	conquest: QUEST_TYPES_BY_CLASS.conquest.reduce(
		(sum, quest) => sum + QUESTS[quest].progression.length,
		0,
	),
	routine: QUEST_TYPES_BY_CLASS.routine.reduce(
		(sum, quest) => sum + QUESTS[quest].progression.length,
		0,
	),
	triumph: QUEST_TYPES_BY_CLASS.triumph.reduce(
		(sum, quest) => sum + QUESTS[quest].progression.length,
		0,
	),
}

QUESTS.completing.progression = [
	Object.values(QUESTS_COUNT).reduce((sum, questCount) => sum + questCount, 0),
]
