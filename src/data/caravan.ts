import { INFUSABLES, TRINKETS } from "./inventory";
import IconAlchemist from "@neverquest/icons/alchemist.svg?react";
import IconBlacksmith from "@neverquest/icons/blacksmith.svg?react";
import IconFletcher from "@neverquest/icons/fletcher.svg?react";
import IconMedic from "@neverquest/icons/medic.svg?react";
import IconMercenary from "@neverquest/icons/mercenary.svg?react";
import IconMerchant from "@neverquest/icons/merchant.svg?react";
import IconOccultist from "@neverquest/icons/occultist.svg?react";
import IconTailor from "@neverquest/icons/tailor.svg?react";
import IconWitch from "@neverquest/icons/witch.svg?react";
import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRAN/types";
import type { UsableItem } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Crew, Grip } from "@neverquest/types/unions";

export const AMMUNITION_PRICE = 10;

export const GEAR_LEVEL_MAXIMUM = 100;
export const GEAR_LEVEL_RANGE_MAXIMUM = 3;

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
    monologues: { 1: "Things are not always what they seem." },
    price: 500,
    requiredStage: 30,
  },
  blacksmith: {
    description: "Crafts superior gear.",
    Icon: IconBlacksmith,
    interaction: "Craft",
    monologues: { 1: "In need of better gear?" },
    price: 60,
    requiredStage: 12,
  },
  fletcher: {
    description: "Crafts ranged weapons and provides ammunition.",
    Icon: IconFletcher,
    interaction: "Craft",
    monologues: { 1: "Tired of monster breath?" },
    price: 300,
    requiredStage: 23,
  },
  medic: {
    description: "Heals wounds and sells bandages.",
    Icon: IconMedic,
    interaction: "Heal",
    monologues: { 1: "Allow me to patch you up." },
    price: 90,
    requiredStage: 15,
  },
  mercenary: {
    description: "Trains new skills and attributes.",
    Icon: IconMercenary,
    interaction: "Train",
    monologues: { 1: "Perhaps I can teach you something." },
    price: 25,
    requiredStage: 6,
  },
  merchant: {
    description: "Offers various items for purchase and buys unwanted items.",
    Icon: IconMerchant,
    interaction: "Trade",
    monologues: {
      1: "Greetings. I have what you're looking for.",
      2: "Hello again. Some threads, perhaps?",
      3: "Ah, you're back. Care for more protection?",
      4: "You must be over-burdened. I have just the thing.",
      5: "Got a fresh shipment of gear, care to see?",
      6: "Heard there are other travelers looking to sell their services.",
      7: "Your headway in the wilderness is helping business.",
      9: "There is something dark looming on the horizon ...",
      10: "I can't believe you came out of that in one piece.",
      11: "Ah, back again I see.",
      20: "I recently came into possession of a few curiosities.",
      21: "Can I interest you in anything else?",
      30: "I have something suitable for marksmen.",
      31: "Welcome back. Always a sight for sore eyes.",
      35: "You wouldn't be a scribe, would you?",
      36: "You are always welcome here.",
      40: "A dark wanderer passed by and sold me a strange book ...",
      41: "A sea of monsters ... but is it endless?",
      50: "Retirement? Pretty sure you're trapped here with us.",
      51: "Still you come back for more?",
      52: "There are tales of a mysterious creature that only the most fortunate find.",
      60: "Have you not seen everything by now?",
      99: "I fear the end is nigh.",
      100: "How are you still here?",
    },
    price: 0,
    requiredStage: 0,
  },
  occultist: {
    description: "Sells phylacteries and offers purging rituals.",
    Icon: IconOccultist,
    interaction: "Ritual",
    monologues: { 1: "Prepared to pierce the veil?" },
    price: 777,
    requiredStage: 40,
  },
  tailor: {
    description: "Expands inventory space.",
    Icon: IconTailor,
    interaction: "Tailoring",
    monologues: { 1: "Allow me to deepen your pockets." },
    price: 40,
    requiredStage: 9,
  },
  witch: {
    description: "Sells potions that cure ailments.",
    Icon: IconWitch,
    interaction: "Brew",
    monologues: { 1: "Gaze into my cauldron ..." },
    price: 150,
    requiredStage: 18,
  },
};

export const CREW_ORDER: Crew[] = Object.entries(CREW)
  .toSorted(([, current1], [, current2]) => current1.requiredStage - current2.requiredStage)
  .map(([current]) => current as Crew);

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = {
  essence: 0.1,
  quests: 500,
};

export const MEDIC_PRICE_SURGERY = 25;
export const MEDIC_PRICE_SURGERY_CRITICAL = 100;

export const MERCHANT_OFFERS: Record<
  number,
  | (
      | (ArtifactType<"armor"> & {
          gearClass: ArmorClass;
        })
      | (ArtifactType<"shield"> & {
          gearClass: ShieldClass;
        })
      | (ArtifactType<"trinket"> & {
          item: UsableItem;
        })
      | (ArtifactType<"weapon"> & {
          gearClass: WeaponClass;
          grip: Grip;
          modality: WeaponModality;
        })
    )[]
  | undefined
> = {
  1: [
    {
      gearClass: "piercing",
      grip: "one-handed",
      modality: "melee",
      type: "weapon",
    },
  ],
  2: [
    {
      gearClass: "light",
      type: "armor",
    },
  ],
  3: [
    {
      gearClass: "small",
      type: "shield",
    },
  ],
  4: [
    { item: TRINKETS["knapsack"].item, type: "trinket" },
    { item: TRINKETS["compass"].item, type: "trinket" },
    { item: TRINKETS["hearthstone"].item, type: "trinket" },
  ],
  5: [
    {
      gearClass: "slashing",
      grip: "one-handed",
      modality: "melee",
      type: "weapon",
    },
    {
      gearClass: "blunt",
      grip: "one-handed",
      modality: "melee",
      type: "weapon",
    },
    {
      gearClass: "medium",
      type: "shield",
    },
    {
      gearClass: "reinforced",
      type: "armor",
    },
  ],
  20: [
    { item: TRINKETS["antique coin"].item, type: "trinket" },
    { item: INFUSABLES["monkey paw"].item, type: "trinket" },
  ],
  [CREW.fletcher.requiredStage]: [{ item: TRINKETS["ammunition pouch"].item, type: "trinket" }],
  35: [{ item: TRINKETS["journal"].item, type: "trinket" }],
  40: [{ item: INFUSABLES["tome of power"].item, type: "trinket" }],
};

export const TAILORING_EXPANSION = {
  ammunitionPouch: 20,
  knapsack: 3,
};
export const TAILORING_PRICE_MAXIMUM = {
  ammunitionPouch: 300,
  knapsack: 500,
};

export const TRANSMUTE_COST = 3;
export const TRANSMUTE_YIELD = 1;

export const WITCH_POTIONS = ["elixir", "antidote", "salve"] as const;
