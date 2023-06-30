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
    requiredLevel: number;
    shows?: Showing[];
    unlocksAttributes?: Attribute[];
    unlocksMasteries?: Mastery[];
  }
> = {
  anatomy: {
    coinPrice: 120,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconPlaceholder,
    requiredLevel: 40,
    shows: ["bleed"],
    unlocksMasteries: ["cruelty"],
  },
  armorcraft: {
    coinPrice: 135,
    description: "Unlocks the use of plate armor, chance to deflect ailments & improves recovery.",
    Icon: IconPlaceholder,
    requiredLevel: 45,
    shows: ["deflection"],
    unlocksMasteries: ["resilience"],
  },
  assassination: {
    coinPrice: 45,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconPlaceholder,
    requiredLevel: 15,
    shows: ["criticalRating"],
    unlocksAttributes: ["dexterity", "perception"],
  },
  calisthenics: {
    coinPrice: 30,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconPlaceholder,
    requiredLevel: 10,
    shows: ["reserveDetails"],
    unlocksAttributes: ["fortitude", "vigor"],
  },
  escrime: {
    coinPrice: 75,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconPlaceholder,
    requiredLevel: 25,
    shows: ["parry"],
    unlocksMasteries: ["finesse"],
  },
  evasion: {
    coinPrice: 105,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconPlaceholder,
    requiredLevel: 35,
    shows: ["dodge"],
    unlocksAttributes: ["agility"],
  },
  shieldcraft: {
    coinPrice: 90,
    description: "Unlocks the use of tower shields & stabilizes blocking.",
    Icon: IconPlaceholder,
    requiredLevel: 30,
    shows: ["stability"],
    unlocksMasteries: ["stability"],
  },
  traumatology: {
    coinPrice: 60,
    description: "Unlocks the ability to stagger monsters.",
    Icon: IconPlaceholder,
    requiredLevel: 20,
    shows: ["stagger"],
    unlocksMasteries: ["might"],
  },
};

export const SKILLS_ORDER: Skill[] = Object.entries(SKILLS)
  .sort(([, a], [, b]) => a.requiredLevel - b.requiredLevel)
  .map(([type]) => type as Skill);
