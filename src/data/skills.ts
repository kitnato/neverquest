import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import { Skill } from "@neverquest/types/enums";
import type { SVGIcon } from "@neverquest/types/props";

// TODO - diversify icons.
export const SKILLS: Record<
  Skill,
  {
    coinPrice: number;
    description: string;
    Icon: SVGIcon;
    name: string;
    requiredLevel: number;
  }
> = {
  [Skill.Armorcraft]: {
    coinPrice: 65,
    description: "Unlocks the use of plate armor & deflection.",
    Icon: IconPlaceholder,
    name: "Armorcraft",
    requiredLevel: 45,
  },
  [Skill.Anatomy]: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconPlaceholder,
    name: "Anatomy",
    requiredLevel: 40,
  },
  [Skill.Assassination]: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconPlaceholder,
    name: "Assassination",
    requiredLevel: 15,
  },
  [Skill.Evasion]: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconPlaceholder,
    name: "Evasion",
    requiredLevel: 35,
  },
  [Skill.Escrime]: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconPlaceholder,
    name: "Escrime",
    requiredLevel: 25,
  },
  [Skill.Calisthenics]: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconPlaceholder,
    name: "Calisthenics",
    requiredLevel: 10,
  },
  [Skill.Shieldcraft]: {
    coinPrice: 55,
    description: "Unlocks the use of tower shields.",
    Icon: IconPlaceholder,
    name: "Shieldcraft",
    requiredLevel: 30,
  },
  [Skill.Traumatology]: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon: IconPlaceholder,
    name: "Traumatology",
    requiredLevel: 20,
  },
};

export const SKILLS_ORDER = [
  Skill.Calisthenics,
  Skill.Assassination,
  Skill.Traumatology,
  Skill.Escrime,
  Skill.Shieldcraft,
  Skill.Evasion,
  Skill.Anatomy,
  Skill.Armorcraft,
];
