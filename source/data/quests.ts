import { TAILORING } from "@neverquest/data/caravan";
import { LABEL_UNKNOWN, LEVELLING_CUTOFF, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
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
} from "@neverquest/types/unions";
import { formatEnumeration, formatNumber } from "@neverquest/utilities/formatters";

export const QUEST_CLASS_ICONS: Record<QuestClass, SVGIcon> = {
  conquest: IconConquest,
  routine: IconRoutine,
  triumph: IconTriumph,
};

export const QUEST_COMPLETION_BONUS = 0.01;

export const QUEST_NOTIFICATION_DURATION = 5000;

export const QUEST_REQUIREMENTS = {
  damage: 2000,
  essenceCount: 777,
  monstersKilled: 77,
  protection: 1500,
  skillsCraft: ["armorcraft", "shieldcraft", "siegecraft"] as Skill[],
  survivingNoAttributes: 7,
  survivingNoGear: 7,
};

export const QUEST_TYPES_BY_CLASS = {
  conquest: CONQUEST_TYPES,
  routine: ROUTINE_TYPES,
  triumph: TRIUMPH_TYPES,
};

export const QUESTS: Record<
  Quest,
  {
    description: string;
    hidden?: string;
    progression: [number, ...number[]];
    requiresTracking: boolean;
    title: string;
  }
