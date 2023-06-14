import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { TrinketName } from "@neverquest/types";
import type { CrewMember } from "@neverquest/types/unions";

export const BLACKSMITH_GEAR_LEVEL_MAXIMUM = 3;

export const CREW: Record<
  CrewMember,
  {
    coinPrice: number;
    description: string;
    interaction: string;
    monologues: string[];
    name: string;
    requiredStage: number;
  }
> = {
  // TODO
  alchemist: {
    coinPrice: 100,
    description: "Converts resources between one another.",
    interaction: "Transmute",
    monologues: ["Things are not always what they seem."],
    name: "Alchemist",
    requiredStage: 16,
  },
  blacksmith: {
    coinPrice: 20,
    description: "Crafts superior gear.",
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
    requiredStage: 5,
  },
  medic: {
    coinPrice: 50,
    description: "Heals wounds and sells bandages.",
    interaction: "Heal",
    monologues: ["Allow me to patch you up."],
    name: "Medic",
    requiredStage: 6,
  },
  mercenary: {
    coinPrice: 80,
    description: "Trains new skills and attributes.",
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
    requiredStage: 12,
  },
  merchant: {
    coinPrice: 0,
    description: "Offers various items for purchase and buys unwanted items.",
    interaction: "Trade",
    monologues: [
      "Greetings. I have what you're looking for.",
      "Hello again. Some threads, perhaps?",
      "Ah, you're back. Care for more protection?",
      "You must be over-burdened. I have just the thing.",
      "I heard there are other travelers looking to sell their services.",
      "Welcome back. Always a sight for sore eyes.",
    ],
    name: "Merchant",
    requiredStage: 0,
  },
  // TODO
  mystic: {
    coinPrice: 200,
    description: "Offers a ritual that purges all essence.",
    interaction: "Ritual",
    monologues: ["Prepared to pierce the veil?"],
    name: "Alchemist",
    requiredStage: 30,
  },
  tailor: {
    coinPrice: 30,
    description: "Expands inventory space.",
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
    requiredStage: 8,
  },
  // TODO
  witch: {
    coinPrice: 150,
    description: "Sells potions that cure ailments.",
    interaction: "Brew",
    monologues: ["Gaze deep into my cauldron ..."],
    name: "Alchemist",
    requiredStage: 20,
  },
};

export const CREW_ORDER: CrewMember[] = Object.entries(CREW)
  .sort(([, a], [, b]) => a.requiredStage - b.requiredStage)
  .map(([type]) => type as CrewMember);

export const MEDIC_PRICE_BANDAGES = 18;
export const MEDIC_PRICE_SURGERY = 6;
export const MEDIC_PRICE_SURGERY_CRITICAL = 15;

export const MERCHANT_OFFERS: (
  | (ArtifactType<"armor"> & {
      gearClass: ArmorClass;
    })
  | (ArtifactType<"shield"> & {
      gearClass: ShieldClass;
    })
  | (ArtifactType<"trinket"> & {
      name: TrinketName;
    })
  | (ArtifactType<"weapon"> & {
      gearClass: WeaponClass;
      modality: WeaponModality;
    })
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
