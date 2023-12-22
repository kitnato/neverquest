import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@kitnato/locran/build/types";
import {
  EMPTY_MONOLOGUE,
  GROWTH_MAXIMUM,
  LEVELLING_MAXIMUM,
  RETIREMENT_STAGE_MINIMUM,
} from "@neverquest/data/general";
import { INFUSABLES, TRINKETS } from "@neverquest/data/items";
import IconAlchemist from "@neverquest/icons/alchemist.svg?react";
import IconBlacksmith from "@neverquest/icons/blacksmith.svg?react";
import IconFletcher from "@neverquest/icons/fletcher.svg?react";
import IconMedic from "@neverquest/icons/medic.svg?react";
import IconMercenary from "@neverquest/icons/mercenary.svg?react";
import IconMerchant from "@neverquest/icons/merchant.svg?react";
import IconOccultist from "@neverquest/icons/occultist.svg?react";
import IconTailor from "@neverquest/icons/tailor.svg?react";
import IconWitch from "@neverquest/icons/witch.svg?react";
import type { InheritableItem } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type { Crew, Grip } from "@neverquest/types/unions";

export const AMMUNITION_PRICE = 5;

export const CREW: Record<
  Crew,
  {
    description: string;
    Icon: SVGIcon;
    interaction: string;
    monologues: Record<number, string | undefined>;
    price: number;
    requiredStage: number;
  }
> = {
  alchemist: {
    description: "Converts gems between one another.",
    Icon: IconAlchemist,
    interaction: "Transmute",
    monologues: {
      1: "Things are not always what they seem.",
      34: "Come across any arcane writs lately?",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "Nothing makes any sense.",
    },
    price: 400,
    requiredStage: 30,
  },
  blacksmith: {
    description: "Crafts superior armor, weapons and shields.",
    Icon: IconBlacksmith,
    interaction: "Craft",
    monologues: {
      1: "In need of better gear?",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "Doesn't make a difference.",
    },
    price: 50,
    requiredStage: 12,
  },
  fletcher: {
    description: "Crafts ranged weapons and provides ammunition.",
    Icon: IconFletcher,
    interaction: "Craft",
    monologues: {
      1: "Tired of monster breath?",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "There's too many of them.",
    },
    price: 150,
    requiredStage: 20,
  },
  medic: {
    description: "Heals wounds and sells bandages.",
    Icon: IconMedic,
    interaction: "Treat",
    monologues: {
      1: "Allow me to patch you up.",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "Never-ending madness. It hurts.",
    },
    price: 20,
    requiredStage: 6,
  },
  mercenary: {
    description: "Trains new skills and attributes.",
    Icon: IconMercenary,
    interaction: "Train",
    monologues: {
      1: "Perhaps I can teach you something.",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "Overbearing darkness ...",
    },
    price: 75,
    requiredStage: 15,
  },
  merchant: {
    description: "Offers various items for purchase and buys unwanted items.",
    Icon: IconMerchant,
    interaction: "Trade",
    monologues: {
      1: "Greetings. I have what you're looking for.",
      2: "Hello again. Some protection, perhaps?",
      3: "Ah, you're back. Care for an aegis?",
      4: "Good to have you back.",
      6: "Heard there are other travelers looking to sell their services.",
      7: "New gear for sale, if you care to peruse.",
      9: "There is something dark looming on the horizon ...",
      10: "I can't believe you came out of that in one piece.",
      11: "Have you appraised all my offerings?",
      14: "There's more trouble ahead",
      21: "Can I interest you in anything else?",
      26: "Always a sight for sore eyes.",
      31: "Yet you return for more punishment?",
      36: "Your headway in the wilderness is helping business.",
      51: "Still you press on. There must be an answer.",
      71: "Gloomy portents signal that dark tides are coming.",
      74: "I fear the end is imminent.",
      [GROWTH_MAXIMUM]: "All is truly lost.",
      [LEVELLING_MAXIMUM - 1]: "Something's wrong.",
      [LEVELLING_MAXIMUM]: "How are you still here?",
      [LEVELLING_MAXIMUM + 4]: "Please go back to where you came from.",
      [LEVELLING_MAXIMUM + 8]: "This is all wrong. I don't understand.",
      [LEVELLING_MAXIMUM + 12]: "Why? Emptiness never-ending ...",
      [LEVELLING_MAXIMUM + 16]: "Inescapable. Unfathomable. Inside everything.",
      [LEVELLING_MAXIMUM + 20]: "Please ... the pain ...",
      [RETIREMENT_STAGE_MINIMUM]: "Retirement? Pretty sure you're trapped here with us.",
      [RETIREMENT_STAGE_MINIMUM + 1]: "A sea of monsters ... but is it endless?",
    },
    price: 1,
    requiredStage: 1,
  },
  occultist: {
    description: "Sells phylacteries and offers purging rituals.",
    Icon: IconOccultist,
    interaction: "Ritual",
    monologues: {
      1: "Prepared to transcend your mind?",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "I can't see any more.",
    },
    price: 650,
    requiredStage: 35,
  },
  tailor: {
    description: "Expands inventory space.",
    Icon: IconTailor,
    interaction: "Tailoring",
    monologues: {
      1: "Allow me to deepen your pockets.",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "Fate has been mis-weaved.",
      [RETIREMENT_STAGE_MINIMUM]: "Always leave some extra space for unexpected finds.",
    },
    price: 35,
    requiredStage: 9,
  },
  witch: {
    description: "Sells potions that cure ailments.",
    Icon: IconWitch,
    interaction: "Brew",
    monologues: {
      1: "Gaze into my cauldron ...",
      [GROWTH_MAXIMUM]: EMPTY_MONOLOGUE,
      [LEVELLING_MAXIMUM]: "The spirits have gone silent.",
    },
    price: 300,
    requiredStage: 25,
  },
};

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = {
  essence: 0.15,
  quests: 500,
};

