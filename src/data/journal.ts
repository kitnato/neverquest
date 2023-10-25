import type { QuestBase } from "@neverquest/types";
import type { Conquest, Routine, Triumph } from "@neverquest/types/unions";

export const CONQUESTS: Record<Conquest, QuestBase & { progression: [number, ...number[]] }> = {
  bandaging: {
    description: "Use bandages.",
    progression: [3, 10, 25, 50],
    title: "Mummified",
  },
  bleeding: {
    description: "Inflict bleed.",
    progression: [3, 10, 25, 50, 100],
    title: "Bloodlust",
  },
  bleedingInARow: {
    description: "Inflict bleed 3 times in a row.",
    progression: [3],
    title: "Sadism",
  },
  bleedingKill: {
    description: "Kill with bleed damage.",
    progression: [3, 10, 25, 50],
    title: "Phlebotomizing",
  },
  blighted: {
    description: "Become blighted.",
    progression: [3, 10, 25, 50, 100],
    title: "Coughing blood",
  },
  blocking: {
    description: "Block attacks.",
    progression: [3, 10, 25, 50, 100],
    title: "I like turtles",
  },
  blockingInARow: {
    description: "Block 3 times in a row.",
    progression: [3],
    title: "None shall pass",
  },
  bosses: {
    description: "Kill boss monsters.",
    progression: [3, 10, 25, 50],
    title: "Giant killer",
  },
  burned: {
    description: "Inflict burning.",
    progression: [3, 10, 25, 50, 100],
    title: "Kindling",
  },
  criticals: {
    description: "Inflict critical strikes.",
    progression: [3, 10, 25, 50, 100],
    title: "Brutality",
  },
  criticalsInARow: {
    description: "Critically strike 3 times in a row.",
    progression: [3],
    title: "Fatality",
  },
  dodging: {
    description: "Dodge attacks.",
    progression: [3, 10, 25, 50, 100],
    title: "Grim fandango",
  },
  dodgingInARow: {
    description: "Dodge 3 times in a row.",
    progression: [3],
    title: "Bunny hop",
  },
  executing: {
    description: "Execute monsters.",
    progression: [3, 10, 25, 50, 100],
    title: "Capital punishment",
  },
  executingInARow: {
    description: "Execute 3 monsters in a row.",
    progression: [3],
    title: "Judge, jury and ...",
  },
  freezing: {
    description: "Inflict frozen.",
    progression: [3, 10, 25, 50, 100],
    title: "Air conditioning",
  },
  killing: {
    description: "Kill monsters.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Murder",
  },
  looting: {
    description: "Loot monsters.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Hoarding",
  },
  parrying: {
    description: "Parry attacks.",
    progression: [3, 10, 25, 50, 100],
    title: "Stop hitting yourself",
  },
  parryingInARow: {
    description: "Parry 3 times in a row.",
    progression: [3],
    title: "d'Artagnan",
  },
  parryingKill: {
    description: "Kill with parry damage.",
    progression: [3, 10, 25, 50],
    title: "I fart in your general direction",
  },
  poisoned: {
    description: "Become poisoned.",
    progression: [3, 10, 25, 50, 100],
    title: "Just a cough",
  },
  potions: {
    description: "Use the witch's concoctions.",
    progression: [3, 10, 25, 50],
    title: "Intestinal discomfort",
  },
  shocked: {
    description: "Inflict shocking .",
    progression: [3, 10, 25, 50, 100],
    title: "Raiden",
  },
  staggering: {
    description: "Stagger monsters.",
    progression: [3, 10, 25, 50, 100],
    title: "Canis canem edit",
  },
  staggeringInARow: {
    description: "Stagger 3 times in a row.",
    progression: [3],
    title: "Stop wiggling",
  },
  stunning: {
    description: "Stun monsters.",
    progression: [3, 10, 25, 50, 100],
    title: "Blunt force trauma",
  },
  stunningInARow: {
    description: "Stun 3 times in a row.",
    progression: [3],
    title: "Brain damage",
  },
  thorns: {
    description: "Inflict thorns damage.",
    progression: [3, 10, 25, 50, 100, 250],
    title: "Blue-shelling",
  },
  thornsKill: {
    description: "Kill with thorns damage.",
    progression: [3, 10, 25, 50, 100],
    title: "Blue-shelling",
  },
};

export const CONQUESTS_COUNT = Object.values(CONQUESTS).reduce(
  (aggregator, { progression }) => aggregator + progression.length,
  0,
);

export const QUEST_COMPLETION_BONUS = 0.01;

