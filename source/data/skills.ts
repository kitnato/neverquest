import { RELICS } from "@neverquest/data/items";
import IconAnatomy from "@neverquest/icons/anatomy.svg?react";
import IconArchery from "@neverquest/icons/archery.svg?react";
import IconArmorHeavy from "@neverquest/icons/armor-heavy.svg?react";
import IconArmorcraft from "@neverquest/icons/armorcraft.svg?react";
import IconAssassination from "@neverquest/icons/assassination.svg?react";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import IconBlighted from "@neverquest/icons/blighted.svg?react";
import IconBlunt from "@neverquest/icons/blunt.svg?react";
import IconCalisthenics from "@neverquest/icons/calisthenics.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react";
import IconDeflectionChance from "@neverquest/icons/deflection-chance.svg?react";
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react";
import IconEscrime from "@neverquest/icons/escrime.svg?react";
import IconEvasion from "@neverquest/icons/evasion.svg?react";
import IconExecution from "@neverquest/icons/execution.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconImpermeability from "@neverquest/icons/impermeability.svg?react";
import IconInfusionLevel from "@neverquest/icons/infusion-level.svg?react";
import IconMeditation from "@neverquest/icons/meditation.svg?react";
import IconMemetics from "@neverquest/icons/memetics.svg?react";
import IconParryChance from "@neverquest/icons/parry-chance.svg?react";
import IconPiercing from "@neverquest/icons/piercing.svg?react";
import IconPoisoned from "@neverquest/icons/poisoned.svg?react";
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
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Description } from "@neverquest/types/ui";
import type { CrewMember, Showing, Skill, WeaponAbility } from "@neverquest/types/unions";

export const SKILL_PRICE_BASE = 60;
export const SKILL_PRICE_FACTOR = 2.05;

export const SKILLS: Record<
  Skill,
  Description & {
    Icon: SVGIcon;
    isInheritable: boolean;
    requiredCrewMember: CrewMember;
    shows?: Showing[];
    trainer: CrewMember;
  }
> = {
  anatomy: {
    description: "Grants the ability to inflict # bleeding with # piercing weapons.",
    descriptionIcons: [IconBleeding, IconPiercing],
    Icon: IconAnatomy,
    isInheritable: false,
    requiredCrewMember: "merchant",
    trainer: "mercenary",
  },
  archery: {
    description: "Grants the use of # ranged weapons.",
    descriptionIcons: [IconRanged],
    Icon: IconArchery,
    isInheritable: false,
    requiredCrewMember: "fletcher",
    trainer: "mercenary",
  },
  armorcraft: {
    description: "Grants the use of # heavy armor alongside the ability to improve # recovery.",
    descriptionIcons: [IconArmorHeavy, IconRecovery],
    Icon: IconArmorcraft,
    isInheritable: false,
    requiredCrewMember: "blacksmith",
    trainer: "mercenary",
  },
  assassination: {
    description:
      "Grants the ability to deal # critical strikes alongside attributes that determine their # chance and # damage.",
    descriptionIcons: [IconCriticalRating, IconCriticalChance, IconCriticalDamage],
    Icon: IconAssassination,
    isInheritable: false,
    requiredCrewMember: "merchant",
    trainer: "mercenary",
  },
  calisthenics: {
    description:
      "Grants attributes that improve regeneration # amount and # rate for both # health and # stamina.",
    descriptionIcons: [IconRegenerationAmount, IconRegenerationRate, IconHealth, IconStamina],
    Icon: IconCalisthenics,
    isInheritable: false,
    requiredCrewMember: "merchant",
    shows: ["health", "stamina"],
    trainer: "mercenary",
  },
  escrime: {
    description:
      "Grants the ability to # parry attacks with # slashing weapons, partially reflecting damage.",
    descriptionIcons: [IconParryChance, IconSlashing],
    Icon: IconEscrime,
    isInheritable: false,
    requiredCrewMember: "merchant",
    trainer: "mercenary",
  },
  evasion: {
    description: "Grants the ability to # dodge attacks, avoiding all damage.",
    descriptionIcons: [IconDodgeChance],
    Icon: IconEvasion,
    isInheritable: false,
    requiredCrewMember: "merchant",
    trainer: "mercenary",
  },
  impermeability: {
    description:
      "Grants the ability to # deflect # poison and # blight ailments, avoiding them entirely.",
    descriptionIcons: [IconDeflectionChance, IconPoisoned, IconBlighted],
    Icon: IconImpermeability,
    isInheritable: true,
    requiredCrewMember: "merchant",
    trainer: "witch",
  },
  meditation: {
    description: "Grants the ability to perform relic # infusion.",
    descriptionIcons: [IconInfusionLevel],
    Icon: IconMeditation,
    isInheritable: true,
    requiredCrewMember: "merchant",
    trainer: "occultist",
  },
  memetics: {
    description: "Grants the ability to decipher and inscribe the # journal.",
    descriptionIcons: [RELICS.journal.Icon],
    Icon: IconMemetics,
    isInheritable: true,
    requiredCrewMember: "merchant",
    trainer: "alchemist",
  },
  shieldcraft: {
    description: "Grants the use of # tower shields and the ability to # stagger monsters.",
    descriptionIcons: [IconShieldTower, IconStaggered],
    Icon: IconShieldcraft,
    isInheritable: false,
    requiredCrewMember: "blacksmith",
    trainer: "mercenary",
  },
  siegecraft: {
    description:
      "Grants the use of # two-handed melee weapons that have a chance to # execute monsters.",
    descriptionIcons: [IconTwoHanded, IconExecution],
    Icon: IconSiegecraft,
    isInheritable: false,
    requiredCrewMember: "blacksmith",
    shows: ["grip"],
    trainer: "mercenary",
  },
  traumatology: {
    description: "Grants the ability to # stun monsters with # blunt weapons.",
    descriptionIcons: [IconStunned, IconBlunt],
    Icon: IconTraumatology,
    isInheritable: false,
    requiredCrewMember: "merchant",
    trainer: "mercenary",
  },
};

export const WEAPON_ABILITY_SKILLS: Record<WeaponAbility, Skill> = {
  bleed: "anatomy",
  parry: "escrime",
  stun: "traumatology",
};
