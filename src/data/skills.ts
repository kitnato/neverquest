import { CREW } from "@neverquest/data/caravan";
import { ReactComponent as IconAnatomy } from "@neverquest/icons/anatomy.svg";
import { ReactComponent as IconArmorcraft } from "@neverquest/icons/armorcraft.svg";
import { ReactComponent as IconAssassination } from "@neverquest/icons/assassination.svg";
import { ReactComponent as IconCalisthenics } from "@neverquest/icons/calisthenics.svg";
import { ReactComponent as IconEscrime } from "@neverquest/icons/escrime.svg";
import { ReactComponent as IconEvasion } from "@neverquest/icons/evasion.svg";
import { ReactComponent as IconShieldcraft } from "@neverquest/icons/shieldcraft.svg";
import { ReactComponent as IconSiegecraft } from "@neverquest/icons/siegecraft.svg";
import { ReactComponent as IconTraumatology } from "@neverquest/icons/traumatology.svg";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute, Crew, Mastery, Showing, Skill } from "@neverquest/types/unions";

export const SKILL_PRICE_BASE = 100;
export const SKILL_PRICE_FACTOR = 2;

export const SKILLS: Record<
  Skill,
  {
    description: string;
    Icon: SVGIcon;
    requiredCrew: Crew;
    shows?: Showing[];
    unlocksAttributes?: Attribute[];
    unlocksMasteries?: Mastery[];
  }
> = {
  anatomy: {
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconAnatomy,
    requiredCrew: "merchant",
    shows: ["bleed"],
    unlocksMasteries: ["cruelty"],
  },
  armorcraft: {
    description:
      "Unlocks the use of plate armor & the ability to deflect ailments. Also improves recovery.",
    Icon: IconArmorcraft,
    requiredCrew: "blacksmith",
    shows: ["deflection"],
    unlocksMasteries: ["resilience"],
  },
  assassination: {
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconAssassination,
    requiredCrew: "merchant",
    shows: ["criticalRating"],
    unlocksAttributes: ["dexterity", "perception"],
  },
  calisthenics: {
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconCalisthenics,
    requiredCrew: "merchant",
    shows: ["reserveDetails"],
    unlocksAttributes: ["fortitude", "vigor"],
  },
  escrime: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconEscrime,
    requiredCrew: "merchant",
    shows: ["parry"],
    unlocksMasteries: ["finesse"],
  },
  evasion: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconEvasion,
    requiredCrew: "merchant",
    shows: ["dodge"],
    unlocksAttributes: ["agility"],
  },
  shieldcraft: {
    description: "Unlocks the use of tower shields & stabilizes blocking.",
    Icon: IconShieldcraft,
    requiredCrew: "blacksmith",
    shows: ["stability"],
    unlocksMasteries: ["stability"],
  },
  siegecraft: {
    description: "Unlocks the use of two-handed melee weapons that have a chance to execute.",
    Icon: IconSiegecraft,
    requiredCrew: "blacksmith",
    shows: ["execution"],
    unlocksMasteries: ["butchery"],
  },
  traumatology: {
    description: "Unlocks the ability to stagger monsters.",
    Icon: IconTraumatology,
    requiredCrew: "merchant",
    shows: ["stagger"],
    unlocksMasteries: ["might"],
  },
};

export const SKILLS_ORDER: Skill[] = Object.entries(SKILLS)
  .sort(([a], [b]) => a.localeCompare(b))
  .sort(([, a], [, b]) => CREW[a.requiredCrew].requiredStage - CREW[b.requiredCrew].requiredStage)
  .map(([type]) => type as Skill);
