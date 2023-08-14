import { nanoid } from "nanoid";

import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconAntiqueCoin } from "@neverquest/icons/antique-coin.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconHide } from "@neverquest/icons/hide.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconMonkeyPaw } from "@neverquest/icons/monkey-paw.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconSoulstone } from "@neverquest/icons/soulstone.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRA/types";
import type { ConsumableItem, Range, TrinketItem, Weapon } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Elemental, Shard, Showing, Trinket } from "@neverquest/types/unions";
import { TEMPLATE_PATTERN } from "@neverquest/utilities/constants";

export const ARMOR_BASE = {
  coinPrice: 500,
  protection: 300,
  scrapPrice: 3500,
  staminaCost: 30,
  weight: 60,
};

export const ARMOR_NONE = {
  deflection: 0,
  id: nanoid(),
  level: 0,
  name: "Unarmored",
  protection: 0,
  staminaCost: 0,
  weight: 0,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  {
    deflectionRange?: [Range, Range];
    dodgeCostModifier: number;
    Icon: SVGIcon;
    priceModifier: number;
    protectionModifier: number;
    weightModifier: number;
  }
> = {
  hide: {
    dodgeCostModifier: 0,
    Icon: IconHide,
    priceModifier: 0.2,
    protectionModifier: 0.25,
    weightModifier: 0.2,
  },
  plate: {
    deflectionRange: [
      { maximum: 0.4, minimum: 0.33 },
      { maximum: 0.65, minimum: 0.55 },
    ],
    dodgeCostModifier: Infinity,
    Icon: IconPlate,
    priceModifier: 1,
    protectionModifier: 1,
    weightModifier: 1,
  },
  reinforced: {
    deflectionRange: [
      { maximum: 0.2, minimum: 0.13 },
      { maximum: 0.32, minimum: 0.25 },
    ],
    dodgeCostModifier: 1,
    Icon: IconReinforced,
    priceModifier: 0.5,
    protectionModifier: 0.5,
    weightModifier: 0.5,
  },
};

export const CONSUMABLES: Record<Consumable, { Icon: SVGIcon; item: Omit<ConsumableItem, "id"> }> =
  {
    antidote: {
      Icon: IconAntidote,
      item: {
        coinPrice: 15,
        description: "Cures poison.",
        stack: Infinity,
        type: "antidote",
        weight: 1,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        coinPrice: 10,
        description: "Restores all health.",
        stack: Infinity,
        type: "bandages",
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        coinPrice: 8,
        description: "Restores all stamina.",
        stack: Infinity,
        type: "elixir",
        weight: 1,
      },
    },
    salve: {
      Icon: IconSalve,
      item: {
        coinPrice: 25,
        description: "Cures blight.",
        stack: Infinity,
        type: "salve",
        weight: 2,
      },
    },
    soulstone: {
      Icon: IconSoulstone,
      item: {
        coinPrice: 100,
        description: "Resurrects the carrier upon death.",
        stack: Infinity,
        type: "soulstone",
        weight: 5,
      },
    },
  };

export const ENCUMBRANCE = 3;

export const KNAPSACK_SIZE = 2;

export const SHARD_BASE = {
  coinPrice: 100,
  descriptionTemplate: `Adds ${TEMPLATE_PATTERN} damage to a weapon.`,
  weight: 1,
};

export const SHARDS: Record<Shard, Elemental> = {
  frozen: "ice",
  incendiary: "fire",
  lightning: "electric",
  toxic: "poison",
};

export const SHIELD_BASE = {
  coinPrice: 400,
  scrapPrice: 3000,
  stagger: { attenuation: 0.8, minimum: 0.1 },
  staminaCost: 30,
  weight: 50,
};

export const SHIELD_NONE = {
  block: 0,
  id: nanoid(),
  level: 0,
  name: "Unshielded",
  stagger: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldClass,
  {
    blockRange: [Range, Range];
    Icon: SVGIcon;
    staggerModifier: number;
    staminaCostModifier: number;
    weightModifier: number;
  }
> = {
  medium: {
    blockRange: [
      { maximum: 0.3, minimum: 0.2 },
      { maximum: 0.4, minimum: 0.3 },
    ],
    Icon: IconShieldMedium,
    staggerModifier: 0.4,
    staminaCostModifier: 0.6,
    weightModifier: 0.6,
  },
  small: {
    blockRange: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.2, minimum: 0.15 },
    ],
    Icon: IconShieldSmall,
    staggerModifier: 0.2,
    staminaCostModifier: 0.25,
    weightModifier: 0.25,
  },
  tower: {
    blockRange: [
      { maximum: 0.5, minimum: 0.4 },
      { maximum: 0.6, minimum: 0.5 },
    ],
    Icon: IconShieldTower,
    staggerModifier: 1,
    staminaCostModifier: 1,
    weightModifier: 1,
  },
};

export const TRINKETS: Record<Trinket, { Icon: SVGIcon; item: TrinketItem }> = {
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      coinPrice: 150,
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
      weight: 1,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Travel back to the caravan even if there are still lurking monsters.",
      id: nanoid(),
      type: "hearthstone",
      weight: 1,
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
      coinPrice: 200,
      description: "Looting a corpse is instantaneous.",
      id: nanoid(),
      type: "monkey paw",
      weight: 2,
    },
  },
  "tome of power": {
    Icon: IconPower,
    item: {
      coinPrice: 500,
      description: "Grants a bonus to all attributes based on power level.",
      id: nanoid(),
      type: "tome of power",
      weight: 6,
    },
  },
};

export const WEAPON_BASE = {
  coinPrice: 300,
  damage: {
    maximum: 1200,
    minimum: 1100,
  },
  rate: {
    maximum: 3500,
    minimum: 3300,
  },
  scrapPrice: 2500,
  staminaCost: 45,
  weight: 40,
};

export const WEAPON_NONE: Omit<Weapon, "coinPrice" | "isEquipped" | "ranges" | "scrapPrice"> = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  grip: "one-handed",
  id: nanoid(),
  level: 0,
  modality: "melee",
  name: "Unarmed",
  rate: 2500,
  staminaCost: 0,
  weight: 0,
};

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  {
    abilityChance: [Range, Range];
    abilityName: string;
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
    showingType: Showing;
  }
> = {
  blunt: {
    abilityChance: [
      { maximum: 0.2, minimum: 0.13 },
      { maximum: 0.5, minimum: 0.43 },
    ],
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    showingType: "stagger",
  },
  piercing: {
    abilityChance: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.6, minimum: 0.53 },
    ],
    abilityName: "Bleed",
    IconAbility: IconWeaponBleed,
    IconGearClass: IconPiercing,
    showingType: "bleed",
  },
  slashing: {
    abilityChance: [
      { maximum: 0.2, minimum: 0.12 },
      { maximum: 0.6, minimum: 0.53 },
    ],
    abilityName: "Parry",
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
    showingType: "parry",
  },
};
