import { LABEL_UNKNOWN } from "@neverquest/data/general";
import { DROP_CHANCES_OVERRIDE } from "@neverquest/data/items";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import {
  ATTRIBUTE_TYPES,
  CONQUEST_TYPES,
  CREW_TYPES,
  MASTERY_TYPES,
  QUEST_CLASS_TYPES,
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

export const QUEST_REQUIREMENTS = {
  damage: 1500,
  essenceCount: 777,
  powerLevelUltra: 100,
  protection: 1000,
  skillsCraft: ["armorcraft", "shieldcraft", "siegecraft"] as Skill[],
  stagesEnd: 100,
  survivingNoAttributes: 7,
  survivingNoGear: 13,
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
  acquiringGems: {
    description: "Acquire @ gem(s).",
    progression: [1, 10, 25],
    title: "Shiny",
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
  attributesIncreasingAll: {
    description: "Increase all attributes at least once.",
    progression: [ATTRIBUTE_TYPES.length],
    title: "Jack of all",
  },
  attributesUnlockingAll: {
    description: "Unlock all attributes.",
    progression: [ATTRIBUTE_TYPES.length],
    title: "Jack of one",
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
    description: "Block attacks @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "None shall pass",
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
  completing: {
    description: "Complete all quests",
    progression: [0],
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
    description: `Have at least ${formatNumber({
      value: QUEST_REQUIREMENTS.damage,
    })} total damage.`,
    progression: [QUEST_REQUIREMENTS.damage],
    title: "Destroyer",
  },
  deciding: {
    description: `Decide to ${LABEL_UNKNOWN}`,
    hidden: "keep grinding.",
    progression: [1],
    title: "Parable of Stanislav",
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
    description: "Equip a piece of armor.",
    progression: [1],
    title: "Locked & loaded",
  },
  equippingShield: {
    description: "Equip a shield.",
    progression: [1],
    title: "Stop, drop & roll",
  },
  equippingWeapon: {
    description: "Equip a weapon.",
    progression: [1],
    title: "Armed & dangerous",
  },
  essenceCount: {
    description: `Have exactly ${formatNumber({
      value: QUEST_REQUIREMENTS.essenceCount,
    })} essence.`,
    progression: [1],
    title: "Jackpot",
  },
  executing: {
    description: "Execute @ monsters.",
    progression: [3, 10, 25, 50],
    title: "Capital punishment",
  },
  exhausting: {
    description: "Be too exhausted to attack, dodge, parry or block @ times.",
    progression: [3, 10, 25],
    title: "Out of breath",
  },
  freezing: {
    description: "Inflict frozen @ times.",
    progression: [3, 10, 25, 50, 100],
    title: "Air conditioning",
  },
  gemsApplying: {
    description: "Socket @ gem.",
    progression: [1, 3, 10, 25],
    title: "Jeweller",
  },
  gemsApplyingAll: {
    description: "Have at least one gem in every equipped piece of gear.",
    progression: [1],
    title: "Trifecta",
  },
  gemsTransmuting: {
    description: "Transmute any gems.",
    progression: [1],
    title: "Better than mining",
  },
  hiring: {
    description: "Hire caravan crew members @ times.",
    progression: [3, 10, 25],
    title: "Don't forget the doctor",
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
  infusing: {
    description: "Infuse items by @ levels.",
    progression: [3, 10, 25, 50],
    title: "Shaman",
  },
  infusingMaximum: {
    description: "Infuse an item to maximum level.",
    progression: [1],
    title: "Witch doctor",
  },
  killing: {
    description: "Kill @ monsters.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Murder",
  },
  killingBoss: {
    description: "Kill @ boss monsters.",
    progression: [3, 10, 25, 50],
    title: "Giant killer",
  },
  killingOneStrike: {
    description: "Kill a monster in one strike.",
    progression: [1, 3, 10],
    title: "One Punch Person",
  },
  killingResCogitans: {
    description: `Defeat ${LABEL_UNKNOWN}`,
    hidden: "the thinking being.",
    progression: [1],
    title: "Veritas tenebris",
  },
  killingResDominus: {
    description: "Defeat the dominant being.",
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
    progression: [3, 10, 25, 50, 100, 250],
    title: "Hoarding",
  },
  masteries: {
    description: "Unlock a mastery.",
    progression: [1],
    title: "Apprentice",
  },
  masteriesAll: {
    description: "Unlock all masteries.",
    progression: [MASTERY_TYPES.length],
    title: "Guru",
  },
  masteriesRank: {
    description: "Rank up masteries @ times.",
    progression: [3, 10, 25, 50],
    title: "Practice makes perfect",
  },
  masteriesRankMaximum: {
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
    description: "Consume @ witch's concoctions.",
    progression: [3, 10, 25],
    title: "Intestinal discomfort",
  },
  powerLevel: {
    description: "Reach power level @.",
    progression: [3, 10, 25, 50],
    title: "One up",
  },
  powerLevelUltra: {
    description: `Reach power level ${formatNumber({
      value: QUEST_REQUIREMENTS.powerLevelUltra,
    })}.`,
    progression: [QUEST_REQUIREMENTS.powerLevelUltra],
    title: `It's over ${formatNumber({ value: 9000 })}!`,
  },
  protection: {
    description: `Have at least ${formatNumber({
      value: QUEST_REQUIREMENTS.protection,
    })} protection.`,
    progression: [QUEST_REQUIREMENTS.protection],
    title: "I like turtles",
  },
  purchasingArmor: {
    description: "Purchase armor.",
    progression: [1, 3, 10],
    title: "Tight fit",
  },
  purchasingInfusable: {
    description: "Purchase an infusable trinket.",
    progression: [1],
    title: "Voodoo",
  },
  purchasingShield: {
    description: "Purchase a shield.",
    progression: [1, 3, 10],
    title: "This doesn't give protection?",
  },
  purchasingTrinket: {
    description: "Purchase a trinket.",
    progression: [1, 3, 10],
    title: "Objets d'art",
  },
  purchasingWeapon: {
    description: "Purchase a weapon.",
    progression: [1, 3, 10],
    title: "Pointy end first",
  },
  purgingEssence: {
    description: "Undergo an essence purge.",
    progression: [1, 3],
    title: "Clean as a whistle",
  },
  purgingMemories: {
    description: "Undergo a memory purge.",
    progression: [1, 3],
    title: "What? Who? Where?",
  },
  resurrecting: {
    description: "Resurrect with a phylactery.",
    progression: [1, 3],
    title: "Lich king",
  },
  retiring: {
    description: "Go into retirement @ times.",
    progression: [3, 6, TRAIT_TYPES.length],
    title: "Getting too old for this",
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
  skills: {
    description: "Acquire skills @ times.",
    progression: [3, 10, 25],
    title: "Future prodigy",
  },
  skillsAll: {
    description: "Acquire all skills.",
    progression: [SKILL_TYPES.length],
    title: "The GOAT",
  },
  skillsCraft: {
    description: `Acquire the ${formatEnumeration(QUEST_REQUIREMENTS.skillsCraft)} skills.`,
    progression: [QUEST_REQUIREMENTS.skillsCraft.length],
    title: "Warcraft",
  },
  spendingEssence: {
    description: "Spend @ essence.",
    progression: [500, 1000, 2500, 5000, 10_000, 25_000],
    title: "High roller",
  },
  stages: {
    description: "Reach stage @.",
    progression: [3, 10, 25, 50, DROP_CHANCES_OVERRIDE.stage],
    title: "Sisyphean expedition",
  },
  stagesEnd: {
    description: `Reach stage ${formatNumber({ value: QUEST_REQUIREMENTS.stagesEnd })}.`,
    progression: [QUEST_REQUIREMENTS.stagesEnd],
    title: "That's it?",
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
    description: `Complete the first ${formatNumber({
      value: QUEST_REQUIREMENTS.survivingNoAttributes,
    })} levels without spending any attribute points.`,
    progression: [QUEST_REQUIREMENTS.survivingNoAttributes],
    title: "Deep throat",
  },
  survivingNoGear: {
    description: `Complete the first ${formatNumber({
      value: QUEST_REQUIREMENTS.survivingNoGear,
    })} levels without any gear equipped.`,
    progression: [QUEST_REQUIREMENTS.survivingNoGear],
    title: "Going commando",
  },
  thorns: {
    description: "Inflict thorns damage @ times.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Cactus",
  },
  thornsKill: {
    description: "Kill @ monsters with thorns damage.",
    progression: [3, 10, 25, 50, 100],
    title: "Blue-shelling",
  },
  traits: {
    description: "Acquire @ traits.",
    progression: [3, 6],
    title: "Tattoo artiste",
  },
  traitsAll: {
    description: "Acquire all traits.",
    progression: [TRAIT_TYPES.length],
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

// eslint-disable-next-line unicorn/no-array-reduce
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

QUESTS.completing.progression = [
  Object.values(QUESTS_COUNT).reduce((accumulator, current) => accumulator + current, 0),
];
