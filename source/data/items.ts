import { FRAMERATE } from "@neverquest/data/general";
import IconAlchemist from "@neverquest/icons/alchemist.svg?react";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconAntidote from "@neverquest/icons/antidote.svg?react";
import IconBandages from "@neverquest/icons/bandages.svg?react";
import IconBlighted from "@neverquest/icons/blighted.svg?react";
import IconCaravan from "@neverquest/icons/caravan.svg?react";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react";
import IconDreamCatcher from "@neverquest/icons/dream-catcher.svg?react";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconElixir from "@neverquest/icons/elixir.svg?react";
import IconEnderHook from "@neverquest/icons/ender-hook.svg?react";
import IconFamiliar from "@neverquest/icons/familiar.svg?react";
import IconFire from "@neverquest/icons/fire.svg?react";
import IconFlatlined from "@neverquest/icons/flatlined.svg?react";
import IconGear from "@neverquest/icons/gear.svg?react";
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStone from "@neverquest/icons/hearthstone.svg?react";
import IconIce from "@neverquest/icons/ice.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import IconKnapsack from "@neverquest/icons/knapsack.svg?react";
import IconLacrimatory from "@neverquest/icons/lacrimatory.svg?react";
import IconLightning from "@neverquest/icons/lightning.svg?react";
import IconLogEntry from "@neverquest/icons/log-entry.svg?react";
import IconLooting from "@neverquest/icons/looting.svg?react";
import IconMemento from "@neverquest/icons/memento.svg?react";
import IconMonsterLurking from "@neverquest/icons/monster-lurking.svg?react";
import IconMysteriousEgg from "@neverquest/icons/mysterious-egg.svg?react";
import IconNavigation from "@neverquest/icons/navigation.svg?react";
import IconPerpetualLoom from "@neverquest/icons/perpetual-loom.svg?react";
import IconPhylactery from "@neverquest/icons/phylactery.svg?react";
import IconPoisonRating from "@neverquest/icons/poison-rating.svg?react";
import IconPoisoned from "@neverquest/icons/poisoned.svg?react";
import IconPowerBonusBoost from "@neverquest/icons/power-bonus-boost.svg?react";
import IconPowerLevel from "@neverquest/icons/power-level.svg?react";
import IconQuests from "@neverquest/icons/quests.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconRuby from "@neverquest/icons/ruby.svg?react";
import IconSalve from "@neverquest/icons/salve.svg?react";
import IconSapphire from "@neverquest/icons/sapphire.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconThaumaturgicGoggles from "@neverquest/icons/thaumaturgic-goggles.svg?react";
import IconTopaz from "@neverquest/icons/topaz.svg?react";
import IconTornManuscript from "@neverquest/icons/torn-manuscript.svg?react";
import IconWilderness from "@neverquest/icons/wilderness.svg?react";
import type { ConsumableItem, GeneratorRange, InfusableItem, RelicItem } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type {
  Consumable,
  Delta,
  Elemental,
  ElementalAilment,
  Gem,
  Infusable,
  Relic,
} from "@neverquest/types/unions";

export const AMMUNITION_CAPACITY = 100;

export const CONSUMABLES: Record<
  Consumable,
  { descriptionIcons: SVGIcon[]; Icon: SVGIcon; item: Omit<ConsumableItem, "ID"> }
> = {
  antidote: {
    descriptionIcons: [IconPoisoned],
    Icon: IconAntidote,
    item: {
      description: "Cures # poison.",
      name: "antidote",
      price: 120,
      weight: 5,
    },
  },
  bandages: {
    descriptionIcons: [IconHealth],
    Icon: IconBandages,
    item: {
      description: "Fully restores # health.",
      name: "bandages",
      price: 30,
      weight: 1,
    },
  },
  elixir: {
    descriptionIcons: [IconStamina],
    Icon: IconElixir,
    item: {
      description: "Fully restores # stamina.",
      name: "elixir",
      price: 40,
      weight: 2,
    },
  },
  phylactery: {
    descriptionIcons: [IconFlatlined],
    Icon: IconPhylactery,
    item: {
      description: "Resurrects the bearer upon # death.",
      name: "phylactery",
      price: 500,
      weight: 10,
    },
  },
  salve: {
    descriptionIcons: [IconBlighted],
    Icon: IconSalve,
    item: {
      description: "Cures # blight.",
      name: "salve",
      price: 80,
      weight: 3,
    },
  },
};

export const ELEMENTALS: Record<
  Elemental,
  {
    ailment: ElementalAilment;
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
    damage: { maximum: 0.8, minimum: 0.1 },
    damageModification: "high",
    duration: { maximum: 2500, minimum: 1200 },
    durationCap: 7500,
    gem: "ruby",
    Icon: IconFire,
  },
  ice: {
    ailment: "frozen",
    color: "text-blue",
    damage: { maximum: 0.4, minimum: 0.05 },
    damageModification: "low",
    duration: { maximum: 2000, minimum: 900 },
    durationCap: 3000,
    gem: "sapphire",
    Icon: IconIce,
  },
  lightning: {
    ailment: "shocked",
    color: "text-indigo",
    damage: { maximum: 0.6, minimum: 0.075 },
    damageModification: "medium",
    duration: { maximum: 2200, minimum: 1000 },
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
export const GEM_FITTING_COST_RANGE = { maximum: 250, minimum: 10 };
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
    descriptionIcons?: SVGIcon[];
    EffectIcon: SVGIcon;
    Icon: SVGIcon;
    item: Omit<InfusableItem, "ID">;
    tooltip: string;
  }