export const OVUM_INFUSION_PRICE = 7171;

export const MEDIC_PRICE_SURGERY = 25;

export const MERCHANT_OFFERS: Record<
  number,
  | { item: Omit<InheritableItem, "ID">; monologue: string }
  | (ArtifactType<"armor"> & {
      gearClass: ArmorClass;
    })
  | (ArtifactType<"shield"> & {
      gearClass: ShieldClass;
    })
  | (ArtifactType<"weapon"> & {
      gearClass: WeaponClass;
      grip: Grip;
      modality: WeaponModality;
    })
> = {
  1: {
    gearClass: "piercing",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  2: {
    gearClass: "light",
    type: "armor",
  },
  3: {
    gearClass: "small",
    type: "shield",
  },
  4: {
    item: TRINKETS.knapsack.item,
    monologue: "You must be over-burdened. I can help with that.",
  },
  6: {
    gearClass: "slashing",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  7: {
    gearClass: "reinforced",
    type: "armor",
  },
  8: {
    item: TRINKETS.compass.item,
    monologue: "Wouldn't it be useful to retread old ground? I have just the thing.",
  },
  9: {
    gearClass: "medium",
    type: "shield",
  },
  10: {
    gearClass: "blunt",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  14: {
    item: TRINKETS.hearthstone.item,
    monologue: "A trinket that allows safe passage. Would that be of interest?",
  },
  20: {
    item: INFUSABLES["monkey paw"].item,
    monologue: "I recently came into possession of a fine curiosity.",
  },
  [CREW.fletcher.requiredStage]: {
    item: TRINKETS["ammunition pouch"].item,
    monologue: "I have something suitable for marksmen.",
  },
  30: {
    item: INFUSABLES["tome of power"].item,
    monologue: "A dark wanderer passed by and sold me a strange book ...",
  },
  35: {
    item: TRINKETS["ender hook"].item,
    monologue: "I've happened upon an artifact for your reaping burdens.",
  },
  39: { item: TRINKETS.journal.item, monologue: "You wouldn't be a scribe, would you?" },
  70: {
    item: TRINKETS["antique coin"].item,
    monologue: "Extraordinary discoveries reveal themselves only to the lucky few.",
  },
};

export const TAILORING_EXPANSION = {
  ammunitionPouch: 20,
  knapsack: 3,
};
export const TAILORING_PRICE_MAXIMUM = {
  ammunitionPouch: 200,
  knapsack: 340,
};

export const TRANSMUTE_COST = 3;
export const TRANSMUTE_YIELD = 1;

export const WITCH_POTIONS = ["elixir", "antidote", "salve"] as const;
