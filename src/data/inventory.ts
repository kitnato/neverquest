import { nanoid } from "nanoid";

import { ReactComponent as IconAmmunitionPouch } from "@neverquest/icons/ammunition-pouch.svg";
import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconAntiqueCoin } from "@neverquest/icons/antique-coin.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconBleed } from "@neverquest/icons/bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/blunt.svg";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconFire } from "@neverquest/icons/fire.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconHide } from "@neverquest/icons/hide.svg";
import { ReactComponent as IconIce } from "@neverquest/icons/ice.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconLightning } from "@neverquest/icons/lightning.svg";
import { ReactComponent as IconMonkeyPaw } from "@neverquest/icons/monkey-paw.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { ReactComponent as IconPhylactery } from "@neverquest/icons/phylactery.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/piercing.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/slashing.svg";
import { ReactComponent as IconStun } from "@neverquest/icons/stun.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type {
  Armor,
  ConsumableItem,
  GearBase,
  GeneratorRange,
  Melee,
  Shield,
  TrinketItem,
} from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Consumable,
  Elemental,
  Gem,
  MonsterAilment,
  Trinket,
  WeaponAbility,
} from "@neverquest/types/unions";

export const AMMUNITION_MAXIMUM = 100;

export const ARMOR_NONE: Omit<Armor, "isEquipped" | "price"> = {
  deflection: 0,
  gearClass: "hide",
  gems: [],
  id: nanoid(),
  level: 0,
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
  hide: {
    deflection: null,
    Icon: IconHide,
    price: { maximum: 800, minimum: 1 },
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 500, minimum: 450 },
    ],
    staminaCost: 0,
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  plate: {
    deflection: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconPlate,
    price: { maximum: 1600, minimum: 8 },
    protection: [
      { maximum: 10, minimum: 8 },
      { maximum: 1000, minimum: 950 },
    ],
    staminaCost: Infinity,
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 100, minimum: 90 },
    ],
  },
  reinforced: {
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconReinforced,
    price: { maximum: 1200, minimum: 3 },
    protection: [
      { maximum: 6, minimum: 4 },
      { maximum: 800, minimum: 750 },
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

export const CONSUMABLES: Record<Consumable, { Icon: SVGIcon; item: Omit<ConsumableItem, "id"> }> =
  {
    antidote: {
      Icon: IconAntidote,
      item: {
        description: "Cures poison.",
        name: "antidote",
        price: 15,
        weight: 5,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        description: "Restores all health.",
        name: "bandages",
        price: 10,
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        description: "Restores all stamina.",
        name: "elixir",
        price: 8,
        weight: 2,
      },
    },
    phylactery: {
      Icon: IconPhylactery,
      item: {
        description: "Resurrects the carrier upon death.",
        name: "phylactery",
        price: 100,
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
  { ailment: MonsterAilment; color: string; Icon: SVGIcon }
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

export const ENCUMBRANCE = 6;
export const KNAPSACK_SIZE = 6;

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
export const GEM_FITTING_COST = [20, 40, 70, 120, 200];
export const GEMS_MAXIMUM = 5;

export const MONKEY_PAW_BONUS = {
  maximum: 1,
  minimum: 0.2,
};
export const MONKEY_PAW_GROWTH = 14;

export const SHIELD_NONE: Omit<Shield, "isEquipped" | "price"> = {
  block: 0,
  gearClass: "small",
  gems: [],
  id: nanoid(),
  level: 0,
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
      { maximum: 0.28, minimum: 0.25 },
      { maximum: 0.4, minimum: 0.35 },
    ],
    Icon: IconShieldMedium,
    price: { maximum: 900, minimum: 4 },
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
      { maximum: 0.2, minimum: 0.18 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconShieldSmall,
    price: { maximum: 600, minimum: 2 },
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
      { maximum: 0.52, minimum: 0.5 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconShieldTower,
    price: { maximum: 1200, minimum: 7 },
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

export const TRINKETS: Record<Trinket, { Icon: SVGIcon; item: TrinketItem }> = {
  "ammunition pouch": {
    Icon: IconAmmunitionPouch,
    item: {
      current: 0,
      description: "Store ammunition for ranged weapons.",
      id: nanoid(),
      maximum: AMMUNITION_MAXIMUM,
      name: "ammunition pouch",
      price: 250,
      weight: 6,
    },
  },
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      description: "The wielder is bestowed with extreme fortune.",
      id: nanoid(),
      name: "antique coin",
      price: 1000,
      weight: 2,
    },
  },
  compass: {
    Icon: IconCompass,
    item: {
      description: "Navigate the wilderness to hunt in previous locations.",
      id: nanoid(),
      name: "compass",
      price: 50,
      weight: 2,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      description: "Travel back to the caravan even if there are still lurking monsters.",
      id: nanoid(),
      name: "hearthstone",
      price: 20,
      weight: 2,
    },
  },
  knapsack: {
    Icon: IconKnapsack,
    item: {
      description: "Carry more items and manage gear.",
      id: nanoid(),
      name: "knapsack",
      price: 10,
      weight: 0,
    },
  },
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      description: "Boosts amount of essence looted. Can be infused to increase its potency.",
      id: nanoid(),
      level: 1,
      name: "monkey paw",
      price: 500,
      weight: 4,
    },
  },
  "tome of power": {
    Icon: IconPower,
    item: {
      description: "Boosts all attributes based on power level.",
      id: nanoid(),
      name: "tome of power",
      price: 5000,
      weight: 10,
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
    { maximum: 14, minimum: 12 },
    { maximum: 1000, minimum: 950 },
  ],
  price: { maximum: 1000, minimum: 1 },
  range: [
    { maximum: 4500, minimum: 3000 },
    { maximum: 8000, minimum: 7500 },
  ],
  rate: [
    { maximum: 3700, minimum: 3500 },
    { maximum: 2200, minimum: 2000 },
  ],
  staminaCost: [
    { maximum: 3, minimum: 1 },
    { maximum: 65, minimum: 60 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 80, minimum: 70 },
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
  id: nanoid(),
  level: 0,
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
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.7, minimum: 0.65 },
    ],
    IconAbility: IconStun,
    IconGearClass: IconBlunt,
  },
  piercing: {
    ability: "bleed",
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    IconAbility: IconBleed,
    IconGearClass: IconPiercing,
  },
  slashing: {
    ability: "parry",
    abilityChance: [
      { maximum: 0.35, minimum: 0.3 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
  },
};
