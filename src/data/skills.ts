import { ReactComponent as IconAnatomy } from "@neverquest/icons/anatomy.svg";
import { ReactComponent as IconArmorcraft } from "@neverquest/icons/armorcraft.svg";
import { ReactComponent as IconAssassination } from "@neverquest/icons/assassination.svg";
import { ReactComponent as IconCalisthenics } from "@neverquest/icons/calisthenics.svg";
import { ReactComponent as IconEscrime } from "@neverquest/icons/escrime.svg";
import { ReactComponent as IconEvasion } from "@neverquest/icons/evasion.svg";
import { ReactComponent as IconShieldcraft } from "@neverquest/icons/shieldcraft.svg";
import { ReactComponent as IconTraumatology } from "@neverquest/icons/traumatology.svg";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute, Mastery, Showing, Skill } from "@neverquest/types/unions";

export const SKILLS: Record<
  Skill,
  {
    coinPrice: number;
    description: string;
    Icon: SVGIcon;
    requiredLevel: number;
    shows?: Showing[];
    unlocksAttributes?: Attribute[];
    unlocksMasteries?: Mastery[];
  }
> = {
  anatomy: {
    coinPrice: 120,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconAnatomy,
    requiredLevel: 40,
    shows: ["bleed"],
    unlocksMasteries: ["cruelty"],
  },
  armorcraft: {
    coinPrice: 135,
    description:
      "Unlocks the use of plate armor & the ability to deflect ailments. Also improves recovery.",
    Icon: IconArmorcraft,
    requiredLevel: 45,
    shows: ["deflection"],
    unlocksMasteries: ["resilience"],
  },
  assassination: {
    coinPrice: 45,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconAssassination,
    requiredLevel: 15,
    shows: ["criticalRating"],
    unlocksAttributes: ["dexterity", "perception"],
  },
  calisthenics: {
    coinPrice: 30,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconCalisthenics,
    requiredLevel: 10,
    shows: ["reserveDetails"],
    unlocksAttributes: ["fortitude", "vigor"],
  },
  escrime: {
    coinPrice: 75,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconEscrime,
    requiredLevel: 25,
    shows: ["parry"],
    unlocksMasteries: ["finesse"],
  },
  evasion: {
    coinPrice: 105,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconEvasion,
    requiredLevel: 35,
    shows: ["dodge"],
    unlocksAttributes: ["agility"],
  },
  shieldcraft: {
    coinPrice: 90,
    description: "Unlocks the use of tower shields & stabilizes blocking.",
    Icon: IconShieldcraft,
    requiredLevel: 30,
    shows: ["stability"],
    unlocksMasteries: ["stability"],
  },
  traumatology: {
    coinPrice: 60,
    description: "Unlocks the ability to stagger monsters.",
    Icon: IconTraumatology,
    requiredLevel: 20,
    shows: ["stagger"],
    unlocksMasteries: ["might"],
  },
};

export const SKILLS_ORDER: Skill[] = Object.entries(SKILLS)
  .sort(([, a], [, b]) => a.requiredLevel - b.requiredLevel)
  .map(([type]) => type as Skill);
