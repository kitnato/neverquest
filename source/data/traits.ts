import IconBrawler from "@neverquest/icons/brawler.svg?react";
import IconBruiser from "@neverquest/icons/bruiser.svg?react";
import IconColossus from "@neverquest/icons/colossus.svg?react";
import IconExecutioner from "@neverquest/icons/executioner.svg?react";
import IconInoculated from "@neverquest/icons/inoculated.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconSharpshooter from "@neverquest/icons/sharpshooter.svg?react";
import IconShredder from "@neverquest/icons/shredder.svg?react";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconTank from "@neverquest/icons/tank.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Skill, Trait } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const BRAWLER_DAMAGE_BONUS = 0.5;

export const BRUISER_STUN_CHANCE = {
  increment: 0.05,
  maximum: 0.9,
};

export const INOCULATED_DEFLECTION_BASE = 0.5;

export const NUDIST_DODGE_BONUS = 2;

export const TRAITS: Record<
  Trait,
  {
    description: string;
    Icon: SVGIcon;
    requiredSkill?: Skill;
  }
> = {
  brawler: {
    description: `Being unshielded increases one-handed melee damage by ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: BRAWLER_DAMAGE_BONUS,
    })}.`,
    Icon: IconBrawler,
  },
  bruiser: {
    description: `Unarmed damage is determined by current stamina. Stun chance is ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: BRUISER_STUN_CHANCE.increment,
    })} per strength attribute rank.`,
    Icon: IconBruiser,
  },
  colossus: {
    description: "Two-handed melee weapons are wielded in one hand.",
    Icon: IconColossus,
  },
  executioner: {
    description: "Critical strikes with a two-handed weapon always execute the monster.",
    Icon: IconExecutioner,
  },
  inoculated: {
    description: `Base deflection chance is ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: INOCULATED_DEFLECTION_BASE,
    })}.`,
    Icon: IconInoculated,
    requiredSkill: "impermeability",
  },
  nudist: {
    description: "Dodge rate is doubled while not wearing any armor.",
    Icon: IconNudist,
  },
  sharpshooter: {
    description: "While at a distance, all attacks with a ranged weapon are critical hits.",
    Icon: IconSharpshooter,
  },
  shredder: {
    description: "Bleed damage is inflicted all at once.",
    Icon: IconShredder,
  },
  stalwart: {
    description: "There are no stamina penalties when wearing armor.",
    Icon: IconStalwart,
  },
  tank: {
    description: "Protection is increased by the equipped shield's block chance.",
    Icon: IconTank,
  },
};
