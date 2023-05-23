import type { FunctionComponent } from "react";

import { Alchemist } from "@neverquest/components/Caravan/Alchemist";
import { Blacksmith } from "@neverquest/components/Caravan/Blacksmith";
import { Medic } from "@neverquest/components/Caravan/Medic";
import { Mercenary } from "@neverquest/components/Caravan/Mercenary";
import { Merchant } from "@neverquest/components/Caravan/Merchant";
import { Mystic } from "@neverquest/components/Caravan/Mystic";
import { Tailor } from "@neverquest/components/Caravan/Tailor";
import { Witch } from "@neverquest/components/Caravan/Witch";
import { CrewMember } from "@neverquest/types/enums";

export const CREW: Record<
  CrewMember,
  {
    coinPrice: number;
    Component: FunctionComponent;
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
    Component: Alchemist,
    description: "Converts essence, scrap and coins between one another.",
    hirableLevel: 15,
    interaction: "Transmute",
    monologues: ["Things are not always what they seem."],
    name: "Alchemist",
  },
  [CrewMember.Blacksmith]: {
    coinPrice: 20,
    Component: Blacksmith,
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
  },
  [CrewMember.Medic]: {
    coinPrice: 50,
    Component: Medic,
    description: "Stems wounds and sells first aid kits.",
    hirableLevel: 12,
    interaction: "Heal",
    monologues: ["Allow me to patch you up."],
    name: "Medic",
  },
  [CrewMember.Mercenary]: {
    coinPrice: 40,
    Component: Mercenary,
    description: "Trains new skills and attributes.",
    hirableLevel: 8,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
  },
  [CrewMember.Merchant]: {
    coinPrice: 0,
    Component: Merchant,
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
  [CrewMember.Mystic]: {
    coinPrice: 150,
    Component: Mystic,
    description: "Unlocks resetting of the power level.",
    hirableLevel: 30,
    interaction: "Ritual",
    monologues: ["Prepared to pierce the veil?"],
    name: "Alchemist",
  },
  [CrewMember.Tailor]: {
    coinPrice: 30,
    Component: Tailor,
    description: "Expands inventory space.",
    hirableLevel: 5,
    interaction: "Upgrade",
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
  },
  // TODO
  [CrewMember.Witch]: {
    coinPrice: 100,
    Component: Witch,
    description: "Sells potions that cure ailments.",
    hirableLevel: 20,
    interaction: "Brew",
    monologues: ["Gaze deep into my cauldron ..."],
    name: "Alchemist",
  },
};

export const CREW_INITIAL = [CrewMember.Merchant] as const;

export const CREW_ORDER = [
  CrewMember.Merchant,
  CrewMember.Mercenary,
  CrewMember.Blacksmith,
  CrewMember.Tailor,
  CrewMember.Medic,
  CrewMember.Witch,
  CrewMember.Alchemist,
  CrewMember.Mystic,
] as const;
