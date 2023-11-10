import { nanoid } from "nanoid";

import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAntidote from "@neverquest/icons/antidote.svg?react";
import IconAntiqueCoin from "@neverquest/icons/antique-coin.svg?react";
import IconArmorHeavy from "@neverquest/icons/armor-heavy.svg?react";
import IconArmorLight from "@neverquest/icons/armor-light.svg?react";
import IconReinforced from "@neverquest/icons/armor-reinforced.svg?react";
import IconBandages from "@neverquest/icons/bandages.svg?react";
import IconBleed from "@neverquest/icons/bleed.svg?react";
import IconBlunt from "@neverquest/icons/blunt.svg?react";
import IconCompass from "@neverquest/icons/compass.svg?react";
import IconElixir from "@neverquest/icons/elixir.svg?react";
import IconFire from "@neverquest/icons/fire.svg?react";
import IconStone from "@neverquest/icons/hearthstone.svg?react";
import IconIce from "@neverquest/icons/ice.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import IconKnapsack from "@neverquest/icons/knapsack.svg?react";
import IconLightning from "@neverquest/icons/lightning.svg?react";
import IconMonkeyPaw from "@neverquest/icons/monkey-paw.svg?react";
import IconParry from "@neverquest/icons/parry.svg?react";
import IconPhylactery from "@neverquest/icons/phylactery.svg?react";
import IconPiercing from "@neverquest/icons/piercing.svg?react";
import IconSalve from "@neverquest/icons/salve.svg?react";
import IconShieldMedium from "@neverquest/icons/shield-medium.svg?react";
import IconShieldSmall from "@neverquest/icons/shield-small.svg?react";
import IconShieldTower from "@neverquest/icons/shield-tower.svg?react";
import IconSlashing from "@neverquest/icons/slashing.svg?react";
import IconStun from "@neverquest/icons/stun.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type {
  AmmunitionPouchItem,
  Armor,
  ConsumableItem,
  GearBase,
  GeneratorRange,
  InfusableItem,
  KnapsackItem,
  Melee,
  Shield,
  TrinketItem,
} from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import {
  type Consumable,
  type Elemental,
  type Gem,
  INFUSABLE_TYPES,
  type Infusable,
  type MonsterAilmentElemental,
  type Trinket,
  type WeaponAbility,
} from "@neverquest/types/unions";

export const AMMUNITION_CAPACITY = 100;

export const ARMOR_NONE: Omit<Armor, "isEquipped" | "price"> = {
  deflection: 0,
  gearClass: "light",
  gems: [],
  ID: nanoid(),
  level: 1,
  name: "Unarmored",
  protection: 0,
  staminaCost: 0,
  weight: 0,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  Omit<GearBase, "staminaCost"> & {
    deflection: [GeneratorRange, GeneratorRange] | null;
    Icon: SVGIcon;
    protection: [GeneratorRange, GeneratorRange];
    staminaCost: number | [GeneratorRange, GeneratorRange];
  }
> = {
  heavy: {
    deflection: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconArmorHeavy,
    price: { maximum: 10000, minimum: 8 },
    protection: [
      { maximum: 10, minimum: 8 },
      { maximum: 1500, minimum: 1450 },
    ],
    staminaCost: Infinity,
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 100, minimum: 90 },
    ],
  },
  light: {
    deflection: null,
    Icon: IconArmorLight,
    price: { maximum: 5000, minimum: 1 },
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 800, minimum: 700 },
    ],
    staminaCost: 0,
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  reinforced: {
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconReinforced,
    price: { maximum: 7500, minimum: 3 },
    protection: [
      { maximum: 6, minimum: 4 },
      { maximum: 1000, minimum: 950 },
    ],
    staminaCost: [
      { maximum: 3, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 80, minimum: 70 },
    ],
  },
};

export const CONSUMABLES: Record<Consumable, { Icon: SVGIcon; item: Omit<ConsumableItem, "ID"> }> =
  {
    antidote: {
      Icon: IconAntidote,
      item: {
        description: "Cures poison.",
        name: "antidote",
        price: 150,
        weight: 5,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        description: "Restores all health.",
        name: "bandages",
        price: 50,
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        description: "Restores all stamina.",
        name: "elixir",
        price: 80,
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
        price: 25,
        weight: 3,
      },
    },
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
  price: 10,
  weight: 1,
};
export const GEM_DAMAGE = [0.1, 0.2, 0.4, 0.7, 1];
export const GEM_DURATION = [500, 800, 1300, 2000, 3000];
export const GEM_ELEMENTALS: Record<Gem, Elemental> = {
  ruby: "fire",
  sapphire: "ice",
  topaz: "lightning",
};
export const GEM_ENHANCEMENT = [0.1, 0.25, 0.45, 0.7, 1];
export const GEM_FITTING_COST = [20, 40, 100, 200, 500];
export const GEMS_MAXIMUM = 5;

