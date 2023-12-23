import IconAnatomy from "@neverquest/icons/anatomy.svg?react";
import IconArchery from "@neverquest/icons/archery.svg?react";
import IconArmorHeavy from "@neverquest/icons/armor-heavy.svg?react";
import IconArmorcraft from "@neverquest/icons/armorcraft.svg?react";
import IconAssassination from "@neverquest/icons/assassination.svg?react";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import IconBlunt from "@neverquest/icons/blunt.svg?react";
import IconCalisthenics from "@neverquest/icons/calisthenics.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconEscrime from "@neverquest/icons/escrime.svg?react";
import IconEvasion from "@neverquest/icons/evasion.svg?react";
import IconExecution from "@neverquest/icons/execution.svg?react";
import IconGrip from "@neverquest/icons/grip.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconParry from "@neverquest/icons/parry.svg?react";
import IconPiercing from "@neverquest/icons/piercing.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconRecovery from "@neverquest/icons/recovery.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconShieldTower from "@neverquest/icons/shield-tower.svg?react";
import IconShieldcraft from "@neverquest/icons/shieldcraft.svg?react";
import IconSiegecraft from "@neverquest/icons/siegecraft.svg?react";
import IconSlashing from "@neverquest/icons/slashing.svg?react";
import IconStaggered from "@neverquest/icons/staggered.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconStunned from "@neverquest/icons/stunned.svg?react";
import IconTraumatology from "@neverquest/icons/traumatology.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Crew, Showing, Skill, WeaponAbility } from "@neverquest/types/unions";

export const SKILL_PRICE_BASE = 60;
export const SKILL_PRICE_FACTOR = 1.8;

export const SKILLS: Record<
  Skill,
  {
    description: string;
    descriptionIcons: SVGIcon[];
    Icon: SVGIcon;
    requiredCrew: Crew;
    shows?: Showing[];
  }
> = {
  anatomy: {
    description: "Grants the ability to inflict # bleeding with # piercing weapons.",
    descriptionIcons: [IconBleeding, IconPiercing],
    Icon: IconAnatomy,
    requiredCrew: "merchant",
  },
  archery: {
    description: "Grants the use of # ranged weapons.",
    descriptionIcons: [IconRanged],
    Icon: IconArchery,
    requiredCrew: "fletcher",
  },
  armorcraft: {
    description:
      "Grants the use of # heavy armor alongside the ability to # deflect ailments. Also improves # recovery.",
    descriptionIcons: [IconArmorHeavy, IconDeflection, IconRecovery],
    Icon: IconArmorcraft,
    requiredCrew: "blacksmith",
    shows: ["deflection"],
  },
  assassination: {
    description:
      "Grants the ability to deal # critical strikes alongside attributes that determine their # chance & # damage.",
    descriptionIcons: [IconCriticalRating, IconCriticalChance, IconCriticalDamage],
    Icon: IconAssassination,
    requiredCrew: "merchant",
    shows: ["criticalRating"],
  },
  calisthenics: {
    description:
      "Grants attributes that improve regeneration # amount & # rate for both # health & # stamina.",
    descriptionIcons: [IconRegenerationAmount, IconRegenerationRate, IconHealth, IconStamina],
    Icon: IconCalisthenics,
    requiredCrew: "merchant",
  },
  escrime: {
    description:
      "Grants the ability to # parry attacks with # slashing weapons, partially reflecting damage.",
    descriptionIcons: [IconParry, IconSlashing],
    Icon: IconEscrime,
    requiredCrew: "merchant",
  },
  evasion: {
    description: "Grants the ability to # dodge attacks, negating all damage.",
    descriptionIcons: [IconDodge],
    Icon: IconEvasion,
    requiredCrew: "merchant",
    shows: ["dodgeChance", "dodgePenalty"],
  },
  shieldcraft: {
    description: "Grants the use of # tower shields & the ability to # stagger monsters.",
    descriptionIcons: [IconShieldTower, IconStaggered],
    Icon: IconShieldcraft,
    requiredCrew: "blacksmith",
  },
  siegecraft: {
    description:
      "Grants the use of # two-handed melee weapons that have a chance to # execute monsters.",
    descriptionIcons: [IconGrip, IconExecution],
    Icon: IconSiegecraft,
    requiredCrew: "blacksmith",
    shows: ["grip"],
  },
  traumatology: {
    description: "Grants the ability to # stun monsters with # blunt weapons.",
    descriptionIcons: [IconStunned, IconBlunt],
    Icon: IconTraumatology,
    requiredCrew: "merchant",
  },
};

export const WEAPON_ABILITY_SKILLS: Record<WeaponAbility, Skill> = {
  bleed: "anatomy",
  parry: "escrime",
  stun: "traumatology",
};