export const ROUTINES: Record<Routine, QuestBase & { progression?: [number, ...number[]] }> = {
  acquiringAntiqueCoin: {
    description: "Acquire the antique coin.",
    title: "What does this actually do?",
  },
  acquiringKnapsack: {
    description: "Acquire the knapsack.",
    title: "What do you mean, over-encumbered?",
  },
  acquiringRanged: {
    description: "Acquire a ranged weapon.",
    title: "Sniper",
  },
  acquiringTwoHanded: {
    description: "Acquire a two-handed weapon.",
    title: "Highlander",
  },
  attributesAll: {
    description: "Level up all attributes at least once.",
    title: "Jack of all",
  },
  attributesMaximum: {
    description: "Level up an attribute to its maximum.",
    title: "Specialist",
  },
  buyBack: {
    description: "Buy back an item.",
    title: "I changed my mind",
  },
  crafting: {
    description: "Craft items.",
    progression: [3, 10, 25, 50, 100],
    title: "Factory",
  },
  equippingArmor: {
    description: "Consciously equip armor.",
    title: "Locked & loaded",
  },
  equippingShield: {
    description: "Consciously equip a shield.",
    title: "Stop, drop & roll",
  },
  equippingWeapon: {
    description: "Consciously equip a weapon.",
    title: "Armed & dangerous",
  },
  essenceSpending: {
    description: "Spend essence.",
    progression: [100, 500, 1000, 2500, 5000, 10000],
    title: "High roller",
  },
  gems: {
    description: "Acquire a gem.",
    title: "Shiny",
  },
  gemsOwn: {
    description: "Own a gem of each type.",
    title: "Collector",
  },
  gemsSocket: {
    description: "Socket a gem.",
    title: "Jeweller",
  },
  gemsSocketAll: {
    description: "Socket a gem in every equipped piece of gear.",
    title: "Trifecta",
  },
  gemsTransmute: {
    description: "Transmute gems.",
    title: "Better than mining",
  },
  hiringAll: {
    description: "Hire all caravan crew.",
    title: "Haven't died of dysentery",
  },
  hiringOne: {
    description: "Hire a caravan crew member.",
    title: "Don't forget the doctor",
  },
  infusion: {
    description: "Infuse an item once.",
    title: "Shaman",
  },
  infusionMaximum: {
    description: "Infuse an item to maximum capacity.",
    title: "Witch doctor",
  },
  masteryAll: {
    description: "Unlock all masteries.",
    title: "Guru",
  },
  masteryRank: {
    description: "Rank up a mastery.",
    title: "Practice makes perfect",
  },
  masteryRankMaximum: {
    description: "Rank up a mastery to its maximum.",
    title: "Virtuoso",
  },
  purchasingArmor: {
    description: "Purchase armor.",
    title: "Tight fit",
  },
  purchasingInfusable: {
    description: "Purchase an infusable trinket.",
    title: "Voodoo",
  },
  purchasingShield: {
    description: "Purchase a shield.",
    title: "This doesn't give protection?",
  },
  purchasingUsable: {
    description: "Purchase a usable trinket.",
    title: "Peddler",
  },
  purchasingWeapon: {
    description: "Purchase a weapon.",
    title: "Pointy end first",
  },
  resurrecting: {
    description: "Resurrect with a phylactery.",
    title: "Lich king",
  },
  retiring: {
    description: "Go into retirement.",
    progression: [3, 10, 25],
    title: "I'm getting too old for this",
  },
  ritualEssence: {
    description: "Undergo an essence purge.",
    title: "Clean as a whistle",
  },
  ritualMemories: {
    description: "Undergo a memory purge.",
    title: "What? Who? Where?",
  },
  selling: {
    description: "Sell an item.",
    title: "Salesperson",
  },
  skillAcquireAll: {
    description: "Acquire all skills.",
    title: "The GOAT",
  },
  skillsAcquire: {
    description: "Acquire a skill.",
    title: "Future prodigy",
  },
  skillsCraft: {
    description: "Acquire armorcraft, siegecraft and shieldcraft skills.",
    title: "Warcraft",
  },
  traits: {
    description: "Acquire a trait.",
    title: "Tattooing",
  },
  traitsAll: {
    description: "Acquire all traits.",
    title: "Come at me",
  },
  warpingCaravan: {
    description: "Warp to the caravan.",
    title: "... And Back Again",
  },
  warpingWilderness: {
    description: "Warp to a different wilderness.",
    title: "There ...",
  },
};

export const ROUTINES_COUNT = Object.values(ROUTINES).reduce(
  (aggregator, { progression }) => aggregator + (progression ?? [0]).length,
  0,
);

export const TRIUMPHS: Record<Triumph, QuestBase & { hidden?: string }> = {
  acquiringArcheryFirst: {
    description: "Acquire archery as the first skill.",
    title: "Ranger",
  },
  acquiringFamiliar: {
    description: "Acquire the @",
    hidden: "familiar.",
    title: "Companionship",
  },
  essenceCount: {
    description: "Have 777 essence.",
    title: "Jackpot",
  },
  hiringBlacksmithFirst: {
    description: "Hire the blacksmith as the first crew member.",
    title: "Straight to the good stuff",
  },
  killingOneStrike: {
    description: "Kill a monster in one strike on the currently highest stage.",
    title: "One Punch Person",
  },
  killingResCogitans: {
    description: "Defeat @",
    hidden: "Res Cogitans.",
    title: "Veritas tenebris",
  },
  killingResDominus: {
    description: "Defeat the final boss.",
    title: "Come back to reality",
  },
  survivingNoAttributes: {
    description: "Survive the first 13 levels without spending any attribute points.",
    title: "Deep throat",
  },
  survivingNoGear: {
    description: "Survive the first 7 levels without any gear equipped.",
    title: "Going commando",
  },
};

export const TRIUMPHS_COUNT = Object.keys(TRIUMPHS).length;
