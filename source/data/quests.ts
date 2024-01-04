import { GROWTH_MAXIMUM, LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import {
  ATTRIBUTE_TYPES,
  CONQUEST_TYPES,
  CREW_TYPES,
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
  damage: 1500,
  essenceCount: 777,
  monstersKilled: 77,
  protection: 1000,
  skillsCraft: ["armorcraft", "shieldcraft", "siegecraft"] as Skill[],
  survivingNoAttributes: 7,
  survivingNoGear: 7,
};

export const QUEST_TYPES_BY_CLASS = {
  conquest: CONQUEST_TYPES,
  routine: ROUTINE_TYPES,
  triumph: TRIUMPH_TYPES,
};

export const QUEST_TYPES = Object.values(QUEST_TYPES_BY_CLASS).flat();

export const QUESTS: Record<
  Quest,
  {
    description: string;
    hidden?: string;
    progression: [number, ...number[]];
    requiresJournal: boolean;
    title: string;
  }
> = {
  acquiringAntiqueCoin: {
    description: "Acquire the antique coin.",
    progression: [1],
    requiresJournal: false,
    title: "Now what?",
  },
  acquiringArcheryFirst: {
    description: "Acquire archery as the first skill.",
    progression: [1],
    requiresJournal: true,
    title: "Ranger",
  },
  acquiringFamiliar: {
    description: `Acquire the ${LABEL_UNKNOWN}`,
    hidden: "familiar.",
    progression: [1],
    requiresJournal: false,
    title: "Companionship",
  },
  acquiringGems: {
    description: "Acquire @ gem(s).",
    progression: [1, 10, 25],
    requiresJournal: true,
    title: "Shiny",
  },
  acquiringRanged: {
    description: "Acquire a ranged weapon.",
    progression: [1],
    requiresJournal: true,
    title: "Sniper",
  },
  acquiringTwoHanded: {
    description: "Acquire a two-handed weapon.",
    progression: [1],
    requiresJournal: true,
    title: "Highlander",
  },
  attributesIncreasingAll: {
    description: "Increase all attributes at least once.",
    progression: [ATTRIBUTE_TYPES.length],
    requiresJournal: true,
    title: "Polymath",
  },
  attributesUnlockingAll: {
    description: "Unlock all attributes.",
    progression: [ATTRIBUTE_TYPES.length],
    requiresJournal: true,
    title: "Jack of all",
  },
  bandaging: {
    description: "Use @ bandages.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Mummified",
  },
  bleeding: {
    description: "Inflict bleed @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Bloodlust",
  },
  bleedingKill: {
    description: "Kill with bleed damage @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Phlebotomizing",
  },
  blighting: {
    description: "Become blighted @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Coughing blood",
  },
  blocking: {
    description: "Block attacks @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "None shall pass",
  },
  burning: {
    description: "Inflict burning @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Kindling",
  },
  buyingBack: {
    description: "Buy back an item.",
    progression: [1],
    requiresJournal: true,
    title: "I changed my mind",
  },
  completing: {
    description: "Complete all quests",
    progression: [0],
    requiresJournal: true,
    title: "Completionist",
  },
  crafting: {
    description: "Craft @ items.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Factory",
  },
  critical: {
    description: "Inflict @ critical strikes.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Brutality",
  },
  criticalKilling: {
    description: "Kill @ monster with a critical strike.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Fatality",
  },
  damage: {
    description: `Have at least ${formatNumber({
      value: QUEST_REQUIREMENTS.damage,
    })} total damage.`,
    progression: [QUEST_REQUIREMENTS.damage],
    requiresJournal: true,
    title: "Destroyer",
  },
  deciding: {
    description: `Decide to ${LABEL_UNKNOWN}`,
    hidden: "keep grinding.",
    progression: [1],
    requiresJournal: true,
    title: "Parable of Stanislav",
  },
  decipheringJournal: {
    description: "Decipher the journal.",
    progression: [1],
    requiresJournal: true,
    title: "Epiphany",
  },
  deflecting: {
    description: "Deflect @ ailments.",
    progression: [3, 10, 25],
    requiresJournal: true,
    title: "Incorruptible",
  },
  dodging: {
    description: "Dodge @ attacks.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Grim fandango",
  },
  equippingArmor: {
    description: "Equip a piece of armor.",
    progression: [1],
    requiresJournal: true,
    title: "Locked & loaded",
  },
  equippingShield: {
    description: "Equip a shield.",
    progression: [1],
    requiresJournal: true,
    title: "Stop, drop & roll",
  },
  equippingWeapon: {
    description: "Equip a weapon.",
    progression: [1],
    requiresJournal: true,
    title: "Armed & dangerous",
  },
  essenceCount: {
    description: `Have exactly ${formatNumber({
      value: QUEST_REQUIREMENTS.essenceCount,
    })} essence.`,
    progression: [1],
    requiresJournal: true,
    title: "Foggy memory",
  },
  executing: {
    description: "Execute @ monsters.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Capital punishment",
  },
  exhausting: {
    description: "Be too exhausted to attack, dodge, parry or block @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Out of breath",
  },
  freezing: {
    description: "Inflict frozen @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Air conditioning",
  },
  gemsApplying: {
    description: "Socket @ gem.",
    progression: [1, 3, 10, 25],
    requiresJournal: true,
    title: "Jeweller",
  },
  gemsApplyingAll: {
    description: "Have at least one gem in every equipped piece of gear.",
    progression: [1],
    requiresJournal: true,
    title: "Trifecta",
  },
  gemsTransmuting: {
    description: "Transmute any gems.",
    progression: [1],
    requiresJournal: true,
    title: "Better than mining",
  },
  hiring: {
    description: "Hire caravan @ crew members.",
    progression: [3, 10, 25],
    requiresJournal: true,
    title: "Don't forget the doctor",
  },
  hiringAll: {
    description: "Hire all caravan crew.",
    progression: [CREW_TYPES.length],
    requiresJournal: true,
    title: "Haven't died of dysentery",
  },
  hiringBlacksmithFirst: {
    description: "Hire the blacksmith as the first crew member.",
    progression: [1],
    requiresJournal: true,
    title: "Straight to the good stuff",
  },
  infusing: {
    description: "Infuse items by @ levels.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Shaman",
  },
  infusingMaximum: {
    description: "Infuse an item to its maximum level.",
    progression: [1],
    requiresJournal: true,
    title: "Witch doctor",
  },
  killing: {
    description: "Kill @ monsters.",
    progression: [3, 10, 25, 50, 100, 250],
    requiresJournal: true,
    title: "Murder",
  },
  killingBoss: {
    description: "Kill @ boss monsters.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Giant killer",
  },
  killingOneStrike: {
    description:
      "Kill a monster in one strike while at equal or lower power level than the current stage.",
    progression: [1],
    requiresJournal: true,
    title: "One Punch Person",
  },
  killingResCogitans: {
    description: `Defeat ${LABEL_UNKNOWN}`,
    hidden: "the thinking being.",
    progression: [1],
    requiresJournal: false,
    title: "Veritas tenebris",
  },
  killingResDominus: {
    description: "Defeat the dominant being.",
    progression: [1],
    requiresJournal: false,
    title: "Back to reality",
  },
  killingStage: {
    description: "Kill @ monsters in one stage.",
    progression: [QUEST_REQUIREMENTS.monstersKilled],
    requiresJournal: true,
    title: "Monstrocide",
  },
  knapsackExpanding: {
    description: "Expand knapsack capacity by @.",
    progression: [25, 50, 100, 250],
    requiresJournal: true,
    title: "Deep pockets",
  },
  looting: {
    description: "Collect loot @ times.",
    progression: [3, 10, 25, 50, 100, 250],
    requiresJournal: true,
    title: "Hoarding",
  },
  masteries: {
    description: "Unlock a mastery.",
    progression: [1],
    requiresJournal: true,
    title: "Apprentice",
  },
  masteriesAll: {
    description: "Unlock all masteries.",
    progression: [MASTERY_TYPES.length],
    requiresJournal: true,
    title: "Guru",
  },
  masteriesRank: {
    description: "Rank up masteries @ times.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "Practice makes perfect",
  },
  masteriesRankMaximum: {
    description: "Rank up a mastery to its maximum.",
    progression: [1],
    requiresJournal: true,
    title: "Virtuoso",
  },
  parrying: {
    description: "Parry @ attacks.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Stop hitting yourself",
  },
  parryingKill: {
    description: "Kill @ monsters with parry damage.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "I fart in your general direction",
  },
  poisoning: {
    description: "Become poisoned @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Just a cough",
  },
  potions: {
    description: "Consume @ witch's concoctions.",
    progression: [3, 10, 25],
    requiresJournal: true,
    title: "Intestinal discomfort",
  },
  powerLevel: {
    description: "Reach power level @.",
    progression: [3, 10, 25, 50],
    requiresJournal: true,
    title: "One up",
  },
  powerLevelUltra: {
    description: `Reach power level ${formatNumber({
      value: GROWTH_MAXIMUM,
    })}.`,
    progression: [GROWTH_MAXIMUM],
    requiresJournal: true,
    title: `It's over ${formatNumber({ value: 9000 })}!`,
  },
  protection: {
    description: `Have at least ${formatNumber({
      value: QUEST_REQUIREMENTS.protection,
    })} protection.`,
    progression: [QUEST_REQUIREMENTS.protection],
    requiresJournal: true,
    title: "I like turtles",
  },
  purchasingArmor: {
    description: "Purchase armor.",
    progression: [1, 3, 10],
    requiresJournal: true,
    title: "Tight fit",
  },
  purchasingInfusable: {
    description: "Purchase an infusable trinket.",
    progression: [1],
    requiresJournal: true,
    title: "Voodoo",
  },
  purchasingShield: {
    description: "Purchase a shield.",
    progression: [1, 3, 10],
    requiresJournal: true,
    title: "This doesn't give protection?",
  },
  purchasingTrinket: {
    description: "Purchase a trinket.",
    progression: [1, 3, 10],
    requiresJournal: true,
    title: "Objets d'art",
  },
  purchasingWeapon: {
    description: "Purchase a weapon.",
    progression: [1, 3, 10],
    requiresJournal: true,
    title: "Pointy end first",
  },
  purgingEssence: {
    description: "Undergo an essence purge.",
    progression: [1, 3],
    requiresJournal: true,
    title: "Clean as a whistle",
  },
  purgingMemories: {
    description: "Undergo a memory purge.",
    progression: [1, 3],
    requiresJournal: true,
    title: "What? Who? Where?",
  },
  resurrecting: {
    description: "Resurrect with phylacteries @ time(s).",
    progression: [1, 3],
    requiresJournal: true,
    title: "Lich king",
  },
  retiring: {
    description: "Go into retirement @ times.",
    progression: [3, 6, TRAIT_TYPES.length],
    requiresJournal: true,
    title: "Getting too old for this",
  },
  selling: {
    description: "Sell an item.",
    progression: [1],
    requiresJournal: true,
    title: "Hustler",
  },
  settingName: {
    description: "Set a name.",
    progression: [1],
    requiresJournal: false,
    title: "Humble beginnings",
  },
  shocking: {
    description: "Inflict shocking @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Raiden",
  },
  skills: {
    description: "Acquire @ skills.",
    progression: [3, 10, 25],
    requiresJournal: true,
    title: "Future prodigy",
  },
  skillsAll: {
    description: "Acquire all skills.",
    progression: [SKILL_TYPES.length],
    requiresJournal: true,
    title: "The GOAT",
  },
  skillsCraft: {
    description: `Acquire the ${formatEnumeration(QUEST_REQUIREMENTS.skillsCraft)} skills.`,
    progression: [QUEST_REQUIREMENTS.skillsCraft.length],
    requiresJournal: true,
    title: "Warcraft",
  },
  spendingEssence: {
    description: "Spend @ essence.",
    progression: [500, 1000, 2500, 5000, 10_000, 25_000],
    requiresJournal: true,
    title: "High roller",
  },
  stages: {
    description: "Reach stage @.",
    progression: [3, 10, 25, 50, LEVELLING_MAXIMUM],
    requiresJournal: true,
    title: "Sisyphean expedition",
  },
  stagesEnd: {
    description: `Reach stage ${formatNumber({ value: GROWTH_MAXIMUM })}.`,
    progression: [GROWTH_MAXIMUM],
    requiresJournal: true,
    title: "Where does it end?",
  },
  staggering: {
    description: "Stagger monsters @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Stop wiggling",
  },
  stunning: {
    description: "Stun monsters @ times.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Brain damage",
  },
  survivingNoAttributes: {
    description: `Complete the first ${formatNumber({
      value: QUEST_REQUIREMENTS.survivingNoAttributes,
    })} stages without spending any attribute points.`,
    progression: [QUEST_REQUIREMENTS.survivingNoAttributes],
    requiresJournal: true,
    title: "Deep throat",
  },
  survivingNoGear: {
    description: `Complete the first ${formatNumber({
      value: QUEST_REQUIREMENTS.survivingNoGear,
    })} stages without any gear equipped.`,
    progression: [QUEST_REQUIREMENTS.survivingNoGear],
    requiresJournal: true,
    title: "Going commando",
  },
  thorns: {
    description: "Inflict thorns damage @ times.",
    progression: [3, 10, 25, 50, 100, 250],
    requiresJournal: true,
    title: "Cactus",
  },
  thornsKill: {
    description: "Kill @ monsters with thorns damage.",
    progression: [3, 10, 25, 50, 100],
    requiresJournal: true,
    title: "Blue-shelling",
  },
  traits: {
    description: "Acquire @ traits.",
    progression: [3, 6],
    requiresJournal: false,
    title: "Getting ink done",
  },
  traitsAll: {
    description: "Acquire all traits.",
    progression: [TRAIT_TYPES.length],
    requiresJournal: false,
    title: "Come at me",
  },
  visitingVoid: {
    description: "Visit nothingness.",
    progression: [1],
    requiresJournal: true,
    title: "Voidseeker",
  },
  warpingCaravan: {
    description: "Warp to the caravan @ times.",
    progression: [3, 10, 25],
    requiresJournal: true,
    title: "... And Back Again",
  },
  warpingWilderness: {
    description: "Warp to a different wilderness @ times.",
    progression: [3, 10, 25],
    requiresJournal: true,
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
