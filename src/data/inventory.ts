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
import { ReactComponent as IconTomeOfPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRA/types";
import type { ConsumableItem, Range, TrinketItem, Weapon } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Showing, Trinket } from "@neverquest/types/unions";

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
    deflectionRange: Range;
    dodgeCostModifier: number;
    Icon: SVGIcon;
    priceModifier: number;
    protectionModifier: number;
    weightModifier: number;
  }
> = {
  hide: {
    deflectionRange: { maximum: 0, minimum: 0 },
    dodgeCostModifier: 0,
    Icon: IconHide,
    priceModifier: 1,
    protectionModifier: 1,
    weightModifier: 1,
  },
  plate: {
    deflectionRange: { maximum: 0.6, minimum: 0.3 },
    dodgeCostModifier: Infinity,
    Icon: IconPlate,
    priceModifier: 2,
    protectionModifier: 2.5,
    weightModifier: 2.5,
  },
  reinforced: {
    deflectionRange: { maximum: 0.29, minimum: 0.1 },
    dodgeCostModifier: 1,
    Icon: IconReinforced,
    priceModifier: 1.5,
    protectionModifier: 1.5,
    weightModifier: 1.75,
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
        weight: 1,
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
        weight: 1,
      },
    },
    salve: {
      Icon: IconSalve,
      item: {
        coinPrice: 25,
        description: "Cures blight.",
        type: "salve",
        weight: 2,
      },
    },
    soulstone: {
      Icon: IconSoulstone,
      item: {
        coinPrice: 100,
        description: "Resurrects the carrier upon death.",
        type: "soulstone",
        weight: 5,
      },
    },
  };

export const KNAPSACK_SIZE = 3;

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
    blockRange: Range;
    Icon: SVGIcon;
    staggerModifier: number;
    staminaCostModifier: number;
    weightModifier: number;
  }
> = {
  medium: {
    blockRange: { maximum: 0.49, minimum: 0.25 },
    Icon: IconShieldMedium,
    staggerModifier: 1.5,
    staminaCostModifier: 2,
    weightModifier: 1.5,
  },
  small: {
    blockRange: { maximum: 0.24, minimum: 0.1 },
    Icon: IconShieldSmall,
    staggerModifier: 1,
    staminaCostModifier: 1,
    weightModifier: 1,
  },
  tower: {
    blockRange: { maximum: 0.75, minimum: 0.5 },
    Icon: IconShieldTower,
    staggerModifier: 2.5,
    staminaCostModifier: 3,
    weightModifier: 2,
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
    Icon: IconTomeOfPower,
    item: {
      coinPrice: 500,
      description: "Grants a bonus to all attributes based on power level.",
      id: nanoid(),
      type: "tome of power",
      weight: 6,
    },
  },
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
    abilityChance: Range;
    abilityName: string;
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
    showingType: Showing;
  }
> = {
  blunt: {
    abilityChance: { maximum: 0.5, minimum: 0.1 },
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    showingType: "stagger",
  },
  piercing: {
    abilityChance: { maximum: 0.5, minimum: 0.2 },
    abilityName: "Bleed",
    IconAbility: IconWeaponBleed,
    IconGearClass: IconPiercing,
    showingType: "bleed",
  },
  slashing: {
    abilityChance: { maximum: 0.6, minimum: 0.15 },
    abilityName: "Parry",
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
    showingType: "parry",
  },
};
