import { ReactComponent as IconBrawler } from "@neverquest/icons/brawler.svg";
import { ReactComponent as IconBruiser } from "@neverquest/icons/bruiser.svg";
import { ReactComponent as IconColossus } from "@neverquest/icons/colossus.svg";
import { ReactComponent as IconExecutioner } from "@neverquest/icons/executioner.svg";
import { ReactComponent as IconFieldSurgeon } from "@neverquest/icons/field-surgeon.svg";
import { ReactComponent as IconInoculated } from "@neverquest/icons/inoculated.svg";
import { ReactComponent as IconNinja } from "@neverquest/icons/ninja.svg";
import { ReactComponent as IconNudist } from "@neverquest/icons/nudist.svg";
import { ReactComponent as IconSharpshooter } from "@neverquest/icons/sharpshooter.svg";
import { ReactComponent as IconShredder } from "@neverquest/icons/shredder.svg";
import { ReactComponent as IconStalwart } from "@neverquest/icons/stalwart.svg";
import { ReactComponent as IconTank } from "@neverquest/icons/tank.svg";
import { ReactComponent as IconTormentor } from "@neverquest/icons/tormentor.svg";
import type { SVGIcon } from "@neverquest/types/props";
import type { Trait } from "@neverquest/types/unions";

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
    description:
      "Current stamina adds to unarmed damage & unarmed attacks have a 25% chance to stun.",
    Icon: IconBruiser,
  },
  colossus: {
    description: "Two-handed weapons can be equipped alongside a shield.",
    Icon: IconColossus,
  },
  executioner: {
    description: "Critical strikes with a two-handed weapon always execute the monster.",
    Icon: IconExecutioner,
  },
  "field surgeon": {
    description: "Health is fully restored when not in combat.",
    Icon: IconFieldSurgeon,
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
    description: "There are no penalties for wearing armor.",
    Icon: IconStalwart,
  },
  tank: {
    description: "Equipping a shield doubles total protection.",
    Icon: IconTank,
  },
  tormentor: {
    description: "Monsters can no longer regenerate.",
    Icon: IconTormentor,
  },
};
