import { CREW } from "@neverquest/data/caravan";
import IconAnatomy from "@neverquest/icons/anatomy.svg?react";
import IconArchery from "@neverquest/icons/archery.svg?react";
import IconArmorcraft from "@neverquest/icons/armorcraft.svg?react";
import IconAssassination from "@neverquest/icons/assassination.svg?react";
import IconCalisthenics from "@neverquest/icons/calisthenics.svg?react";
import IconEscrime from "@neverquest/icons/escrime.svg?react";
import IconEvasion from "@neverquest/icons/evasion.svg?react";
import IconShieldcraft from "@neverquest/icons/shieldcraft.svg?react";
import IconSiegecraft from "@neverquest/icons/siegecraft.svg?react";
import IconTraumatology from "@neverquest/icons/traumatology.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Crew, Showing, Skill, WeaponAbility } from "@neverquest/types/unions";

export const SKILL_PRICE_BASE = 100;
export const SKILL_PRICE_FACTOR = 2;

export const SKILLS: Record<
  Skill,
  {
    description: string;
    Icon: SVGIcon;
    requiredCrew: Crew;
    shows?: Showing[];
  }
> = {
  anatomy: {
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconAnatomy,
    requiredCrew: "merchant",
  },
  archery: {
    description: "Unlocks the use of ranged weapons.",
    Icon: IconArchery,
    requiredCrew: "fletcher",
  },
  armorcraft: {
    description:
      "Unlocks the use of heavy armor, the ability to deflect ailments and improves recovery.",
    Icon: IconArmorcraft,
    requiredCrew: "blacksmith",
    shows: ["deflection"],
  },
  assassination: {
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconAssassination,
    requiredCrew: "merchant",
    shows: ["criticalRating"],
  },
  calisthenics: {
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconCalisthenics,
    requiredCrew: "merchant",
  },
  escrime: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconEscrime,
    requiredCrew: "merchant",
  },
  evasion: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconEvasion,
    requiredCrew: "merchant",
    shows: ["dodgeChance", "dodgePenalty"],
  },
  shieldcraft: {
    description: "Unlocks the use of tower shields & the ability to stagger monsters.",
    Icon: IconShieldcraft,
    requiredCrew: "blacksmith",
  },
  siegecraft: {
    description: "Unlocks the use of two-handed melee weapons that have a chance to execute.",
    Icon: IconSiegecraft,
    requiredCrew: "blacksmith",
    shows: ["grip"],
  },
  traumatology: {
    description: "Unlocks the ability to stun monsters.",
    Icon: IconTraumatology,
    requiredCrew: "merchant",
  },
};

export const SKILLS_ORDER = Object.entries(SKILLS)
  .toSorted(([current1], [current2]) => current1.localeCompare(current2))
  .toSorted(
    ([, current1], [, current2]) =>
      CREW[current1.requiredCrew].requiredStage - CREW[current2.requiredCrew].requiredStage,
  )
  .map(([current]) => current as Skill);

export const WEAPON_ABILITY_SKILLS: Record<WeaponAbility, Skill> = {
  bleed: "anatomy",
  parry: "escrime",
  stun: "traumatology",
};
