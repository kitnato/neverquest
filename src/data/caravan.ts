import { ReactComponent as IconCrew } from "@neverquest/icons/cowled.svg";
import type { CrewMember } from "@neverquest/types";
import { CrewType } from "@neverquest/types/enums";

export const CREW: Record<CrewType, CrewMember> = {
  // TODO
  [CrewType.Alchemist]: {
    coinPrice: 0,
    description: ".",
    hirableLevel: 99,
    interaction: "Transmute",
    monologues: [""],
    name: "Alchemist",
  },
  [CrewType.Blacksmith]: {
    coinPrice: 25,
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
  },
  // TODO
  [CrewType.Medic]: {
    coinPrice: 0,
    description: "Stems wounds and sells first aid kits.",
    hirableLevel: 99,
    interaction: "Heal",
    monologues: [""],
    name: "Medic",
  },
  [CrewType.Mercenary]: {
    coinPrice: 50,
    description: "Trains new skills and attributes.",
    hirableLevel: 8,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
  },
  [CrewType.Merchant]: {
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
  [CrewType.Tailor]: {
    coinPrice: 40,
    description: "Expands inventory space.",
    hirableLevel: 5,
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
  },
};

export const CREW_ICON = IconCrew;

export const CREW_INITIAL = [CrewType.Merchant];

export const CREW_ORDER = [
  CrewType.Merchant,
  CrewType.Mercenary,
  CrewType.Blacksmith,
  CrewType.Tailor,
  CrewType.Medic,
  CrewType.Alchemist,
];
