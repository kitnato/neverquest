import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { SVGIcon } from "@neverquest/types/props";
import type { Attribute, Mastery, Showing, Skill } from "@neverquest/types/unions";

// TODO - diversify icons.
export const SKILLS: Record<
  Skill,
  {
    coinPrice: number;
    description: string;
    Icon: SVGIcon;
    name: string;
    requiredLevel: number;
    shows?: Showing[];
    unlocksAttributes?: Attribute[];
    unlocksMasteries?: Mastery[];
  }
> = {
  anatomy: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconPlaceholder,
    name: "Anatomy",
    requiredLevel: 40,
    shows: ["bleed"],
    unlocksMasteries: ["cruelty"],
  },
  armorcraft: {
    coinPrice: 65,
    description: "Unlocks the use of plate armor, chance to deflect ailments & improves recovery.",
    Icon: IconPlaceholder,
    name: "Armorcraft",
    requiredLevel: 45,
    shows: ["deflection", "support"],
    unlocksMasteries: ["tenacity"],
  },
  assassination: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconPlaceholder,
    name: "Assassination",
    requiredLevel: 15,
    shows: ["criticalRating"],
    unlocksAttributes: ["dexterity", "perception"],
  },
  calisthenics: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconPlaceholder,
    name: "Calisthenics",
    requiredLevel: 10,
    shows: ["reserveDetails"],
    unlocksAttributes: ["fortitude", "vigor"],
  },
  escrime: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconPlaceholder,
    name: "Escrime",
    requiredLevel: 25,
    shows: ["parry"],
    unlocksMasteries: ["finesse"],
  },
  evasion: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconPlaceholder,
    name: "Evasion",
    requiredLevel: 35,
    shows: ["dodge"],
    unlocksAttributes: ["agility"],
  },
  shieldcraft: {
    coinPrice: 55,
    description: "Unlocks the use of tower shields & stabilizes blocking.",
    Icon: IconPlaceholder,
    name: "Shieldcraft",
    requiredLevel: 30,
    shows: ["stability", "support"],
    unlocksMasteries: ["stability"],
  },
  traumatology: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon: IconPlaceholder,
    name: "Traumatology",
    requiredLevel: 20,
    shows: ["stagger"],
    unlocksMasteries: ["might"],
  },
};

export const SKILLS_ORDER: Skill[] = Object.entries(SKILLS)
  .sort(([, a], [, b]) => a.requiredLevel - b.requiredLevel)
  .map(([type]) => type as Skill);
