import { ReactComponent as IconAlchemist } from "@neverquest/icons/alchemist.svg";
import { ReactComponent as IconBlacksmith } from "@neverquest/icons/blacksmith.svg";
import { ReactComponent as IconMedic } from "@neverquest/icons/medic.svg";
import { ReactComponent as IconMercenary } from "@neverquest/icons/mercenary.svg";
import { ReactComponent as IconMerchant } from "@neverquest/icons/merchant.svg";
import { ReactComponent as IconOccultist } from "@neverquest/icons/occultist.svg";
import { ReactComponent as IconTailor } from "@neverquest/icons/tailor.svg";
import { ReactComponent as IconWitch } from "@neverquest/icons/witch.svg";
import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRAN/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Crew, Trinket, WeaponGrip } from "@neverquest/types/unions";

export const BLACKSMITH_GEAR_LEVEL_MAXIMUM = 3;

export const CREW: Record<
  Crew,
  {
    coinPrice: number;
    description: string;
    Icon: SVGIcon;
    interaction: string;
    monologues: Record<number, string | undefined>;
    requiredStage: number;
  }
> = {
  alchemist: {
    coinPrice: 200,
    description: "Converts resources between one another.",
    Icon: IconAlchemist,
    interaction: "Transmute",
    monologues: { 1: "Things are not always what they seem." },
    requiredStage: 30,
  },
  blacksmith: {
    coinPrice: 40,
    description: "Crafts superior gear.",
    Icon: IconBlacksmith,
    interaction: "Craft",
    monologues: { 1: "In need of better gear?" },
    requiredStage: 8,
  },
  medic: {
    coinPrice: 80,
    description: "Heals wounds and sells bandages.",
    Icon: IconMedic,
    interaction: "Heal",
    monologues: { 1: "Allow me to patch you up." },
    requiredStage: 12,
  },
  mercenary: {
    coinPrice: 20,
    description: "Trains new skills and attributes.",
    Icon: IconMercenary,
    interaction: "Train",
    monologues: { 1: "Perhaps I can teach you something." },
    requiredStage: 6,
  },
  merchant: {
    coinPrice: 0,
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
      14: "I recently came into possession of a few curiosities.",
      15: "Can I interest you in anything else?",
      25: "A dark wanderer passed by and sold me a strange book ...",
      26: "Welcome back. Always a sight for sore eyes.",
    },
    requiredStage: 0,
  },
  occultist: {
    coinPrice: 150,
    description: "Sells phylacteries and offers purging rituals.",
    Icon: IconOccultist,
    interaction: "Ritual",
    monologues: { 1: "Prepared to pierce the veil?" },
    requiredStage: 20,
  },
  tailor: {
    coinPrice: 60,
    description: "Expands inventory space.",
    Icon: IconTailor,
    interaction: "Tailoring",
    monologues: { 1: "Allow me to deepen your pockets." },
    requiredStage: 10,
  },
  witch: {
    coinPrice: 100,
    description: "Sells potions that cure ailments.",
    Icon: IconWitch,
    interaction: "Brew",
    monologues: { 1: "Gaze deep into my cauldron ..." },
    requiredStage: 16,
  },
};

export const CREW_ORDER: Crew[] = Object.entries(CREW)
  .sort(([, a], [, b]) => a.requiredStage - b.requiredStage)
  .map(([type]) => type as Crew);

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = 0.33;

export const MEDIC_PRICE_SURGERY = 6;
export const MEDIC_PRICE_SURGERY_CRITICAL = 15;

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
          name: Trinket;
        })
      | (ArtifactType<"weapon"> & {
          gearClass: WeaponClass;
          grip: WeaponGrip;
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
      gearClass: "hide",
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
    { name: "knapsack", type: "trinket" },
    { name: "compass", type: "trinket" },
    { name: "hearthstone", type: "trinket" },
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
  14: [
    { name: "antique coin", type: "trinket" },
    { name: "monkey paw", type: "trinket" },
  ],
  25: [{ name: "tome of power", type: "trinket" }],
};

export const TRANSMUTE_COST = 3;
export const TRANSMUTE_YIELD = 1;

export const WITCH_POTIONS: Consumable[] = ["elixir", "antidote", "salve"];
