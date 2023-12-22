import { GLITCH_NUMBER } from "@neverquest/data/general";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAntidote from "@neverquest/icons/antidote.svg?react";
import IconAntiqueCoin from "@neverquest/icons/antique-coin.svg?react";
import IconBandages from "@neverquest/icons/bandages.svg?react";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconElixir from "@neverquest/icons/elixir.svg?react";
import IconEnderHook from "@neverquest/icons/ender-hook.svg?react";
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
import type {
  Consumable,
  Elemental,
  Gem,
  Infusable,
  MonsterAilmentElemental,
  Trinket,
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
        description: "Fully restores health.",
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

export const ELEMENTALS: Record<
  Elemental,
  {
    ailment: MonsterAilmentElemental;
    color: string;
    damage: GeneratorRange;
    damageModification: string;
    duration: GeneratorRange;
    durationCap: number;
    gem: Gem;
    Icon: SVGIcon;
  }
> = {
  fire: {
    ailment: "burning",
    color: "text-orange",
    damage: { maximum: 1, minimum: 0.1 },
    damageModification: "high",
    duration: { maximum: 8500, minimum: 5000 },
    durationCap: 25_000,
    gem: "ruby",
    Icon: IconFire,
  },
  ice: {
    ailment: "frozen",
    color: "text-blue",
    damage: { maximum: 0.5, minimum: 0.05 },
    damageModification: "low",
    duration: { maximum: 2500, minimum: 1000 },
    durationCap: 4000,
    gem: "sapphire",
    Icon: IconIce,
  },
  lightning: {
    ailment: "shocked",
    color: "text-yellow",
    damage: { maximum: 0.8, minimum: 0.075 },
    damageModification: "medium",
    duration: { maximum: 2000, minimum: 800 },
    durationCap: 7000,
    gem: "topaz",
    Icon: IconLightning,
  },
};

export const ENCUMBRANCE_CAPACITY = 6;

export const GEM_BASE = {
  price: 250,
  weight: 1,
};
export const GEM_DROP_CHANCE = { equalStage: 1, lowerStage: 0.5 };
export const GEM_ENHANCEMENT_RANGE = { maximum: 1, minimum: 0.1 };
export const GEM_FITTING_COST_RANGE = { maximum: 300, minimum: 10 };
export const GEMS: Record<Gem, Elemental> = {
  ruby: "fire",
  sapphire: "ice",
  topaz: "lightning",
};
export const GEMS_MAXIMUM = 5;

export const INFUSABLES: Record<
  Infusable,
  {
    Icon: SVGIcon;
    item: Omit<InfusableItem, "ID">;
  }
> = {
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      description: "Boosts amount of essence looted.",
      growthBase: 3,
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
      level: 0,
      maximum: 1.5,
      minimum: 0.05,
      name: "tome of power",
      price: 2500,
      weight: 10,
    },
  },
};

export const TORN_MANUSCRIPT_DROP_CHANCE = {
  chance: 0.01,
  chanceOverride: 0.07,
  stageIncludes: GLITCH_NUMBER,
};

export const TRINKETS: Record<
  Trinket,
  {
    Icon: SVGIcon;
    item: Omit<AmmunitionPouchItem, "ID"> | Omit<KnapsackItem, "ID"> | Omit<TrinketItem, "ID">;
  }
> = {
  "ammunition pouch": {
    Icon: IconAmmunitionPouch,
    item: {
      current: 0,
      description: "Store ammunition for ranged weapons.",
      maximum: AMMUNITION_CAPACITY,
      name: "ammunition pouch",
      price: 250,
      weight: 6,
    },
  },
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      description: "The wielder is bestowed with lucky finds.",
      name: "antique coin",
      price: 777,
      weight: 2,
    },
  },
  compass: {
    Icon: IconCompass,
    item: {
      description: "Navigate the wilderness to freely explore previous locations.",
      name: "compass",
      price: 30,
      weight: 2,
    },
  },
  "ender hook": {
    Icon: IconEnderHook,
    item: {
      description: "Monsters are looted immediately upon death.",
      name: "ender hook",
      price: 1000,
      weight: 15,
    },
  },
  familiar: {
    Icon: IconFamiliar,
    item: {
      description: "Blessed with the ability to see beyond the veil.",
      name: "familiar",
      price: 1,
      weight: 17,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      description: "Travel back to the caravan even when there are still lurking monsters.",
      name: "hearthstone",
      price: 60,
      weight: 3,
    },
  },
  journal: {
    Icon: IconJournal,
    item: {
      description: "A compendium of quests.",
      name: "journal",
      price: 500,
      weight: 5,
    },
  },
  knapsack: {
    Icon: IconKnapsack,
    item: {
      capacity: 15,
      description: "Carry more items and manage gear.",
      name: "knapsack",
      price: 10,
      weight: 0,
    },
  },
  "torn manuscript": {
    Icon: IconTornManuscript,
    item: {
      description: "Alchemical methodologies beyond comprehension.",
      name: "torn manuscript",
      price: 5000,
      weight: 3,
    },
  },
};
