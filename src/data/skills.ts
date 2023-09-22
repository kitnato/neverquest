import { ReactComponent as IconAnatomy } from "@neverquest/icons/anatomy.svg";
import { ReactComponent as IconArchery } from "@neverquest/icons/archery.svg";
import { ReactComponent as IconArmorcraft } from "@neverquest/icons/armorcraft.svg";
import { ReactComponent as IconAssassination } from "@neverquest/icons/assassination.svg";
import { ReactComponent as IconCalisthenics } from "@neverquest/icons/calisthenics.svg";
import { ReactComponent as IconEscrime } from "@neverquest/icons/escrime.svg";
import { ReactComponent as IconEvasion } from "@neverquest/icons/evasion.svg";
import { ReactComponent as IconShieldcraft } from "@neverquest/icons/shieldcraft.svg";
import { ReactComponent as IconSiegecraft } from "@neverquest/icons/siegecraft.svg";
import { ReactComponent as IconTraumatology } from "@neverquest/icons/traumatology.svg";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Attribute,
  Crew,
  Mastery,
  Showing,
  Skill,
  WeaponAbility,
} from "@neverquest/types/unions";

export const SKILL_PRICE_BASE = 100;
export const SKILL_PRICE_FACTOR = 2;

export const SKILLS: Record<
  Skill,
  {
    description: string;
    Icon: SVGIcon;
    requiredCrew: Crew;
    shows?: Showing;
    unlocksAttributes?: Attribute[];
    unlocksMastery?: Mastery;
  }
> = {
  anatomy: {
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconAnatomy,
    requiredCrew: "merchant",
    unlocksMastery: "cruelty",
  },
  archery: {
    description: "Unlocks the use of ranged weapons.",
    Icon: IconArchery,
    requiredCrew: "fletcher",
    unlocksMastery: "marksmanship",
  },
  armorcraft: {
    description: "Unlocks the use of plate armor & the ability to deflect ailments.",
    Icon: IconArmorcraft,
    requiredCrew: "blacksmith",
    unlocksMastery: "resilience",
  },
  assassination: {
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconAssassination,
    requiredCrew: "merchant",
    shows: "criticalRating",
    unlocksAttributes: ["dexterity", "perception"],
  },
  calisthenics: {
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconCalisthenics,
    requiredCrew: "merchant",
    unlocksAttributes: ["fortitude", "vigor"],
  },
  escrime: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconEscrime,
    requiredCrew: "merchant",
    unlocksMastery: "finesse",
  },
  evasion: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconEvasion,
    requiredCrew: "merchant",
    shows: "dodge",
    unlocksAttributes: ["agility"],
  },
  shieldcraft: {
    description: "Unlocks the use of tower shields.",
    Icon: IconShieldcraft,
    requiredCrew: "blacksmith",
    unlocksMastery: "stability",
  },
  siegecraft: {
    description: "Unlocks the use of two-handed melee weapons that have a chance to execute.",
    Icon: IconSiegecraft,
    requiredCrew: "blacksmith",
    unlocksMastery: "butchery",
  },
  traumatology: {
    description: "Unlocks the ability to stagger monsters.",
    Icon: IconTraumatology,
    requiredCrew: "merchant",
    unlocksMastery: "might",
  },
};

export const WEAPON_ABILITY_SKILLS: Record<WeaponAbility, Skill> = {
  bleed: "anatomy",
  parry: "escrime",
  stagger: "traumatology",
};
