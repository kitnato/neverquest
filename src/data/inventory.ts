import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconHide } from "@neverquest/icons/hide.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRA/types";
import type { Consumable, ConsumableName, Range, Trinket, TrinketName } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type { Showing } from "@neverquest/types/unions";

export const ARMOR_NONE = {
  deflection: 0,
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
    weightModifier: 3,
  },
  reinforced: {
    deflectionRange: { maximum: 0.29, minimum: 0.1 },
    dodgeCostModifier: 1,
    Icon: IconReinforced,
    priceModifier: 1.5,
    protectionModifier: 1.5,
    weightModifier: 2,
  },
};

export const CONSUMABLES: Record<ConsumableName, { Icon: SVGIcon; item: Consumable }> = {
  Bandages: {
    Icon: IconBandages,
    item: {
      coinPrice: 10,
      description: "Restores all health when used.",
      name: "Bandages",
      weight: 1,
    },
  },
  Elixir: {
    Icon: IconElixir,
    item: {
      coinPrice: 40,
      description: "Restores all stamina.",
      name: "Elixir",
      weight: 1,
    },
  },
  Salve: {
    Icon: IconSalve,
    item: {
      coinPrice: 10,
      description: "Cures poison and blight.",
      name: "Salve",
      weight: 1,
    },
  },
};

export const KNAPSACK_SIZE = 3;

export const SHIELD_NONE = {
  block: 0,
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

export const TRINKETS: Record<TrinketName, { Icon: SVGIcon; item: Trinket }> = {
  Compass: {
    Icon: IconCompass,
    item: {
      coinPrice: 20,
      description: "Navigate the wilderness to hunt in previous locations.",
      name: "Compass",
      weight: 1,
    },
  },
  Hearthstone: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Travel back to the caravan even if there are still lurking monsters.",
      name: "Hearthstone",
      weight: 1,
    },
  },
  Knapsack: {
    Icon: IconKnapsack,
    item: {
      coinPrice: 10,
      description: "Carry more items and manage gear.",
      name: "Knapsack",
      weight: 0,
    },
  },
};

export const WEAPON_NONE = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  grip: "oneHanded",
  level: 0,
  modality: "melee",
  name: "Unarmed",
  rate: 2500,
  staminaCost: 0,
  weight: 0,
} as const;

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
    abilityChance: { maximum: 0.7, minimum: 0.1 },
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    showingType: "stagger",
  },
  piercing: {
    abilityChance: { maximum: 0.7, minimum: 0.2 },
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
