import { nanoid } from "nanoid";

import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconAntiqueCoin } from "@neverquest/icons/antique-coin.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
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
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type {
  Armor,
  ConsumableItem,
  GearBase,
  GeneratorRange,
  Shield,
  TrinketItem,
  Weapon,
} from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Consumable,
  Elemental,
  Gem,
  MonsterAilment,
  Showing,
  Trinket,
} from "@neverquest/types/unions";

export const ARMOR_NONE: Omit<Armor, "coinPrice" | "isEquipped" | "scrapPrice"> = {
  deflection: 0,
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
    staminaCost: 0 | [GeneratorRange, GeneratorRange] | null;
  }
> = {
  hide: {
    coinPrice: { maximum: 400, minimum: 1 },
    deflection: null,
    Icon: IconHide,
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 500, minimum: 450 },
    ],
    scrapPrice: { maximum: 2000, minimum: 5 },
    staminaCost: 0,
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  plate: {
    coinPrice: { maximum: 800, minimum: 8 },
    deflection: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconPlate,
    protection: [
      { maximum: 10, minimum: 8 },
      { maximum: 1000, minimum: 950 },
    ],
    scrapPrice: { maximum: 4000, minimum: 25 },
    staminaCost: null,
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 100, minimum: 90 },
    ],
  },
  reinforced: {
    coinPrice: { maximum: 600, minimum: 3 },
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconReinforced,
    protection: [
      { maximum: 6, minimum: 4 },
      { maximum: 800, minimum: 750 },
    ],
    scrapPrice: { maximum: 3000, minimum: 15 },
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
        coinPrice: 15,
        description: "Cures poison.",
        type: "antidote",
        weight: 5,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        coinPrice: 10,
        description: "Restores all health.",
        type: "bandages",
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        coinPrice: 8,
        description: "Restores all stamina.",
        type: "elixir",
        weight: 2,
      },
    },
    phylactery: {
      Icon: IconPhylactery,
      item: {
        coinPrice: 100,
        description: "Resurrects the carrier upon death.",
        type: "phylactery",
        weight: 10,
      },
    },
    salve: {
      Icon: IconSalve,
      item: {
        coinPrice: 25,
        description: "Cures blight.",
        type: "salve",
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
  coinPrice: 10,
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

export const SHIELD_NONE: Omit<Shield, "coinPrice" | "isEquipped" | "ranges" | "scrapPrice"> = {
  block: 0,
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
    coinPrice: { maximum: 450, minimum: 4 },
    Icon: IconShieldMedium,
    scrapPrice: { maximum: 3000, minimum: 15 },
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
    coinPrice: { maximum: 300, minimum: 2 },
    Icon: IconShieldSmall,
    scrapPrice: { maximum: 2000, minimum: 5 },
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
    coinPrice: { maximum: 600, minimum: 7 },
    Icon: IconShieldTower,
    scrapPrice: { maximum: 4000, minimum: 20 },
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
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      coinPrice: 200,
      description: "Unlocks the Luck attribute.",
      id: nanoid(),
      type: "antique coin",
      weight: 2,
    },
  },
  compass: {
    Icon: IconCompass,
    item: {
      coinPrice: 20,
      description: "Navigate the wilderness to hunt in previous locations.",
      id: nanoid(),
      type: "compass",
      weight: 2,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Travel back to the caravan even if there are still lurking monsters.",
      id: nanoid(),
      type: "hearthstone",
      weight: 2,
    },
  },
  knapsack: {
    Icon: IconKnapsack,
    item: {
      coinPrice: 10,
      description: "Carry more items and manage gear.",
      id: nanoid(),
      type: "knapsack",
      weight: 0,
    },
  },
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      coinPrice: 300,
      description: "Looting a corpse is instantaneous.",
      id: nanoid(),
      type: "monkey paw",
      weight: 3,
    },
  },
  "tome of power": {
    Icon: IconPower,
    item: {
      coinPrice: 500,
      description: "Boosts all attributes based on power level.",
      id: nanoid(),
      type: "tome of power",
      weight: 10,
    },
  },
};

export const WEAPON_BASE: GearBase & {
  damage: [GeneratorRange, GeneratorRange];
  range: [GeneratorRange, GeneratorRange];
  rate: [GeneratorRange, GeneratorRange];
} = {
  coinPrice: { maximum: 600, minimum: 1 },
  damage: [
    { maximum: 14, minimum: 12 },
    { maximum: 1000, minimum: 950 },
  ],
  range: [
    { maximum: 4500, minimum: 3000 },
    { maximum: 8000, minimum: 7500 },
  ],
  rate: [
    { maximum: 3700, minimum: 3500 },
    { maximum: 2200, minimum: 2000 },
  ],
  scrapPrice: { maximum: 3000, minimum: 15 },
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
  "two-handed": { ability: 1.1, damage: 1.25, price: 1.2, rate: 1.33, stamina: 1.15, weight: 1.2 },
};

export const WEAPON_NONE: Omit<Weapon, "coinPrice" | "isEquipped" | "scrapPrice"> = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  gems: [],
  grip: "one-handed",
  id: nanoid(),
  level: 0,
  modality: "melee",
  name: "Unarmed",
  range: 0,
  rate: 2500,
  staminaCost: 0,
  weight: 0,
};

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  {
    abilityChance: [GeneratorRange, GeneratorRange];
    abilityName: string;
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
    showingType: Showing;
  }
> = {
  blunt: {
    abilityChance: [
      { maximum: 0.2, minimum: 0.15 },
      { maximum: 0.4, minimum: 0.35 },
    ],
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    showingType: "stagger",
  },
  piercing: {
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    abilityName: "Bleed",
    IconAbility: IconWeaponBleed,
    IconGearClass: IconPiercing,
    showingType: "bleed",
  },
  slashing: {
    abilityChance: [
      { maximum: 0.35, minimum: 0.3 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    abilityName: "Parry",
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
    showingType: "parry",
  },
};