export const INFUSION_LEVEL_MAXIMUM = 100;
export const INFUSABLES: Record<
  Infusable,
  {
    Icon: SVGIcon;
    item: InfusableItem & {
      growthBase: number;
      maximum: number;
      minimum: number;
    };
  }
> = {
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      description: "Boosts amount of essence looted.",
      growthBase: 8,
      ID: nanoid(),
      level: 1,
      maximum: 2,
      minimum: 0.2,
      name: "monkey paw",
      price: 500,
      weight: 4,
    },
  },
  "tome of power": {
    Icon: IconTomeOfPower,
    item: {
      description: "Boosts all attribute effects based on power level.",
      growthBase: 10,
      ID: nanoid(),
      level: 1,
      maximum: 1.5,
      minimum: 0,
      name: "tome of power",
      price: 5000,
      weight: 10,
    },
  },
};

export const SHIELD_NONE: Omit<Shield, "isEquipped" | "price"> = {
  block: 0,
  gearClass: "small",
  gems: [],
  ID: nanoid(),
  level: 1,
  name: "Unshielded",
  stagger: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldClass,
  GearBase & {
    block: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    stagger: [GeneratorRange, GeneratorRange] | null;
  }
> = {
  medium: {
    block: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.45, minimum: 0.43 },
    ],
    Icon: IconShieldMedium,
    price: { maximum: 4500, minimum: 4 },
    stagger: [
      { maximum: 0.22, minimum: 0.2 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    staminaCost: [
      { maximum: 4, minimum: 2 },
      { maximum: 30, minimum: 25 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
  },
  small: {
    block: [
      { maximum: 0.2, minimum: 0.15 },
      { maximum: 0.35, minimum: 0.33 },
    ],
    Icon: IconShieldSmall,
    price: { maximum: 2500, minimum: 2 },
    stagger: null,
    staminaCost: [
      { maximum: 2, minimum: 1 },
      { maximum: 20, minimum: 15 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 35, minimum: 30 },
    ],
  },
  tower: {
    block: [
      { maximum: 0.45, minimum: 0.4 },
      { maximum: 0.7, minimum: 0.65 },
    ],
    Icon: IconShieldTower,
    price: { maximum: 6000, minimum: 7 },
    stagger: [
      { maximum: 0.32, minimum: 0.3 },
      { maximum: 0.55, minimum: 0.5 },
    ],
    staminaCost: [
      { maximum: 10, minimum: 7 },
      { maximum: 40, minimum: 35 },
    ],
    weight: [
      { maximum: 8, minimum: 5 },
      { maximum: 60, minimum: 55 },
    ],
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
  hearthstone: {
    Icon: IconStone,
    item: {
      description: "Travel back to the caravan even if there are still lurking monsters.",
      ID: nanoid(),
      name: "hearthstone",
      price: 20,
      weight: 2,
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
};

export const WEAPON_BASE: GearBase & {
  ammunitionCost: [GeneratorRange, GeneratorRange];
  damage: [GeneratorRange, GeneratorRange];
  range: [GeneratorRange, GeneratorRange];
  rate: [GeneratorRange, GeneratorRange];
} = {
  ammunitionCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 50, minimum: 45 },
  ],
  damage: [
    { maximum: 12, minimum: 11 },
    { maximum: 1000, minimum: 950 },
  ],
  price: { maximum: 9000, minimum: 1 },
  range: [
    { maximum: 4000, minimum: 3500 },
    { maximum: 7000, minimum: 6800 },
  ],
  rate: [
    { maximum: 3700, minimum: 3600 },
    { maximum: 2000, minimum: 1900 },
  ],
  staminaCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 70, minimum: 65 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 80, minimum: 75 },
  ],
};

export const WEAPON_MODIFIER = {
  "one-handed": { ability: 1, damage: 1, price: 1, rate: 1, stamina: 1, weight: 1 },
  ranged: { ability: 1, damage: 1.2, price: 1.1, rate: 1, stamina: 1.1, weight: 1.15 },
  "two-handed": { ability: 1.1, damage: 1.25, price: 1.2, rate: 1.3, stamina: 1.15, weight: 1.2 },
};

export const WEAPON_NONE: Omit<Melee, "isEquipped" | "price"> = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  gems: [],
  grip: "one-handed",
  ID: nanoid(),
  level: 1,
  name: "Unarmed",
  rate: 2500,
  staminaCost: 0,
  weight: 0,
};

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  {
    ability: WeaponAbility;
    abilityChance: [GeneratorRange, GeneratorRange];
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
  }
> = {
  blunt: {
    ability: "stun",
    abilityChance: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.7, minimum: 0.68 },
    ],
    IconAbility: IconStun,
    IconGearClass: IconBlunt,
  },
  piercing: {
    ability: "bleed",
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.6, minimum: 0.58 },
    ],
    IconAbility: IconBleed,
    IconGearClass: IconPiercing,
  },
  slashing: {
    ability: "parry",
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.5, minimum: 0.47 },
    ],
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
  },
};
