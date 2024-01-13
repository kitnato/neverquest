import { FRAMERATE } from "@neverquest/data/general";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAntidote from "@neverquest/icons/antidote.svg?react";
import IconBandages from "@neverquest/icons/bandages.svg?react";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconElixir from "@neverquest/icons/elixir.svg?react";
import IconEnderHook from "@neverquest/icons/ender-hook.svg?react";
import IconFamiliar from "@neverquest/icons/familiar.svg?react";
import IconFire from "@neverquest/icons/fire.svg?react";
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react";
import IconStone from "@neverquest/icons/hearthstone.svg?react";
import IconIce from "@neverquest/icons/ice.svg?react";
import IconJournalTrinket from "@neverquest/icons/journal-trinket.svg?react";
import IconKnapsack from "@neverquest/icons/knapsack.svg?react";
import IconLightning from "@neverquest/icons/lightning.svg?react";
import IconMemento from "@neverquest/icons/memento.svg?react";
import IconMysteriousEgg from "@neverquest/icons/mysterious-egg.svg?react";
import IconPhylactery from "@neverquest/icons/phylactery.svg?react";
import IconPowerBonusBoost from "@neverquest/icons/power-bonus-boost.svg?react";
import IconRuby from "@neverquest/icons/ruby.svg?react";
import IconSalve from "@neverquest/icons/salve.svg?react";
import IconSapphire from "@neverquest/icons/sapphire.svg?react";
import IconSpinningWheel from "@neverquest/icons/spinning-wheel.svg?react";
import IconThaumaturgicGoggles from "@neverquest/icons/thaumaturgic-goggles.svg?react";
import IconTopaz from "@neverquest/icons/topaz.svg?react";
import IconTornManuscript from "@neverquest/icons/torn-manuscript.svg?react";
import type { ConsumableItem, GeneratorRange, InfusableItem, TrinketItem } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type {
  Consumable,
  Delta,
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
        description: "Cures poisonDuration.",
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
        price: 35,
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
    duration: { maximum: 3000, minimum: 1500 },
    durationCap: 7500,
    gem: "ruby",
    Icon: IconFire,
  },
  ice: {
    ailment: "frozen",
    color: "text-blue",
    damage: { maximum: 0.5, minimum: 0.05 },
    damageModification: "low",
    duration: { maximum: 2000, minimum: 900 },
    durationCap: 3000,
    gem: "sapphire",
    Icon: IconIce,
  },
  lightning: {
    ailment: "shocked",
    color: "text-yellow",
    damage: { maximum: 0.8, minimum: 0.075 },
    damageModification: "medium",
    duration: { maximum: 2500, minimum: 1000 },
    durationCap: 5000,
    gem: "topaz",
    Icon: IconLightning,
  },
};

export const ENCUMBRANCE_CAPACITY = 6;

export const GEM_BASE = {
  price: 250,
  weight: 1,
};
export const GEM_DROP_CHANCE = { equalStage: 1, lowerStage: 0.25 };
export const GEM_ENHANCEMENT_RANGE = { maximum: 1, minimum: 0.1 };
export const GEM_FITTING_COST_RANGE = { maximum: 300, minimum: 10 };
export const GEMS: Record<Gem, { elemental: Elemental; Icon: SVGIcon }> = {
  ruby: { elemental: "fire", Icon: IconRuby },
  sapphire: { elemental: "ice", Icon: IconSapphire },
  topaz: { elemental: "lightning", Icon: IconTopaz },
};
export const GEMS_MAXIMUM = 5;

export const INFUSION_BASE = 2;

export const INFUSION_DELTA = FRAMERATE * 2;
export const INFUSION_DURATION = 1000;

export const INFUSABLES: Record<
  Infusable,
  {
    delta: Delta;
    EffectIcon: SVGIcon;
    Icon: SVGIcon;
    item: Omit<InfusableItem, "ID">;
    tooltip: string;
  }
> = {
  "eldritch codex": {
    delta: "powerBonusBoost",
    EffectIcon: IconPowerBonusBoost,
    Icon: IconEldritchCodex,
    item: {
      description: "Boosts all attribute effects based on power level.",
      effect: {
        maximum: 1.5,
        minimum: 0,
      },
      name: "eldritch codex",
      price: 2500,
      weight: 10,
    },
    tooltip: "Power bonus boost",
  },
  "mysterious egg": {
    delta: "hatchingProgress",
    EffectIcon: IconHatchingProgress,
    Icon: IconMysteriousEgg,
    item: {
      description: "A perplexing ovum emanating otherworldly energy.",
      effect: { maximum: 1, minimum: 0 },
      name: "mysterious egg",
      price: 1554,
      weight: 7,
    },
    tooltip: "Hatching progress",
  },
};

export const KNAPSACK_CAPACITY = 15;

export const TRINKET_DROP_CHANCE = {
  memento: { maximum: 0.2, minimum: 0.01 },
  "torn manuscript": { maximum: 0.1, minimum: 0.03 },
};

export const TRINKETS: Record<
  Trinket,
  {
    Icon: SVGIcon;
    item: Omit<TrinketItem, "ID">;
  }
> = {
  "ammunition pouch": {
    Icon: IconAmmunitionPouch,
    item: {
      description: "Stores ammunition for ranged weapons.",
      name: "ammunition pouch",
      price: 250,
      weight: 6,
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
      description: "Blessed with the ability to see beyond the grim entity.",
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
    Icon: IconJournalTrinket,
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
      description: "Carry more items and manage gear.",
      name: "knapsack",
      price: 10,
      weight: 0,
    },
  },
  memento: {
    Icon: IconMemento,
    item: {
      description: "Priceless flashbacks eventually lead to extraordinary discoveries.",
      name: "memento",
      price: 154,
      weight: 2,
    },
  },
  "spinning wheel": {
    Icon: IconSpinningWheel,
    item: {
      description:
        "Once running, automatically collect all loot and pass to the next stage once it is cleared of monsters.",
      name: "spinning wheel",
      price: 7500,
      weight: 20,
    },
  },
  "thaumaturgic goggles": {
    Icon: IconThaumaturgicGoggles,
    item: {
      description:
        "Allows the wearer to discern detailed lethality of themselves and their opponents.",
      name: "thaumaturgic goggles",
      price: 100,
      weight: 4,
    },
  },
  "torn manuscript": {
    Icon: IconTornManuscript,
    item: {
      description:
        "Describes theurgical methodologies beyond comprehension. Of use only to the alchemically inclined.",
      name: "torn manuscript",
      price: 5000,
      weight: 3,
    },
  },
};