> = {
  "eldritch codex": {
    delta: "powerBonusBoost",
    descriptionIcons: [IconPowerLevel],
    EffectIcon: IconPowerBonusBoost,
    Icon: IconEldritchCodex,
    item: {
      description: "Boosts all attribute effects based on # power level.",
      effect: {
        maximum: 1.5,
        minimum: 0,
      },
      name: "eldritch codex",
      price: 4000,
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

export const RELIC_DROP_CHANCE = {
  memento: { maximum: 0.08, minimum: 0.01 },
  "torn manuscript": { maximum: 0.05, minimum: 0.01 },
};

export const RELICS: Record<
  Relic,
  {
    descriptionIcons?: SVGIcon[];
    Icon: SVGIcon;
    item: Omit<RelicItem, "ID">;
  }
> = {
  "[P71NQ]": {
    Icon: IconLogEntry,
    item: {
      description: "",
      name: "[P71NQ]",
      price: 14_014,
      weight: 14,
    },
  },
  "ammunition pouch": {
    descriptionIcons: [IconAmmunition, IconRanged],
    Icon: IconAmmunitionPouch,
    item: {
      description: "Stores # ammunition for # ranged weapons.",
      name: "ammunition pouch",
      price: 300,
      weight: 6,
    },
  },
  compass: {
    descriptionIcons: [IconNavigation, IconWilderness],
    Icon: IconCompass,
    item: {
      description: "Allows # navigation of the # wilderness to explore previous locations.",
      name: "compass",
      price: 50,
      weight: 2,
    },
  },
  "dream catcher": {
    Icon: IconDreamCatcher,
    item: {
      description:
        "While equipped, protects the bearer from harm by disengaging from overwhelming encounters.",
      name: "dream catcher",
      price: 1500,
      weight: 10,
    },
  },
  "ender hook": {
    descriptionIcons: [IconLooting],
    Icon: IconEnderHook,
    item: {
      description: "Monsters are # looted immediately.",
      name: "ender hook",
      price: 2500,
      weight: 15,
    },
  },
  familiar: {
    Icon: IconFamiliar,
    item: {
      description: "Compels the manifestation of the final entity.",
      name: "familiar",
      price: 1,
      weight: 17,
    },
  },
  hearthstone: {
    descriptionIcons: [IconCaravan, IconMonsterLurking],
    Icon: IconStone,
    item: {
      description: "Instantly travel back to the # caravan regardless of any # lurking monsters.",
      name: "hearthstone",
      price: 100,
      weight: 3,
    },
  },
  journal: {
    descriptionIcons: [IconQuests],
    Icon: IconJournal,
    item: {
      description: "A compendium of # quests.",
      name: "journal",
      price: 750,
      weight: 5,
    },
  },
  knapsack: {
    descriptionIcons: [IconGear],
    Icon: IconKnapsack,
    item: {
      description: "Provides space for items and the ability to manage # gear.",
      name: "knapsack",
      price: 15,
      weight: 0,
    },
  },
  lacrimatory: {
    descriptionIcons: [IconPoisonRating],
    Icon: IconLacrimatory,
    item: {
      description: "Enables the collection of samples from # noxious foes.",
      name: "lacrimatory",
      price: 1500,
      weight: 8,
    },
  },
  memento: {
    Icon: IconMemento,
    item: {
      description: "Lost memories eventually lead to extraordinary discoveries.",
      name: "memento",
      price: 154,
      weight: 2,
    },
  },
  "perpetual loom": {
    descriptionIcons: [IconCaravan, IconMonsterLurking],
    Icon: IconPerpetualLoom,
    item: {
      description:
        "While equipped, automatically # collects all loot and passes to the next # stage once it is cleared of monsters.",
      name: "perpetual loom",
      price: 5000,
      weight: 20,
    },
  },
  "thaumaturgic goggles": {
    descriptionIcons: [IconDamagePerSecond],
    Icon: IconThaumaturgicGoggles,
    item: {
      description: "Discerns the # lethality of creatures.",
      name: "thaumaturgic goggles",
      price: 250,
      weight: 4,
    },
  },
  "torn manuscript": {
    descriptionIcons: [IconAlchemist],
    Icon: IconTornManuscript,
    item: {
      description: "Describes # theurgical methodologies beyond comprehension.",
      name: "torn manuscript",
      price: 5000,
      weight: 3,
    },
  },
};

export const TEARS_MAXIMUM = 21;