> = {
  acquiringArcheryFirst: {
    description: "Acquire archery as the first skill.",
    progression: [1],
    requiresTracking: true,
    title: "Ranger",
  },
  acquiringDreamCatcher: {
    description: `Acquire the ${LABEL_UNKNOWN}.`,
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
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Shiny",
  },
  acquiringLogEntry: {
    description: `Acquire the ${LABEL_UNKNOWN}`,
    hidden: "log entry.",
    progression: [1],
    requiresTracking: false,
    title: "[ABNORMAL SEQUENCE TERMINATION]",
  },
  acquiringMemento: {
    description: `Acquire the ${LABEL_UNKNOWN}.`,
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
    description: `Acquire the ${LABEL_UNKNOWN}.`,
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
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Mummified",
  },
  bleeding: {
    description: "Inflict bleed @ times.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Bloodlust",
  },
  bleedingKill: {
    description: "Kill @ monsters with bleed damage.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Phlebotomizing",
  },
  blighting: {
    description: "Become blighted @ times.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Coughing blood",
  },
  blocking: {
    description: "Block @ attacks.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "None shall pass",
  },
  burning: {
    description: "Inflict burning @ times.",
    progression: [3, 10, 25, 50],
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
    progression: [0],
    requiresTracking: true,
    title: "Completionist",
  },
  crafting: {
    description: "Craft @ items.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Factory",
  },
  critical: {
    description: "Inflict @ critical strikes.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Brutality",
  },
  criticalKilling: {
    description: "Kill @ monsters with a critical strike.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Fatality",
  },
  damage: {
    description: `Have at least ${formatNumber({
      value: QUEST_REQUIREMENTS.damage,
    })} total damage.`,
    progression: [QUEST_REQUIREMENTS.damage],
    requiresTracking: true,
    title: "Destroyer",
  },
  deciding: {
    description: `Decide to ${LABEL_UNKNOWN}`,
    hidden: "keep grinding.",
    progression: [1],
    requiresTracking: true,
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
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Incorruptible",
  },
  discarding: {
    description: "Discard @ items.",
    progression: [3, 7],
    requiresTracking: true,
    title: "Litterbug",
  },
  distantKilling: {
    description: "Kill @ distant monsters.",
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Headshot",
  },
  dodging: {
    description: "Dodge @ attacks.",
    progression: [3, 10, 25, 50],
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
    progression: [3, 7],
    requiresTracking: true,
    title: "Vanishing act",
  },
  essenceCount: {
    description: `Have exactly ${formatNumber({
      value: QUEST_REQUIREMENTS.essenceCount,
    })} essence.`,
    progression: [1],
    requiresTracking: true,
    title: "Foggy memory",
  },
  executing: {
    description: "Execute @ monsters.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Capital punishment",
  },
  exhausting: {
    description: "Be too exhausted to attack, dodge, parry or block @ times.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Out of breath",
  },
  flatlining: {
    description: "Die.",
    progression: [1, 3, 5],
    requiresTracking: true,
    title: "Flatliner",
  },
  freezing: {
    description: "Inflict frozen @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Air conditioning",
  },
  gemsApplying: {
    description: "Socket @ gems.",
    progression: [3, 10, 25],
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
    progression: [3, 6],
    requiresTracking: true,
    title: "Don't forget the doctor",
  },
  hiringAll: {
    description: "Hire all caravan crew members.",
    progression: [CREW_MEMBER_TYPES.length],
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
    progression: [3, 10, 25, 50],
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
    progression: [3, 10, 25, 50, 100, 250],
    requiresTracking: true,
    title: "Monstrocide",
  },
  killingBoss: {
    description: "Kill @ boss monsters.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Giant killer",
  },
  killingEnraged: {
    description: "Kill @ enraged monsters.",
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Tranquilizer",
  },
  killingLowHealth: {
    description: "Kill @ monsters while at low health.",
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Against all odds",
  },
  killingOneStrike: {
    description:
      "Kill a monster in one strike while at equal or lower power level than the current stage.",
    progression: [1],
    requiresTracking: true,
    title: "One Punch",
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
    requiresTracking: false,
    title: "Back to reality",
  },
  killingStage: {
    description: "Kill @ monsters in one stage.",
    progression: [QUEST_REQUIREMENTS.monstersKilled],
    requiresTracking: true,
    title: "Killing spree",
  },
  knapsackExpanding: {
    description: "Expand knapsack capacity.",
    progression: [
      TAILORING.knapsack.amount * 3,
      TAILORING.knapsack.amount * 10,
      TAILORING.knapsack.amount * 25,
      TAILORING.knapsack.amount * 50,
    ],
    requiresTracking: true,
    title: "Deep pockets",
  },
  looting: {
    description: "Collect loot @ times.",
    progression: [3, 10, 25, 50, 100, 250],
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
    description: "Rank up masteries.",
    progression: [1, 3, 10, 25, 50],
    requiresTracking: true,
    title: "Practice makes perfect",
  },
  masteriesRankMaximum: {
    description: "Rank up a mastery to its maximum.",
    progression: [1],
    requiresTracking: true,
    title: "Virtuoso",
  },
  parrying: {
    description: "Parry @ attacks.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Stop hitting yourself",
  },
  parryingKill: {
    description: "Kill @ monsters with parry damage.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "Nani?",
  },
  poisoning: {
    description: "Become poisoned @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Just a cough",
  },
  potions: {
    description: "Consume @ witch's concoctions.",
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Intestinal discomfort",
  },
  powerLevel: {
    description: "Reach power level @.",
    progression: [3, 10, 25, 50],
    requiresTracking: true,
    title: "One up",
  },
  powerLevelUltra: {
    description: `Reach power level ${formatNumber({
      value: LEVELLING_CUTOFF,
    })}.`,
    progression: [LEVELLING_CUTOFF],
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
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "Target customer",
  },
  purchasingItem: {
    description: "Purchase @ gear items and relics.",
    progression: [3, 10, 25],
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
    title: "What? Who? Where?",
  },
  resurrecting: {
    description: "Resurrect with a phylactery.",
    progression: [1, 3, 10],
    requiresTracking: true,
    title: "Lich king",
  },
  retiring: {
    description: "Go into retirement.",
    progression: [3, 6, TRAIT_TYPES.length],
    requiresTracking: false,
    title: "Getting too old for this",
  },
  retreating: {
    description: "Retreat @ times.",
    progression: [3, 10, 25, 50],
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
    requiresTracking: true,
    title: "Humble beginnings",
  },
  settingPatientName: {
    description: "Set the true name.",
    progression: [1],
    requiresTracking: true,
    title: "Red pill",
  },
  shocking: {
    description: "Inflict the shocking ailment @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Raiden",
  },
  skills: {
    description: "Acquire skills.",
    progression: [1, 3, 7],
    requiresTracking: false,
    title: "Prodigy",
  },
  skillsAll: {
    description: "Acquire all skills.",
    progression: [SKILL_TYPES.length],
    requiresTracking: false,
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
    progression: [3, 10, 25, 50, LEVELLING_MAXIMUM],
    requiresTracking: true,
    title: "Sisyphean expedition",
  },
  stagesEnd: {
    description: `Reach stage ${formatNumber({ value: LEVELLING_CUTOFF })}.`,
    progression: [LEVELLING_CUTOFF],
    requiresTracking: true,
    title: "Does it end?",
  },
  staggering: {
    description: "Stagger @ monsters.",
    progression: [3, 10, 25, 50, 100],
    requiresTracking: true,
    title: "Stop wiggling",
  },
  stunning: {
    description: "Stun @ monsters.",
    progression: [3, 10, 25, 50, 100],
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
    progression: [3, 10, 25, 50, 100, 250],
    requiresTracking: true,
    title: "Cactus",
  },
  thornsKill: {
    description: "Kill @ monsters with thorns damage.",
    progression: [3, 10, 25, 50, 100],
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
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "... And Back Again",
  },
  warpingWilderness: {
    description: "Navigate to a different wilderness @ times.",
    progression: [3, 10, 25],
    requiresTracking: true,
    title: "There ...",
  },
};

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
};

QUESTS.completing.progression = [
  Object.values(QUESTS_COUNT).reduce((sum, questCount) => sum + questCount, 0),
];
