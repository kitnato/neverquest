import { LABEL_UNKNOWN } from "@neverquest/data/general";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { SVGIcon } from "@neverquest/types/props";
import {
  CONQUEST_TYPES,
  CREW_TYPES,
  QUEST_CLASS_TYPES,
  type Quest,
  type QuestClass,
  ROUTINE_TYPES,
  TRIUMPH_TYPES,
} from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const QUEST_CLASS_ICONS: Record<QuestClass, SVGIcon> = {
  conquest: IconConquest,
  routine: IconRoutine,
  triumph: IconTriumph,
};

export const QUEST_COMPLETION_BONUS = 0.01;

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
    title: string;
  }
> = {
  acquiringAntiqueCoin: {
    description: "Acquire the antique coin.",
    progression: [1],
    title: "Now what?",
  },
  acquiringArcheryFirst: {
    description: "Acquire archery as the first skill.",
    progression: [1],
    title: "Ranger",
  },
  acquiringFamiliar: {
    description: `Acquire the ${LABEL_UNKNOWN}`,
    hidden: "familiar.",
    progression: [1],
    title: "Companionship",
  },
  acquiringRanged: {
    description: "Acquire a ranged weapon.",
    progression: [1],
    title: "Sniper",
  },
  acquiringTwoHanded: {
    description: "Acquire a two-handed weapon.",
    progression: [1],
    title: "Highlander",
  },
  attributesAll: {
    description: "Level up all attributes at least once.",
    progression: [1],
    title: "Jack of all",
  },
  attributesMaximum: {
    description: "Level up an attribute to its maximum.",
    progression: [1],
    title: "Specialist",
  },
  bandaging: {
    description: "Use @ bandages.",
    progression: [3, 10, 25, 50],
    title: "Mummified",
  },
  bleeding: {
    description: "Inflict bleed @ times.",
    progression: [3, 10, 25, 50],
    title: "Bloodlust",
  },
  bleedingKill: {
    description: "Kill with bleed damage @ times.",
    progression: [3, 10, 25, 50],
    title: "Phlebotomizing",
  },
  blighting: {
    description: "Become blighted @ times.",
    progression: [3, 10, 25, 50],
    title: "Coughing blood",
  },
  blocking: {
    description: "Block an attack @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "None shall pass",
  },
  bosses: {
    description: "Kill @ boss monsters.",
    progression: [3, 10, 25, 50],
    title: "Giant killer",
  },
  burning: {
    description: "Inflict burning @ times.",
    progression: [3, 10, 25, 50],
    title: "Kindling",
  },
  buyingBack: {
    description: "Buy back an item.",
    progression: [1],
    title: "I changed my mind",
  },
  completion: {
    description: "Complete all quests",
    progression: [180],
    title: "Completionist",
  },
  crafting: {
    description: "Craft @ items.",
    progression: [3, 10, 25, 50],
    title: "Factory",
  },
  critical: {
    description: "Inflict @ critical strikes.",
    progression: [3, 10, 25, 50, 100],
    title: "Brutality",
  },
  criticalKilling: {
    description: "Kill @ monster with a critical strike.",
    progression: [3, 10, 25, 50],
    title: "Fatality",
  },
  damage: {
    description: `Have ${formatNumber({ value: 1000 })} total damage.`,
    progression: [1],
    title: "Destroyer",
  },
  decipheringJournal: {
    description: "Decipher the journal.",
    progression: [1],
    title: "Epiphany",
  },
  deflecting: {
    description: "Deflect @ ailments.",
    progression: [3, 10, 25],
    title: "Incorruptible",
  },
  dodging: {
    description: "Dodge @ attacks.",
    progression: [3, 10, 25, 50],
    title: "Grim fandango",
  },
  equippingArmor: {
    description: "Manually equip armor.",
    progression: [1],
    title: "Locked & loaded",
  },
  equippingShield: {
    description: "Manually equip a shield.",
    progression: [1],
    title: "Stop, drop & roll",
  },
  equippingWeapon: {
    description: "Manually equip a weapon.",
    progression: [1],
    title: "Armed & dangerous",
  },
  essenceCount: {
    description: "Have exactly 777 essence.",
    progression: [1],
    title: "Jackpot",
  },
  executing: {
    description: "Execute @ monsters.",
    progression: [3, 10, 25, 50],
    title: "Capital punishment",
  },
  exhausting: {
    description: "Be exhausted when attempting to attack, dodge, parry and block.",
    progression: [4],
    title: "Out of breath",
  },
  freezing: {
    description: "Inflict frozen @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Air conditioning",
  },
  gems: {
    description: "Acquire @ gem(s).",
    progression: [1, 10, 25],
    title: "Shiny",
  },
  gemsOwned: {
    description: "Own a gem of each type.",
    progression: [3],
    title: "Collector",
  },
  gemsSocketing: {
    description: "Socket a gem.",
    progression: [1],
    title: "Jeweller",
  },
  gemsSocketingAll: {
    description: "Socket a gem in every equipped piece of gear.",
    progression: [3],
    title: "Trifecta",
  },
  gemsTransmuting: {
    description: "Transmute any gems.",
    progression: [1],
    title: "Better than mining",
  },
  hiringAll: {
    description: "Hire all caravan crew.",
    progression: [CREW_TYPES.length],
    title: "Haven't died of dysentery",
  },
  hiringBlacksmithFirst: {
    description: "Hire the blacksmith as the first crew member.",
    progression: [1],
    title: "Straight to the good stuff",
  },
  hiringOne: {
    description: "Hire a caravan crew member.",
    progression: [1],
    title: "Don't forget the doctor",
  },
  infusion: {
    description: "Infuse an item once.",
    progression: [1],
    title: "Shaman",
  },
  infusionMaximum: {
    description: "Infuse an item to maximum capacity.",
    progression: [1],
    title: "Witch doctor",
  },
  killing: {
    description: "Kill @ monsters.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Murder",
  },
  killingOneStrike: {
    description: "Kill a monster in one strike.",
    progression: [1],
    title: "One Punch Person",
  },
  killingResCogitans: {
    description: `Defeat ${LABEL_UNKNOWN}`,
    hidden: "Res Cogitans.",
    progression: [1],
    title: "Veritas tenebris",
  },
  killingResDominus: {
    description: "Defeat the final boss.",
    progression: [1],
    title: "Come back to reality",
  },
  knapsackExpanding: {
    description: "Expand knapsack capacity by @.",
    progression: [25, 50, 100, 250],
    title: "Deep pockets",
  },
  looting: {
    description: "Collect loot @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Hoarding",
  },
  masteryAll: {
    description: "Unlock all masteries.",
    progression: [1],
    title: "Guru",
  },
  masteryRank: {
    description: "Rank up a mastery.",
    progression: [1],
    title: "Practice makes perfect",
  },
  masteryRankMaximum: {
    description: "Rank up a mastery to its maximum.",
    progression: [1],
    title: "Virtuoso",
  },
  parrying: {
    description: "Parry @ attacks.",
    progression: [3, 10, 25, 50, 100],
    title: "Stop hitting yourself",
  },
  parryingKill: {
    description: "Kill @ monsters with parry damage.",
    progression: [3, 10, 25, 50],
    title: "I fart in your general direction",
  },
  poisoning: {
    description: "Become poisoned @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Just a cough",
  },
  potions: {
    description: "Use @ witch's concoctions.",
    progression: [3, 10, 25, 50],
    title: "Intestinal discomfort",
  },
  powerLevel: {
    description: "Reach power level @.",
    progression: [3, 10, 25, 50],
    title: "One up",
  },
  powerLevelUltra: {
    description: "Reach power level 100.",
    progression: [100],
    title: `It's over ${formatNumber({ value: 9000 })}!`,
  },
  protection: {
    description: "Have 500 protection.",
    progression: [1],
    title: "I like turtles",
  },
  purchasingArmor: {
    description: "Purchase armor.",
    progression: [1],
    title: "Tight fit",
  },
  purchasingInfusable: {
    description: "Purchase an infusable trinket.",
    progression: [1],
    title: "Voodoo",
  },
  purchasingShield: {
    description: "Purchase a shield.",
    progression: [1],
    title: "This doesn't give protection?",
  },
  purchasingUsable: {
    description: "Purchase a usable trinket.",
    progression: [1],
    title: "Objets d'art",
  },
  purchasingWeapon: {
    description: "Purchase a weapon.",
    progression: [1],
    title: "Pointy end first",
  },
  resurrecting: {
    description: "Resurrect with a phylactery.",
    progression: [1],
    title: "Lich king",
  },
  retiring: {
    description: "Go into retirement @ times.",
    progression: [3, 10, 25],
    title: "Getting too old for this",
  },
  ritualEssence: {
    description: "Undergo an essence purge.",
    progression: [1],
    title: "Clean as a whistle",
  },
  ritualMemories: {
    description: "Undergo a memory purge.",
    progression: [1],
    title: "What? Who? Where?",
  },
  selling: {
    description: "Sell an item.",
    progression: [1],
    title: "Hustler",
  },
  settingName: {
    description: "Set a name.",
    progression: [1],
    title: "Humble beginnings",
  },
  shocking: {
    description: "Inflict shocking @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Raiden",
  },
  skillAcquiringAll: {
    description: "Acquire all skills.",
    progression: [1],
    title: "The GOAT",
  },
  skillsAcquiring: {
    description: "Acquire a skill.",
    progression: [1],
    title: "Future prodigy",
  },
  skillsCraft: {
    description: "Acquire armorcraft, siegecraft and shieldcraft skills.",
    progression: [1],
    title: "Warcraft",
  },
  spendingEssence: {
    description: "Spend @ essence.",
    progression: [500, 1000, 2500, 5000, 10000, 25000],
    title: "High roller",
  },
  stages: {
    description: "Reach stage @.",
    progression: [3, 10, 25, 50, 100],
    title: "Sisyphean expedition",
  },
  staggering: {
    description: "Stagger monsters @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Stop wiggling",
  },
  stunning: {
    description: "Stun monsters @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Brain damage",
  },
  survivingNoAttributes: {
    description: "Survive the first 13 levels without spending any attribute points.",
    progression: [1],
    title: "Deep throat",
  },
  survivingNoGear: {
    description: "Survive the first 7 levels without any gear equipped.",
    progression: [1],
    title: "Going commando",
  },
  thorns: {
    description: "Inflict thorns damage @ times.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Cactus",
  },
  thornsKill: {
    description: "Kill 3 monsters with thorns damage.",
    progression: [3, 10, 25, 50, 100],
    title: "Blue-shelling",
  },
  traits: {
    description: "Acquire a trait.",
    progression: [1],
    title: "Tattoo artiste",
  },
  traitsAll: {
    description: "Acquire all traits.",
    progression: [1],
    title: "Come at me",
  },
  warpingCaravan: {
    description: "Warp to the caravan @ times.",
    progression: [3, 10, 25],
    title: "... And Back Again",
  },
  warpingWilderness: {
    description: "Warp to a different wilderness @ times.",
    progression: [3, 10, 25],
    title: "There ...",
  },
};

export const QUESTS_COUNT: Record<QuestClass, number> = QUEST_CLASS_TYPES.reduce(
  (accumulatorClass, currentClass) => ({
    ...accumulatorClass,
    [currentClass]: QUEST_TYPES_BY_CLASS[currentClass].reduce(
      (accumulatorQuest, currentQuest) =>
        accumulatorQuest + QUESTS[currentQuest].progression.length,
      0,
    ),
  }),
  {
    conquest: 0,
    routine: 0,
    triumph: 0,
  },
);
