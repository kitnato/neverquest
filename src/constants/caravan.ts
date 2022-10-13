import Blacksmith from "@neverquest/components/Caravan/Blacksmith";
import Cook from "@neverquest/components/Caravan/Cook";
import Medic from "@neverquest/components/Caravan/Medic";
import Mercenary from "@neverquest/components/Caravan/Mercenary";
import Merchant from "@neverquest/components/Caravan/Merchant";
import Tailor from "@neverquest/components/Caravan/Tailor";
import { ITEM_COMPASS, ITEM_HEARTHSTONE, ITEM_KNAPSACK } from "@neverquest/constants/items";
import { ShieldType, WeaponClass, WeaponType } from "@neverquest/locra/types";
import { CrewMember, Item } from "@neverquest/types";
import { ArmorClass, CrewType } from "@neverquest/types/enums";

export const CREW_MEMBERS: Record<CrewType, CrewMember> = {
  [CrewType.Blacksmith]: {
    Component: Blacksmith,
    description: "Crafts superior gear.",
    hirableLevel: 5,
    interaction: "Craft",
    monologues: ["In need of better gear?"],
    name: "Blacksmith",
    price: 35,
  },
  // TODO
  [CrewType.Cook]: {
    Component: Cook,
    description: "Cooks delicious meals that revitalize.",
    hirableLevel: 99,
    interaction: "Trade",
    monologues: [""],
    name: "Cook",
    price: 0,
  },
  [CrewType.Medic]: {
    Component: Medic,
    description: "Stems wounds and rescues from certain death.",
    hirableLevel: 99,
    interaction: "Trade",
    monologues: [""],
    name: "Medic",
    price: 0,
  },
  [CrewType.Mercenary]: {
    Component: Mercenary,
    description: "Trains new skills and attributes.",
    hirableLevel: 5,
    interaction: "Train",
    monologues: ["Perhaps I can teach you something."],
    name: "Mercenary",
    price: 25,
  },
  [CrewType.Merchant]: {
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
    price: 0,
  },
  // TODO
  [CrewType.Tailor]: {
    Component: Tailor,
    description: "",
    hirableLevel: 99,
    interaction: "Upgrade",
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

export const MERCHANT_OFFERS: (
  | Item
  | { type: WeaponType; weaponClass: WeaponClass }
  | { armorClass: ArmorClass }
  | { type: ShieldType }
)[][] = [
  [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Piercing,
    },
  ],
  [
    {
      armorClass: ArmorClass.Hide,
    },
  ],
  [
    {
      type: ShieldType.Small,
    },
  ],
  [ITEM_KNAPSACK],
  [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Slashing,
    },
    {
      armorClass: ArmorClass.Reinforced,
    },
    {
      type: ShieldType.Medium,
    },
  ],
  [ITEM_COMPASS],
  [
    {
      type: WeaponType.Melee,
      weaponClass: WeaponClass.Blunt,
    },
    {
      type: ShieldType.Tower,
    },
  ],
  [ITEM_HEARTHSTONE],
];
