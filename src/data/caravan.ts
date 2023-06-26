import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Consumable, CrewMember, Trinket } from "@neverquest/types/unions";

export const BLACKSMITH_GEAR_LEVEL_MAXIMUM = 3;

export const CREW: Record<
  CrewMember,
  {
    coinPrice: number;
    description: string;
    interaction: string;
    monologues: string[];
    requiredStage: number;
  }
> = {
  alchemist: {
    coinPrice: 100,
    description: "Converts resources between one another.",
    interaction: "Transmute",
    monologues: ["Things are not always what they seem."],
    requiredStage: 16,
  },
  blacksmith: {
    coinPrice: 20,
    description: "Crafts superior gear.",
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    requiredStage: 6,
  },
  medic: {
    coinPrice: 80,
    description: "Heals wounds and sells bandages.",
    interaction: "Heal",
    monologues: ["Allow me to patch you up."],
    requiredStage: 12,
  },
  mercenary: {
    coinPrice: 60,
    description: "Trains new skills and attributes.",
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    requiredStage: 10,
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
      "Got a fresh shipment of gear, care to see?",
      "Heard there are other travelers looking to sell their services.",
      "Welcome back. Always a sight for sore eyes.",
    ],
    requiredStage: 0,
  },
  occultist: {
    coinPrice: 200,
    description: "Sells soulstones and offers purging rituals.",
    interaction: "Ritual",
    monologues: ["Prepared to pierce the veil?"],
    requiredStage: 30,
  },
  tailor: {
    coinPrice: 30,
    description: "Expands inventory space.",
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    requiredStage: 8,
  },
  witch: {
    coinPrice: 150,
    description: "Sells potions that cure ailments.",
    interaction: "Brew",
    monologues: ["Gaze deep into my cauldron ..."],
    requiredStage: 20,
  },
};

export const CREW_ORDER: CrewMember[] = Object.entries(CREW)
  .sort(([, a], [, b]) => a.requiredStage - b.requiredStage)
  .map(([type]) => type as CrewMember);

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = 0.66;

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
      name: Trinket;
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
  [
    { name: "knapsack", type: "trinket" },
    { name: "compass", type: "trinket" },
    { name: "hearthstone", type: "trinket" },
  ],
  [
    {
      gearClass: "slashing",
      modality: "melee",
      type: "weapon",
    },
    {
      gearClass: "blunt",
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
];

export const TRANSMUTE_COST = 3;
export const TRANSMUTE_YIELD = 1;

export const WITCH_POTIONS: Consumable[] = ["elixir", "antidote", "salve"];
