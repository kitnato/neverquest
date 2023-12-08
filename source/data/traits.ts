import IconBrawler from "@neverquest/icons/brawler.svg?react";
import IconBruiser from "@neverquest/icons/bruiser.svg?react";
import IconColossus from "@neverquest/icons/colossus.svg?react";
import IconExecutioner from "@neverquest/icons/executioner.svg?react";
import IconInoculated from "@neverquest/icons/inoculated.svg?react";
import IconNinja from "@neverquest/icons/ninja.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconSharpshooter from "@neverquest/icons/sharpshooter.svg?react";
import IconShredder from "@neverquest/icons/shredder.svg?react";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconTank from "@neverquest/icons/tank.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Trait } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const BRUISER_STUN_CHANCE = 0.25;

export const TANK_PROTECTION_BONUS = 0.5;

export const TRAITS: Record<
  Trait,
  {
    description: string;
    Icon: SVGIcon;
  }
> = {
  brawler: {
    description: "Being unshielded doubles one-handed damage.",
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
    description: "A two-handed weapon can be equipped alongside a shield.",
    Icon: IconColossus,
  },
  executioner: {
    description: "Critical strikes with a two-handed weapon always execute the monster.",
    Icon: IconExecutioner,
  },
  inoculated: {
    description: "Deflection chance is doubled.",
    Icon: IconInoculated,
  },
  ninja: {
    description: "Monsters are looted immediately.",
    Icon: IconNinja,
  },
  nudist: {
    description: "Dodge rate is doubled when not wearing any armor.",
    Icon: IconNudist,
  },
  sharpshooter: {
    description: "While distant, all attacks with a ranged weapon are critical hits.",
    Icon: IconSharpshooter,
  },
  shredder: {
    description: "Bleed damage is inflicted all at once.",
    Icon: IconShredder,
  },
  stalwart: {
    description: "There are no penalties when wearing armor.",
    Icon: IconStalwart,
  },
  tank: {
    description: "Having a shield equipped increases total protection based on its class.",
    Icon: IconTank,
  },
};
