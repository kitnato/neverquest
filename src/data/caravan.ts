import { CrewMember } from "@neverquest/types/enums";

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
    coinPrice: 0,
    description: ".",
    hirableLevel: 99,
    interaction: "Transmute",
    monologues: [""],
    name: "Alchemist",
  },
  [CrewMember.Blacksmith]: {
    coinPrice: 25,
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
  },
  // TODO
  [CrewMember.Medic]: {
    coinPrice: 0,
    description: "Stems wounds and sells first aid kits.",
    hirableLevel: 99,
    interaction: "Heal",
    monologues: [""],
    name: "Medic",
  },
  [CrewMember.Mercenary]: {
    coinPrice: 50,
    description: "Trains new skills and attributes.",
    hirableLevel: 8,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
  },
  [CrewMember.Merchant]: {
    coinPrice: 0,
    description: "",
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
  [CrewMember.Tailor]: {
    coinPrice: 40,
    description: "Expands inventory space.",
    hirableLevel: 5,
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
  },
};

export const CREW_INITIAL = [CrewMember.Merchant] as const;

export const CREW_ORDER = [
  CrewMember.Merchant,
  CrewMember.Mercenary,
  CrewMember.Blacksmith,
  CrewMember.Tailor,
  CrewMember.Medic,
  CrewMember.Alchemist,
] as const;
