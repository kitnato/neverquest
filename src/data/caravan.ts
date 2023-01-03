import { CrewMember } from "@neverquest/types";
import { CrewType } from "@neverquest/types/enums";

export const CREW: Record<CrewType, CrewMember> = {
  [CrewType.Blacksmith]: {
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
    price: 35,
  },
  // TODO
  [CrewType.Cook]: {
    description: "Cooks delicious meals that revitalize.",
    hirableLevel: 99,
    interaction: "Trade",
    monologues: [""],
    name: "Cook",
    price: 0,
  },
  [CrewType.Medic]: {
    description: "Stems wounds and rescues from certain death.",
    hirableLevel: 99,
    interaction: "Trade",
    monologues: [""],
    name: "Medic",
    price: 0,
  },
  [CrewType.Mercenary]: {
    description: "Trains new skills and attributes.",
    hirableLevel: 5,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
    price: 25,
  },
  [CrewType.Merchant]: {
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
    price: 0,
  },
  // TODO
  [CrewType.Tailor]: {
    description: "",
    hirableLevel: 99,
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
    price: 0,
  },
};

export const CREW_INITIAL = [CrewType.Merchant];

export const CREW_ORDER = [
  CrewType.Merchant,
  CrewType.Mercenary,
  CrewType.Blacksmith,
  CrewType.Cook,
  CrewType.Medic,
  CrewType.Tailor,
];
