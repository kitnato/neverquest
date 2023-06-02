import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import { Attribute, Mastery, Showing, Skill } from "@neverquest/types/enums";
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
    shows?: Showing[];
    unlocksAttributes?: Attribute[];
    unlocksMasteries?: Mastery[];
  }
> = {
  [Skill.Anatomy]: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconPlaceholder,
    name: "Anatomy",
    requiredLevel: 40,
    shows: [Showing.Bleed],
    unlocksMasteries: [Mastery.Cruelty],
  },
  [Skill.Armorcraft]: {
    coinPrice: 65,
    description: "Unlocks the use of plate armor, chance to deflect ailments & improves recovery.",
    Icon: IconPlaceholder,
    name: "Armorcraft",
    requiredLevel: 45,
    shows: [Showing.Deflection, Showing.Support],
    unlocksMasteries: [Mastery.Tenacity],
  },
  [Skill.Assassination]: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconPlaceholder,
    name: "Assassination",
    requiredLevel: 15,
    shows: [Showing.CriticalRating],
    unlocksAttributes: [Attribute.Dexterity, Attribute.Perception],
  },
  [Skill.Calisthenics]: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconPlaceholder,
    name: "Calisthenics",
    requiredLevel: 10,
    shows: [Showing.ReserveDetails],
    unlocksAttributes: [Attribute.Fortitude, Attribute.Vigor],
  },
  [Skill.Escrime]: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconPlaceholder,
    name: "Escrime",
    requiredLevel: 25,
    shows: [Showing.Parry],
    unlocksMasteries: [Mastery.Finesse],
  },
  [Skill.Evasion]: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconPlaceholder,
    name: "Evasion",
    requiredLevel: 35,
    shows: [Showing.Dodge],
    unlocksAttributes: [Attribute.Agility],
  },
  [Skill.Shieldcraft]: {
    coinPrice: 55,
    description: "Unlocks the use of tower shields & stabilizes blocking.",
    Icon: IconPlaceholder,
    name: "Shieldcraft",
    requiredLevel: 30,
    shows: [Showing.Stability, Showing.Support],
    unlocksMasteries: [Mastery.Stability],
  },
  [Skill.Traumatology]: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon: IconPlaceholder,
    name: "Traumatology",
    requiredLevel: 20,
    shows: [Showing.Stagger],
    unlocksMasteries: [Mastery.Might],
  },
};

export const SKILLS_ORDER: Skill[] = Object.entries(SKILLS)
  .sort(([, a], [, b]) => a.requiredLevel - b.requiredLevel)
  .map(([type]) => Number(type) as Skill);
