import { LABEL_UNKNOWN } from "@neverquest/data/general";
import type { QuestData } from "@neverquest/types";
import {
  CONQUEST_TYPES,
  QUEST_CLASS_TYPES,
  type Quest,
  type QuestProgression,
  ROUTINE_TYPES,
  TRIUMPH_TYPES,
} from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const QUEST_COMPLETION_BONUS = 0.01;

export const QUEST_TYPES_BY_CLASS = {
  conquest: CONQUEST_TYPES,
  routine: ROUTINE_TYPES,
  triumph: TRIUMPH_TYPES,
};

export const QUEST_TYPES = Object.values(QUEST_TYPES_BY_CLASS).flat();

export const QUESTS: Record<Quest, Partial<Record<QuestProgression, QuestData>>> = {
  acquiringAntiqueCoin: {
    "1": {
      description: "Acquire the antique coin.",
      progressionMaximum: 1,
      title: "Now what?",
    },
  },
  acquiringArcheryFirst: {
    "1": {
      description: "Acquire archery as the first skill.",
      progressionMaximum: 1,
      title: "Ranger",
    },
  },
  acquiringFamiliar: {
    "1": {
      description: `Acquire the ${LABEL_UNKNOWN}`,
      hidden: "familiar.",
      progressionMaximum: 1,
      title: "Companionship",
    },
  },
  acquiringKnapsack: {
    "1": {
      description: "Acquire the knapsack.",
      progressionMaximum: 1,
      title: "What do you mean, over-encumbered?",
    },
  },
  acquiringRanged: {
    "1": {
      description: "Acquire a ranged weapon.",
      progressionMaximum: 1,
      title: "Sniper",
    },
  },
  acquiringTwoHanded: {
    "1": {
      description: "Acquire a two-handed weapon.",
      progressionMaximum: 1,
      title: "Highlander",
    },
  },
  attributesAll: {
    "1": {
      description: "Level up all attributes at least once.",
      progressionMaximum: 1,
      title: "Jack of all",
    },
  },
  attributesMaximum: {
    "1": {
      description: "Level up an attribute to its maximum.",
      progressionMaximum: 1,
      title: "Specialist",
    },
  },
  bandaging: {
    "3": {
      description: "Use 3 bandages.",
      progressionMaximum: 3,
      title: "Mummified I",
    },
    "10": {
      description: "Use 10 bandages.",
      progressionMaximum: 10,
      title: "Mummified II",
    },
    "25": {
      description: "Use 25 bandages.",
      progressionMaximum: 25,
      title: "Mummified III",
    },
    "50": {
      description: "Use 50 bandages.",
      progressionMaximum: 50,
      title: "Mummified IV",
    },
  },
  bleeding: {
    "3": {
      description: "Inflict bleed thrice.",
      progressionMaximum: 3,
      title: "Bloodlust I",
    },
    "10": {
      description: "Inflict bleed 10 times.",
      progressionMaximum: 10,
      title: "Bloodlust II",
    },
    "25": {
      description: "Inflict bleed 25 times.",
      progressionMaximum: 25,
      title: "Bloodlust III",
    },
    "50": {
      description: "Inflict bleed 50 times.",
      progressionMaximum: 50,
      title: "Bloodlust IV",
    },
    "100": {
      description: "Inflict bleed 100 times.",
      progressionMaximum: 100,
      title: "Bloodlust V",
    },
  },
  bleedingInARow: {
    "1": {
      description: "Inflict bleed thrice in a row.",
      progressionMaximum: 1,
      title: "Sadism",
    },
  },
  bleedingKill: {
    "3": {
      description: "Kill with bleed damage thrice.",
      progressionMaximum: 3,
      title: "Phlebotomizing I",
    },
    "10": {
      description: "Kill with bleed damage 10 times.",
      progressionMaximum: 10,
      title: "Phlebotomizing II",
    },
    "25": {
      description: "Kill with bleed damage 25 times.",
      progressionMaximum: 25,
      title: "Phlebotomizing III",
    },
    "50": {
      description: "Kill with bleed damage 50 times.",
      progressionMaximum: 50,
      title: "Phlebotomizing IV",
    },
  },
  blighted: {
    "3": {
      description: "Become blighted thrice.",
      progressionMaximum: 3,
      title: "Coughing blood I",
    },
    "10": {
      description: "Become blighted 10 times.",
      progressionMaximum: 10,
      title: "Coughing blood II",
    },
    "25": {
      description: "Become blighted 25 times.",
      progressionMaximum: 25,
      title: "Coughing blood III",
    },
    "50": {
      description: "Become blighted 50 times.",
      progressionMaximum: 50,
      title: "Coughing blood IV",
    },
  },
  blocking: {
    "3": {
      description: "Block attacks thrice.",
      progressionMaximum: 3,
      title: "I like turtles I",
    },
    "10": {
      description: "Block attacks 10 times.",
      progressionMaximum: 10,
      title: "I like turtles II",
    },
    "25": {
      description: "Block attacks 25 times.",
      progressionMaximum: 25,
      title: "I like turtles III",
    },
    "50": {
      description: "Block attacks 50 times.",
      progressionMaximum: 50,
      title: "I like turtles IV",
    },
    "100": {
      description: "Block attacks 100 times.",
      progressionMaximum: 100,
      title: "I like turtles V",
    },
  },
  blockingInARow: {
    "1": {
      description: "Block thrice in a row.",
      progressionMaximum: 1,
      title: "None shall pass",
    },
  },
  bosses: {
    "3": {
      description: "Kill 3 boss monsters.",
      progressionMaximum: 3,
      title: "Giant killer I",
    },
    "10": {
      description: "Kill 10 boss monsters.",
      progressionMaximum: 10,
      title: "Giant killer II",
    },
    "25": {
      description: "Kill 25 boss monsters.",
      progressionMaximum: 25,
      title: "Giant killer III",
    },
    "50": {
      description: "Kill 50 boss monsters.",
      progressionMaximum: 50,
      title: "Giant killer IV",
    },
  },
  burned: {
    "3": {
      description: "Inflict burning thrice.",
      progressionMaximum: 3,
      title: "Kindling I",
    },
    "10": {
      description: "Inflict burning 10 times.",
      progressionMaximum: 10,
      title: "Kindling II",
    },
    "25": {
      description: "Inflict burning 25 times.",
      progressionMaximum: 25,
      title: "Kindling III",
    },
    "50": {
      description: "Inflict burning 50 times.",
      progressionMaximum: 50,
      title: "Kindling IV",
    },
    "100": {
      description: "Inflict burning 100 times.",
      progressionMaximum: 100,
      title: "Kindling V",
    },
  },
  buyBack: {
    "1": {
      description: "Buy back an item.",
      progressionMaximum: 1,
      title: "I changed my mind",
    },
  },
  crafting: {
    "3": {
      description: "Craft 3 items.",
      progressionMaximum: 3,
      title: "Factory I",
    },
    "10": {
      description: "Craft 10 items.",
      progressionMaximum: 10,
      title: "Factory II",
    },
    "25": {
      description: "Craft 25 items.",
      progressionMaximum: 25,
      title: "Factory III",
    },
    "50": {
      description: "Craft 50 items.",
      progressionMaximum: 50,
      title: "Factory IV",
    },
  },
  criticals: {
    "3": {
      description: "Inflict 3 critical strikes.",
      progressionMaximum: 3,
      title: "Brutality I",
    },
    "10": {
      description: "Inflict 10 critical strikes.",
      progressionMaximum: 10,
      title: "Brutality II",
    },
    "25": {
      description: "Inflict 25 critical strikes.",
      progressionMaximum: 25,
      title: "Brutality III",
    },
    "50": {
      description: "Inflict 50 critical strikes.",
      progressionMaximum: 50,
      title: "Brutality IV",
    },
    "100": {
      description: "Inflict 100 critical strikes.",
      progressionMaximum: 100,
      title: "Brutality V",
    },
  },
  criticalsInARow: {
    "3": {
      description: "Critically strike thrice in a row.",
      progressionMaximum: 3,
      title: "Fatality I",
    },
  },
  dodging: {
    "3": {
      description: "Dodge 3 attacks.",
      progressionMaximum: 3,
      title: "Grim fandango I",
    },
    "10": {
      description: "Dodge 10 attacks.",
      progressionMaximum: 10,
      title: "Grim fandango II",
    },
    "25": {
      description: "Dodge 25 attacks.",
      progressionMaximum: 25,
      title: "Grim fandango III",
    },
    "50": {
      description: "Dodge 50 attacks.",
      progressionMaximum: 50,
      title: "Grim fandango IV",
    },
    "100": {
      description: "Dodge 100 attacks.",
      progressionMaximum: 100,
      title: "Grim fandango V",
    },
  },
  dodgingInARow: {
    "3": {
      description: "Dodge thrice in a row.",
      progressionMaximum: 3,
      title: "Bunny hop",
    },
  },
  equippingArmor: {
    "1": {
      description: "Manually equip armor.",
      progressionMaximum: 1,
      title: "Locked & loaded",
    },
  },
  equippingShield: {
    "1": {
      description: "Manually equip a shield.",
      progressionMaximum: 1,
      title: "Stop, drop & roll",
    },
  },
  equippingWeapon: {
    "1": {
      description: "Manually equip a weapon.",
      progressionMaximum: 1,
      title: "Armed & dangerous",
    },
  },
  essenceCount: {
    "1": {
      description: "Have 777 essence.",
      progressionMaximum: 1,
      title: "Jackpot",
    },
  },
  essenceSpending: {
    "100": {
      description: "Spend 100 essence.",
      progressionMaximum: 100,
      title: "High roller I",
    },
    "250": {
      description: "Spend 250 essence.",
      progressionMaximum: 250,
      title: "High roller I",
    },
    "500": {
      description: "Spend 500 essence.",
      progressionMaximum: 500,
      title: "High roller II",
    },
    "1000": {
      description: `Spend ${formatNumber({ value: 1000 })} essence.`,
      progressionMaximum: 1000,
      title: "High roller III",
    },
    "2500": {
      description: `Spend ${formatNumber({ value: 2500 })} essence.`,
      progressionMaximum: 2500,
      title: "High roller IV",
    },
    "5000": {
      description: `Spend ${formatNumber({ value: 5000 })} essence.`,
      progressionMaximum: 5000,
      title: "High roller V",
    },
    "10000": {
      description: `Spend ${formatNumber({ value: 10000 })} essence.`,
      progressionMaximum: 10000,
      title: "High roller VI",
    },
  },
  executing: {
    "3": {
      description: "Execute 3 monsters.",
      progressionMaximum: 3,
      title: "Capital punishment I",
    },
    "10": {
      description: "Execute 10 monsters.",
      progressionMaximum: 10,
      title: "Capital punishment II",
    },
    "25": {
      description: "Execute 25 monsters.",
      progressionMaximum: 25,
      title: "Capital punishment III",
    },
    "50": {
      description: "Execute 50 monsters.",
      progressionMaximum: 50,
      title: "Capital punishment IV",
    },
  },
  executingInARow: {
    "3": {
      description: "Execute 3 monsters in a row.",
      progressionMaximum: 3,
      title: "Judge, jury and ...",
    },
  },
  freezing: {
    "3": {
      description: "Inflict frozen thrice.",
      progressionMaximum: 3,
      title: "Air conditioning I",
    },
    "10": {
      description: "Inflict frozen 10 times.",
      progressionMaximum: 10,
      title: "Air conditioning II",
    },
    "25": {
      description: "Inflict frozen 25 times.",
      progressionMaximum: 25,
      title: "Air conditioning III",
    },
    "50": {
      description: "Inflict frozen 50 times.",
      progressionMaximum: 50,
      title: "Air conditioning IV",
    },
    "100": {
      description: "Inflict frozen 100 times.",
      progressionMaximum: 100,
      title: "Air conditioning V",
    },
  },
  gems: {
    "1": {
      description: "Acquire a gem.",
      progressionMaximum: 1,
      title: "Shiny",
    },
  },
  gemsOwn: {
    "1": {
      description: "Own a gem of each type.",
      progressionMaximum: 1,
      title: "Collector",
    },
  },
  gemsSocket: {
    "1": {
      description: "Socket a gem.",
      progressionMaximum: 1,
      title: "Jeweller",
    },
  },
  gemsSocketAll: {
    "1": {
      description: "Socket a gem in every equipped piece of gear.",
      progressionMaximum: 1,
      title: "Trifecta",
    },
  },
  gemsTransmute: {
    "1": {
      description: "Transmute gems.",
      progressionMaximum: 1,
      title: "Better than mining",
    },
  },
  hiringAll: {
    "1": {
      description: "Hire all caravan crew.",
      progressionMaximum: 1,
      title: "Haven't died of dysentery",
    },
  },
  hiringBlacksmithFirst: {
    "1": {
      description: "Hire the blacksmith as the first crew member.",
      progressionMaximum: 1,
      title: "Straight to the good stuff",
    },
  },
  hiringOne: {
    "1": {
      description: "Hire a caravan crew member.",
      progressionMaximum: 1,
      title: "Don't forget the doctor",
    },
  },
  infusion: {
    "1": {
      description: "Infuse an item once.",
      progressionMaximum: 1,
      title: "Shaman",
    },
  },
  infusionMaximum: {
    "1": {
      description: "Infuse an item to maximum capacity.",
      progressionMaximum: 1,
      title: "Witch doctor",
    },
  },
  killing: {
    "3": {
      description: "Kill 3 monsters.",
      progressionMaximum: 3,
      title: "Murder I",
    },
    "10": {
      description: "Kill 10 monsters.",
      progressionMaximum: 10,
      title: "Murder II",
    },
    "25": {
      description: "Kill 25 monsters.",
      progressionMaximum: 25,
      title: "Murder III",
    },
    "50": {
      description: "Kill 50 monsters.",
      progressionMaximum: 50,
      title: "Murder IV",
    },
    "100": {
      description: "Kill 100 monsters.",
      progressionMaximum: 100,
      title: "Murder V",
    },
    "250": {
      description: "Kill 250 monsters.",
      progressionMaximum: 250,
      title: "Murder VI",
    },
  },
  killingOneStrike: {
    "1": {
      description: "Kill a monster in one strike on the currently highest stage.",
      progressionMaximum: 1,
      title: "One Punch Person",
    },
  },
  killingResCogitans: {
    "1": {
      description: `Defeat ${LABEL_UNKNOWN}`,
      hidden: "Res Cogitans.",
      progressionMaximum: 1,
      title: "Veritas tenebris",
    },
  },
  killingResDominus: {
    "1": {
      description: "Defeat the final boss.",
      progressionMaximum: 1,
      title: "Come back to reality",
    },
  },
  looting: {
    "3": {
      description: "Loot 3 monsters.",
      progressionMaximum: 3,
      title: "Covetous I",
    },
    "10": {
      description: "Loot 10 monsters.",
      progressionMaximum: 10,
      title: "Covetous II",
    },
    "25": {
      description: "Loot 25 monsters.",
      progressionMaximum: 25,
      title: "Covetous III",
    },
    "50": {
      description: "Loot 50 monsters.",
      progressionMaximum: 50,
      title: "Covetous IV",
    },
    "100": {
      description: "Loot 100 monsters.",
      progressionMaximum: 100,
      title: "Covetous V",
    },
    "250": {
      description: "Loot 250 monsters.",
      progressionMaximum: 250,
      title: "Covetous VI",
    },
  },
  masteryAll: {
    "1": {
      description: "Unlock all masteries.",
      progressionMaximum: 1,
      title: "Guru",
    },
  },
  masteryRank: {
    "1": {
      description: "Rank up a mastery.",
      progressionMaximum: 1,
      title: "Practice makes perfect",
    },
  },
  masteryRankMaximum: {
    "1": {
      description: "Rank up a mastery to its maximum.",
      progressionMaximum: 1,
      title: "Virtuoso",
    },
  },
  parrying: {
    "3": {
      description: "Parry 3 attacks.",
      progressionMaximum: 3,
      title: "Stop hitting yourself I",
    },
    "10": {
      description: "Parry 10 attacks.",
      progressionMaximum: 10,
      title: "Stop hitting yourself II",
    },
    "25": {
      description: "Parry 25 attacks.",
      progressionMaximum: 25,
      title: "Stop hitting yourself III",
    },
    "50": {
      description: "Parry 50 attacks.",
      progressionMaximum: 50,
      title: "Stop hitting yourself IV",
    },
    "100": {
      description: "Parry 100 attacks.",
      progressionMaximum: 100,
      title: "Stop hitting yourself V",
    },
  },
  parryingInARow: {
    "3": {
      description: "Parry thrice in a row.",
      progressionMaximum: 3,
      title: "d'Artagnan",
    },
  },
  parryingKill: {
    "3": {
      description: "Kill 3 monsters with parry damage.",
      progressionMaximum: 3,
      title: "I fart in your general direction I",
    },
    "10": {
      description: "Kill 10 monsters with parry damage.",
      progressionMaximum: 10,
      title: "I fart in your general direction II",
    },
    "25": {
      description: "Kill 25 monsters with parry damage.",
      progressionMaximum: 25,
      title: "I fart in your general direction III",
    },
    "50": {
      description: "Kill 50 monsters with parry damage.",
      progressionMaximum: 50,
      title: "I fart in your general direction IV",
    },
  },
  poisoned: {
    "3": {
      description: "Become poisoned thrice.",
      progressionMaximum: 3,
      title: "Just a cough I",
    },
    "10": {
      description: "Become poisoned 10 times.",
      progressionMaximum: 10,
      title: "Just a cough II",
    },
    "25": {
      description: "Become poisoned 25 times.",
      progressionMaximum: 25,
      title: "Just a cough III",
    },
    "50": {
      description: "Become poisoned 50 times.",
      progressionMaximum: 50,
      title: "Just a cough IV",
    },
    "100": {
      description: "Become poisoned 100 times.",
      progressionMaximum: 100,
      title: "Just a cough V",
    },
  },
  potions: {
    "3": {
      description: "Use 3 witch's concoctions.",
      progressionMaximum: 3,
      title: "Intestinal discomfort I",
    },
    "10": {
      description: "Use 10 witch's concoctions.",
      progressionMaximum: 10,
      title: "Intestinal discomfort II",
    },
    "25": {
      description: "Use 25 witch's concoctions.",
      progressionMaximum: 25,
      title: "Intestinal discomfort III",
    },
    "50": {
      description: "Use 50 witch's concoctions.",
      progressionMaximum: 50,
      title: "Intestinal discomfort IV",
    },
  },
  purchasingArmor: {
    "1": {
      description: "Purchase armor.",
      progressionMaximum: 1,
      title: "Tight fit",
    },
  },
  purchasingInfusable: {
    "1": {
      description: "Purchase an infusable trinket.",
      progressionMaximum: 1,
      title: "Voodoo",
    },
  },
  purchasingShield: {
    "1": {
      description: "Purchase a shield.",
      progressionMaximum: 1,
      title: "This doesn't give protection?",
    },
  },
  purchasingUsable: {
    "1": {
      description: "Purchase a usable trinket.",
      progressionMaximum: 1,
      title: "Objets d'art",
    },
  },
  purchasingWeapon: {
    "1": {
      description: "Purchase a weapon.",
      progressionMaximum: 1,
      title: "Pointy end first",
    },
  },
  resurrecting: {
    "1": {
      description: "Resurrect with a phylactery.",
      progressionMaximum: 1,
      title: "Lich king",
    },
  },
  retiring: {
    "3": {
      description: "Go into retirement thrice.",
      progressionMaximum: 3,
      title: "Getting too old for this I",
    },
    "10": {
      description: "Go into retirement 10 times.",
      progressionMaximum: 10,
      title: "Getting too old for this II",
    },
    "25": {
      description: "Go into retirement 25 times.",
      progressionMaximum: 25,
      title: "Getting too old for this III",
    },
  },
  ritualEssence: {
    "1": {
      description: "Undergo an essence purge.",
      progressionMaximum: 1,
      title: "Clean as a whistle",
    },
  },
  ritualMemories: {
    "1": {
      description: "Undergo a memory purge.",
      progressionMaximum: 1,
      title: "What? Who? Where?",
    },
  },
  selling: {
    "1": {
      description: "Sell an item.",
      progressionMaximum: 1,
      title: "Hustler",
    },
  },
  shocked: {
    "3": {
      description: "Inflict shocking thrice.",
      progressionMaximum: 3,
      title: "Raiden I",
    },
    "10": {
      description: "Inflict shocking 10 times.",
      progressionMaximum: 10,
      title: "Raiden II",
    },
    "25": {
      description: "Inflict shocking 25 times.",
      progressionMaximum: 25,
      title: "Raiden III",
    },
    "50": {
      description: "Inflict shocking 50 times.",
      progressionMaximum: 50,
      title: "Raiden IV",
    },
    "100": {
      description: "Inflict shocking 100 times.",
      progressionMaximum: 100,
      title: "Raiden V",
    },
  },
  skillAcquireAll: {
    "1": {
      description: "Acquire all skills.",
      progressionMaximum: 1,
      title: "The GOAT",
    },
  },
  skillsAcquire: {
    "1": {
      description: "Acquire a skill.",
      progressionMaximum: 1,
      title: "Future prodigy",
    },
  },
  skillsCraft: {
    "1": {
      description: "Acquire armorcraft, siegecraft and shieldcraft skills.",
      progressionMaximum: 1,
      title: "Warcraft",
    },
  },
  staggering: {
    "3": {
      description: "Stagger monsters thrice.",
      progressionMaximum: 3,
      title: "Canis canem edit I",
    },
    "10": {
      description: "Stagger monsters 10 times.",
      progressionMaximum: 10,
      title: "Canis canem edit II",
    },
    "25": {
      description: "Stagger monsters 25 times.",
      progressionMaximum: 25,
      title: "Canis canem edit III",
    },
    "50": {
      description: "Stagger monsters 50 times.",
      progressionMaximum: 50,
      title: "Canis canem edit IV",
    },
    "100": {
      description: "Stagger monsters 100 times.",
      progressionMaximum: 100,
      title: "Canis canem edit V",
    },
  },
  staggeringInARow: {
    "3": {
      description: "Stagger thrice in a row.",
      progressionMaximum: 3,
      title: "Stop wiggling I",
    },
  },
  stunning: {
    "3": {
      description: "Stun monsters thrice.",
      progressionMaximum: 3,
      title: "Blunt force trauma I",
    },
    "10": {
      description: "Stun monsters 10 times.",
      progressionMaximum: 10,
      title: "Blunt force trauma II",
    },
    "25": {
      description: "Stun monsters 25 times.",
      progressionMaximum: 25,
      title: "Blunt force trauma III",
    },
    "50": {
      description: "Stun monsters 50 times.",
      progressionMaximum: 50,
      title: "Blunt force trauma IV",
    },
    "100": {
      description: "Stun monsters 100 times.",
      progressionMaximum: 100,
      title: "Blunt force trauma V",
    },
  },
  stunningInARow: {
    "3": {
      description: "Stun thrice in a row.",
      progressionMaximum: 3,
      title: "Brain damage I",
    },
  },
  survivingNoAttributes: {
    "1": {
      description: "Survive the first 13 levels without spending any attribute points.",
      progressionMaximum: 1,
      title: "Deep throat",
    },
  },
  survivingNoGear: {
    "1": {
      description: "Survive the first 7 levels without any gear equipped.",
      progressionMaximum: 1,
      title: "Going commando",
    },
  },
  thorns: {
    "3": {
      description: "Inflict thorns damage thrice.",
      progressionMaximum: 3,
      title: "Cactus I",
    },
    "10": {
      description: "Inflict thorns damage 10 times.",
      progressionMaximum: 10,
      title: "Cactus II",
    },
    "25": {
      description: "Inflict thorns damage 25 times.",
      progressionMaximum: 25,
      title: "Cactus III",
    },
    "50": {
      description: "Inflict thorns damage 50 times.",
      progressionMaximum: 50,
      title: "Cactus IV",
    },
    "100": {
      description: "Inflict thorns damage 100 times.",
      progressionMaximum: 100,
      title: "Cactus V",
    },
    "250": {
      description: "Inflict thorns damage 250 times.",
      progressionMaximum: 250,
      title: "Cactus VI",
    },
  },
  thornsKill: {
    "3": {
      description: "Kill 3 monsters with thorns damage.",
      progressionMaximum: 3,
      title: "Blue-shelling I",
    },
    "10": {
      description: "Kill 10 monsters with thorns damage.",
      progressionMaximum: 10,
      title: "Blue-shelling II",
    },
    "25": {
      description: "Kill 25 monsters with thorns damage.",
      progressionMaximum: 25,
      title: "Blue-shelling III",
    },
    "50": {
      description: "Kill 50 monsters with thorns damage.",
      progressionMaximum: 50,
      title: "Blue-shelling IV",
    },
    "100": {
      description: "Kill 100 monsters with thorns damage.",
      progressionMaximum: 100,
      title: "Blue-shelling V",
    },
  },
  traits: {
    "1": {
      description: "Acquire a trait.",
      progressionMaximum: 1,
      title: "Tattoo artiste",
    },
  },
  traitsAll: {
    "1": {
      description: "Acquire all traits.",
      progressionMaximum: 1,
      title: "Come at me",
    },
  },
  warpingCaravan: {
    "1": {
      description: "Warp to the caravan.",
      progressionMaximum: 1,
      title: "... And Back Again",
    },
  },
  warpingWilderness: {
    "1": {
      description: "Warp to a different wilderness.",
      progressionMaximum: 1,
      title: "There ...",
    },
  },
};

export const QUESTS_COUNT = QUEST_CLASS_TYPES.reduce(
  (accumulatorClass, currentClass) => ({
    ...accumulatorClass,
    [currentClass]: QUEST_TYPES_BY_CLASS[currentClass].reduce(
      (accumulatorQuest, currentQuest) =>
        accumulatorQuest + Object.keys(QUESTS[currentQuest]).length,
      0,
    ),
  }),
  {
    conquest: 0,
    routine: 0,
    triumph: 0,
  },
);
