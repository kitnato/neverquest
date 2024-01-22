import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@kitnato/locran/build/types";
import { LEVELLING_CUTOFF, LEVELLING_MAXIMUM, RETIREMENT_STAGE } from "@neverquest/data/general";
import { INFUSABLES, RELICS } from "@neverquest/data/items";
import { BLIGHT, POISON, RAGE } from "@neverquest/data/monster";
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
import type { CrewMember, Grip, Showing } from "@neverquest/types/unions";

export const AMMUNITION_PRICE = 5;

export const MONOLOGUE_EMPTY = "...";

export const CREW: Record<
  CrewMember,
  {
    description: string;
    Icon: SVGIcon;
    interaction: string;
    monologues: Record<number, string | undefined>;
    price: number;
    requiredStage: number;
    shows?: Showing[];
  }
> = {
  alchemist: {
    description: "Converts gems between one another and may teach venerable techniques.",
    Icon: IconAlchemist,
    interaction: "Visit",
    monologues: {
      1: "Things are not always what they seem.",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "Nothing makes any sense.",
    },
    price: 400,
    requiredStage: 24,
  },
  blacksmith: {
    description: "Crafts superior armor, weapons and shields.",
    Icon: IconBlacksmith,
    interaction: "Craft",
    monologues: {
      1: "In need of better gear?",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "Doesn't make a difference.",
    },
    price: 50,
    requiredStage: 12,
    shows: ["gearClass", "gearLevel"],
  },
  fletcher: {
    description: "Crafts ranged weapons and provides ammunition.",
    Icon: IconFletcher,
    interaction: "Craft",
    monologues: {
      1: "Tired of monster breath?",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "There's too many of them.",
    },
    price: 150,
    requiredStage: 18,
  },
  medic: {
    description: "Heals wounds and sells bandages.",
    Icon: IconMedic,
    interaction: "Treat",
    monologues: {
      1: "Allow me to patch you up.",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "Never-ending madness. Only agony.",
    },
    price: 20,
    requiredStage: 5,
  },
  mercenary: {
    description: "Trains new skills and attributes.",
    Icon: IconMercenary,
    interaction: "Train",
    monologues: {
      1: "I can teach, if you can learn.",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
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
      3: "Ah, you're back. Care for something to fend off attacks?",
      4: "Good to have you back.",
      5: "Heard there are other travelers looking to sell their services.",
      6: "New gear for sale, if you care to peruse.",
      7: "Plenty of monsters out there.",
      9: "There is something looming on the horizon ...",
      10: "I can't believe you came out of that in one piece.",
      12: "Have you appraised all my offerings?",
      14: "There's more trouble ahead.",
      15: "Once again you emerge victorious!",
      16: "The grind beckons.",
      20: "May our hearth be a beacon for your replenishment.",
      [RAGE.requiredStage - 1]: "The foul creatures seem even more irate than usual.",
      23: "Always a sight for sore eyes.",
      30: "Yet you return for more punishment?",
      31: "Your headway in the wilderness is helping business.",
      41: "Still you press on. There must be an answer.",
      [POISON.requiredStage - 1]:
        "Beware, some monsters have been seen witnessed spewing venomous ichor.",
      [POISON.requiredStage]: "You are resilient to put yourself through this.",
      [BLIGHT.requiredStage - 1]:
        "These abominations are becoming ever more pestilent. Be prepared.",
      [BLIGHT.requiredStage]: "Your bravery is unmatched. Will it be enough?",
      56: "Dark tides are impending.",
      57: "The portents are truly dire ...",
      58: "Delving further must be our salvation.",
      74: "I fear the end is imminent.",
      [LEVELLING_MAXIMUM - 1]: "Something's wrong.",
      [LEVELLING_CUTOFF]: "All is truly lost.",
      [LEVELLING_MAXIMUM + 4]: "Please go back to where you came from.",
      [LEVELLING_MAXIMUM + 8]: "This is all wrong. I don't understand.",
      [LEVELLING_MAXIMUM + 12]: "Why? Emptiness never-ending ...",
      [LEVELLING_MAXIMUM + 16]: "Inescapable. Unfathomable. Inside everything.",
      [LEVELLING_MAXIMUM + 20]: "Please ... the pain ...",
      [LEVELLING_MAXIMUM]: "How are you still here?",
      [RETIREMENT_STAGE + 1]: "A sea of monsters ... is it endless?",
      [RETIREMENT_STAGE]: "Retirement? Pretty sure you're trapped here with us.",
    },
    price: 1,
    requiredStage: 1,
  },
  occultist: {
    description: "Sells phylacteries and offers purging rituals.",
    Icon: IconOccultist,
    interaction: "Ritual",
    monologues: {
      1: "Prepared to transcend your limits?",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "I can't see any more.",
    },
    price: 300,
    requiredStage: 21,
  },
  tailor: {
    description: "Expands inventory space.",
    Icon: IconTailor,
    interaction: "Stitch",
    monologues: {
      1: "Always leave some extra space for unexpected finds.",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "Fate has been mis-weaved.",
    },
    price: 35,
    requiredStage: 8,
  },
  witch: {
    description: "Sells potions that restore reserves and cure ailments.",
    Icon: IconWitch,
    interaction: "Brew",
    monologues: {
      1: "Gaze into my cauldron ...",
      [LEVELLING_CUTOFF]: MONOLOGUE_EMPTY,
      [LEVELLING_MAXIMUM]: "The spirits have gone silent.",
    },
    price: 650,
    requiredStage: 27,
  },
};

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = {
  essence: 0.15,
  quests: 500,
};

export const MEDIC_PRICE_SURGERY = 15;

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
    item: RELICS.knapsack.item,
    monologue: "Need a way to manage your possessions?",
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
    item: RELICS.compass.item,
    monologue: "I've happened upon a relic allowing you to retread old ground.",
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
  11: {
    item: RELICS["thaumaturgic goggles"].item,
    monologue: "Fine craftsmanship in this little gadget ...",
  },
  14: {
    item: RELICS.hearthstone.item,
    monologue: "A relic that allows safe passage. Would that be of interest?",
  },
  [CREW.fletcher.requiredStage]: {
    item: RELICS["ammunition pouch"].item,
    monologue: "I have something suitable for marksmen.",
  },
  25: {
    item: INFUSABLES["eldritch codex"].item,
    monologue: "A dark wanderer passed through and sold me a strange book ...",
  },
  30: {
    item: RELICS["ender hook"].item,
    monologue: "I recently came into possession of a fine curiosity.",
  },
  34: { item: RELICS.journal.item, monologue: "You wouldn't be a scribe, would you?" },
  40: {
    item: RELICS["spinning wheel"].item,
    monologue: "Here's a device that should ease up the grind.",
  },
};

export const TAILORING = {
  "ammunition pouch": { amount: 20, priceRange: { maximum: 300, minimum: 10 } },
  knapsack: { amount: 3, priceRange: { maximum: 250, minimum: 3 } },
};

export const TRANSMUTATION = {
  gemCost: 3,
  gemYield: 1,
  price: 100,
};

export const WITCH_POTIONS = ["elixir", "antidote", "salve"] as const;
