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
import type { Trait } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const BRAWLER_DAMAGE_BONUS = 0.5;

export const BRUISER_STUN_CHANCE = 0.3;

export const INOCULATED_DEFLECTION_BASE = 0.25;

export const NUDIST_DODGE_BONUS = 2;

export const TRAITS: Record<
  Trait,
  {
    description: string;
    Icon: SVGIcon;
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
    description: `Current stamina adds to unarmed damage & unarmed attacks have a ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: BRUISER_STUN_CHANCE,
    })} chance to stun.`,
    Icon: IconBruiser,
  },
  colossus: {
    description: "Two-handed melee weapons are used as one-handed.",
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
  },
  nudist: {
    description: "Dodge rate is doubled while not wearing any armor.",
    Icon: IconNudist,
  },
  sharpshooter: {
    description: "While at range, all attacks with a ranged weapon are critical hits.",
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
    description: "Total protection is increased by the equipped shield's block chance.",
    Icon: IconTank,
  },
};
