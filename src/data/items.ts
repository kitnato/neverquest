import { nanoid } from "nanoid";

import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAntidote from "@neverquest/icons/antidote.svg?react";
import IconAntiqueCoin from "@neverquest/icons/antique-coin.svg?react";
import IconBandages from "@neverquest/icons/bandages.svg?react";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconElixir from "@neverquest/icons/elixir.svg?react";
import IconFamiliar from "@neverquest/icons/familiar.svg?react";
import IconFire from "@neverquest/icons/fire.svg?react";
import IconStone from "@neverquest/icons/hearthstone.svg?react";
import IconIce from "@neverquest/icons/ice.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import IconKnapsack from "@neverquest/icons/knapsack.svg?react";
import IconLightning from "@neverquest/icons/lightning.svg?react";
import IconMonkeyPaw from "@neverquest/icons/monkey-paw.svg?react";
import IconMysteriousEgg from "@neverquest/icons/mysterious-egg.svg?react";
import IconPhylactery from "@neverquest/icons/phylactery.svg?react";
import IconSalve from "@neverquest/icons/salve.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconTornManuscript from "@neverquest/icons/torn-manuscript.svg?react";
import type {
  AmmunitionPouchItem,
  ConsumableItem,
  GeneratorRange,
  InfusableItem,
  KnapsackItem,
  TrinketItem,
} from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import {
  type Consumable,
  type Elemental,
  type Gem,
  INFUSABLE_TYPES,
  type Infusable,
  type MonsterAilmentElemental,
  type Trinket,
} from "@neverquest/types/unions";

export const AMMUNITION_CAPACITY = 100;

export const CONSUMABLES: Record<Consumable, { Icon: SVGIcon; item: Omit<ConsumableItem, "ID"> }> =
  {
    antidote: {
      Icon: IconAntidote,
      item: {
        description: "Cures poison.",
        name: "antidote",
        price: 120,
        weight: 5,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        description: "Restores all health.",
        name: "bandages",
        price: 40,
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        description: "Restores all stamina.",
        name: "elixir",
        price: 25,
        weight: 2,
      },
    },
    phylactery: {
      Icon: IconPhylactery,
      item: {
        description: "Resurrects the carrier upon death.",
        name: "phylactery",
        price: 500,
        weight: 10,
      },
    },
    salve: {
      Icon: IconSalve,
      item: {
        description: "Cures blight.",
        name: "salve",
        price: 80,
        weight: 3,
      },
    },
  };

export const DROP_CHANCES = {
  "mysterious egg": 0.03,
  "torn manuscript": 0.01,
};
export const DROP_CHANCES_OVERRIDE = {
  factor: 15,
  stage: 77,
};

export const ELEMENTAL_DURATION: Record<Elemental, GeneratorRange> = {
  fire: { maximum: 2500, minimum: 1000 },
  ice: { maximum: 1500, minimum: 500 },
  lightning: { maximum: 3000, minimum: 1500 },
};
export const ELEMENTALS: Record<
  Elemental,
  { ailment: MonsterAilmentElemental; color: string; Icon: SVGIcon }
> = {
  fire: {
    ailment: "burning",
    color: "text-orange",
    Icon: IconFire,
  },
  ice: {
    ailment: "frozen",
    color: "text-blue",
    Icon: IconIce,
  },
  lightning: {
    ailment: "shocked",
    color: "text-yellow",
    Icon: IconLightning,
  },
};

export const ENCUMBRANCE_CAPACITY = 6;

export const INHERITABLE_ITEMS = ["knapsack", "journal", ...INFUSABLE_TYPES] as const;

export const KNAPSACK_CAPACITY = 12;

export const GEM_BASE = {
  price: 100,
  weight: 1,
};
export const GEM_DAMAGE = [0.1, 0.2, 0.4, 0.7, 1];
export const GEM_DROP_CHANCE = { equalStage: 1, lowerStage: 0.33 };
export const GEM_ELEMENTALS: Record<Gem, Elemental> = {
  ruby: "fire",
  sapphire: "ice",
  topaz: "lightning",
};
export const GEM_ENHANCEMENT = [0.1, 0.25, 0.45, 0.7, 1];
export const GEM_FITTING_COST = [10, 30, 70, 150, 300];
export const GEMS_MAXIMUM = GEM_DAMAGE.length;

export const INFUSABLES: Record<
  Infusable,
  {
    Icon: SVGIcon;
    item: InfusableItem;
  }
> = {
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      description: "Boosts amount of essence looted.",
      growthBase: 3,
      ID: nanoid(),
      level: 0,
      maximum: 2,
      minimum: 0.025,
      name: "monkey paw",
      price: 500,
      weight: 4,
    },
  },
  "mysterious egg": {
    Icon: IconMysteriousEgg,
    item: {
      description: "A perplexing ovum emanating otherworldly energy.",
      growthBase: 2,
      ID: nanoid(),
      level: 0,
      maximum: 1,
      minimum: 0,
      name: "mysterious egg",
      price: 1000,
      weight: 7,
    },
  },
  "tome of power": {
    Icon: IconTomeOfPower,
    item: {
      description: "Boosts all attribute effects based on power level.",
      growthBase: 4,
      ID: nanoid(),
      level: 0,
      maximum: 1.5,
      minimum: 0.05,
      name: "tome of power",
      price: 2500,
      weight: 10,
    },
  },
};

export const TRINKETS: Record<
  Trinket,
  { Icon: SVGIcon; item: AmmunitionPouchItem | KnapsackItem | TrinketItem }
> = {
  "ammunition pouch": {
    Icon: IconAmmunitionPouch,
    item: {
      current: 0,
      description: "Store ammunition for ranged weapons.",
      ID: nanoid(),
      maximum: AMMUNITION_CAPACITY,
      name: "ammunition pouch",
      price: 250,
      weight: 6,
    },
  },
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      description: "The wielder is bestowed with extreme fortune.",
      ID: nanoid(),
      name: "antique coin",
      price: 999,
      weight: 2,
    },
  },
  compass: {
    Icon: IconCompass,
    item: {
      description: "Navigate the wilderness to hunt in previous locations.",
      ID: nanoid(),
      name: "compass",
      price: 50,
      weight: 2,
    },
  },
  familiar: {
    Icon: IconFamiliar,
    item: {
      description: "Blessed with the ability to see beyond.",
      ID: nanoid(),
      name: "familiar",
      price: 1,
      weight: 17,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      description: "Travel back to the caravan even when there are still lurking monsters.",
      ID: nanoid(),
      name: "hearthstone",
      price: 20,
      weight: 3,
    },
  },
  journal: {
    Icon: IconJournal,
    item: {
      description: "A compendium of quests.",
      ID: nanoid(),
      name: "journal",
      price: 500,
      weight: 5,
    },
  },
  knapsack: {
    Icon: IconKnapsack,
    item: {
      capacity: KNAPSACK_CAPACITY,
      description: "Carry more items and manage gear.",
      ID: nanoid(),
      name: "knapsack",
      price: 10,
      weight: 0,
    },
  },
  "torn manuscript": {
    Icon: IconTornManuscript,
    item: {
      description: "Alchemical methodologies beyond comprehension.",
      ID: nanoid(),
      name: "torn manuscript",
      price: 5000,
      weight: 3,
    },
  },
};
