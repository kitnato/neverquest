import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { TrinketName } from "@neverquest/types";
import { CrewMember } from "@neverquest/types/enums";

export const BLACKSMITH_GEAR_LEVEL_MAXIMUM = 3;

export const CREW: Record<
  CrewMember,
  {
    coinPrice: number;
    description: string;
    hirableLevel: number;
    interaction: string;
    monologues: string[];
    name: string;
  }
> = {
  // TODO
  [CrewMember.Alchemist]: {
    coinPrice: 60,
    description: "Converts essence, scrap and coins between one another.",
    hirableLevel: 15,
    interaction: "Transmute",
    monologues: ["Things are not always what they seem."],
    name: "Alchemist",
  },
  [CrewMember.Blacksmith]: {
    coinPrice: 20,
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
  },
  [CrewMember.Medic]: {
    coinPrice: 50,
    description: "Heals wounds and sells bandages.",
    hirableLevel: 8,
    interaction: "Heal",
    monologues: ["Allow me to patch you up."],
    name: "Medic",
  },
  [CrewMember.Mercenary]: {
    coinPrice: 40,
    description: "Trains new skills and attributes.",
    hirableLevel: 12,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
  },
  [CrewMember.Merchant]: {
    coinPrice: 0,
    description: "Offers various items for purchase and buys unwanted items.",
    hirableLevel: 0,
    interaction: "Trade",
    monologues: [
      "Greetings. I have what you're looking for.",
      "Hello again. Some threads, perhaps?",
      "Ah, you're back. Care for more protection?",
      "You must be over-burdened. I have just the thing.",
      "Welcome back. Always a sight for sore eyes.",
    ],
    name: "Merchant",
  },
  // TODO
  [CrewMember.Mystic]: {
    coinPrice: 200,
    description: "Unlocks resetting of the power level.",
    hirableLevel: 30,
    interaction: "Ritual",
    monologues: ["Prepared to pierce the veil?"],
    name: "Alchemist",
  },
  [CrewMember.Tailor]: {
    coinPrice: 40,
    description: "Expands inventory space.",
    hirableLevel: 6,
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
  },
  // TODO
  [CrewMember.Witch]: {
    coinPrice: 120,
    description: "Sells potions that cure ailments.",
    hirableLevel: 20,
    interaction: "Brew",
    monologues: ["Gaze deep into my cauldron ..."],
    name: "Alchemist",
  },
};

export const CREW_INITIAL = [CrewMember.Merchant] as const;

export const CREW_ORDER: CrewMember[] = Object.entries(CREW)
  .sort(([, a], [, b]) => a.hirableLevel - b.hirableLevel)
  .map(([type]) => Number(type) as CrewMember);

export const MEDIC_PRICE_BANDAGES = 18;
export const MEDIC_PRICE_SURGERY = 6;
export const MEDIC_PRICE_SURGERY_CRITICAL = 15;

export const MERCHANT_OFFERS: (
  | ({
      gearClass: ArmorClass;
    } & ArtifactType<"armor">)
  | ({
      gearClass: ShieldClass;
    } & ArtifactType<"shield">)
  | ({
      gearClass: WeaponClass;
      modality: WeaponModality;
    } & ArtifactType<"weapon">)
  | ({
      name: TrinketName;
    } & ArtifactType<"trinket">)
)[][] = [
  [
    {
      gearClass: "piercing",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "hide",
      type: "armor",
    },
  ],
  [
    {
      gearClass: "small",
      type: "shield",
    },
  ],
  [{ name: "Knapsack", type: "trinket" }],
  [
    { name: "Compass", type: "trinket" },
    { name: "Hearthstone", type: "trinket" },
  ],
  [
    {
      gearClass: "slashing",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "blunt",
      modality: "melee",
      type: "weapon",
    },
  ],
  [
    {
      gearClass: "medium",
      type: "shield",
    },
  ],
  [
    {
      gearClass: "reinforced",
      type: "armor",
    },
  ],
];
