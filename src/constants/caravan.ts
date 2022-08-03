import { ShieldType, WeaponType } from "@neverquest/locra/types";
import Blacksmith from "@neverquest/components/Caravan/Blacksmith";
import Cook from "@neverquest/components/Caravan/Cook";
import Medic from "@neverquest/components/Caravan/Medic";
import Merchant from "@neverquest/components/Caravan/Merchant";
import Mercenary from "@neverquest/components/Caravan/Mercenary";
import Tailor from "@neverquest/components/Caravan/Tailor";
import { ITEM_COMPASS, ITEM_HEARTHSTONE, ITEM_KNAPSACK } from "@neverquest/constants/items";
import { CrewMember, Item } from "@neverquest/types";
import { ArmorClass, CrewType, WeaponClass } from "@neverquest/types/enums";

export const CREW_MEMBERS: Record<CrewType, CrewMember> = {
  [CrewType.Blacksmith]: {
    Component: Blacksmith,
    description: "Crafts superior gear.",
    interaction: "Craft",
    hirableLevel: 5,
    monologues: ["What can I make ya?"],
    name: "Blacksmith",
    price: 35,
  },
  // TODO
  [CrewType.Cook]: {
    Component: Cook,
    description: "Cooks delicious meals that revitalize.",
    interaction: "Trade",
    hirableLevel: 99,
    monologues: [""],
    name: "Cook",
    price: 0,
  },
  [CrewType.Medic]: {
    Component: Medic,
    description: "Stems wounds and rescues from certain death.",
    interaction: "Trade",
    hirableLevel: 99,
    monologues: [""],
    name: "Medic",
    price: 0,
  },
  [CrewType.Mercenary]: {
    Component: Mercenary,
    description: "Trains new skills and attributes.",
    interaction: "Train",
    hirableLevel: 5,
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
    price: 25,
  },
  [CrewType.Merchant]: {
    Component: Merchant,
    description: "",
    interaction: "Trade",
    hirableLevel: 0,
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
    Component: Tailor,
    description: "",
    interaction: "Upgrade",
    hirableLevel: 99,
    monologues: ["Allow me to deepen your pockets."],
    name: "Tailor",
    price: 0,
  },
};

export const CREW_ORDER = [
  CrewType.Merchant,
  CrewType.Mercenary,
  CrewType.Blacksmith,
  CrewType.Cook,
  CrewType.Medic,
  CrewType.Tailor,
];

export const CREW_INITIAL = [CrewType.Merchant];

export const EXCHANGE_COIN = 1;

export const EXCHANGE_SCRAP = 3;

export const MERCHANT_OFFERS: Record<
  number,
  (
    | Item
    | { type: WeaponType; weaponClass: WeaponClass }
    | { armorClass: ArmorClass }
    | { type: ShieldType }
  )[]
> = {
  1: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Light,
    },
  ],
  2: [
    {
      armorClass: ArmorClass.Hide,
    },
  ],
  3: [
    {
      type: ShieldType.Small,
    },
  ],
  4: [ITEM_KNAPSACK],
  5: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Balanced,
    },
    {
      armorClass: ArmorClass.Reinforced,
    },
    {
      type: ShieldType.Medium,
    },
  ],
  6: [ITEM_COMPASS],
  7: [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Heavy,
    },
    {
      type: ShieldType.Tower,
    },
  ],
  8: [ITEM_HEARTHSTONE],
};
