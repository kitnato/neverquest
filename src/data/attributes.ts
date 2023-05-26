import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import { Attribute, Skill } from "@neverquest/types/enums";

// TODO - diversify icons.
export const ATTRIBUTES: Record<Attribute, AttributeOrMastery> = {
  [Attribute.Agility]: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconPlaceholder,
    increment: 0.04,
    maximum: 0.8,
    name: "Agility",
    requiredSkill: Skill.Evasion,
  },
  [Attribute.Dexterity]: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconPlaceholder,
    increment: 0.03,
    maximum: 0.6,
    name: "Dexterity",
    requiredSkill: Skill.Assassination,
  },
  [Attribute.Endurance]: {
    base: 10,
    description: "Increases maximum stamina.",
    Icon: IconPlaceholder,
    increment: 4,
    name: "Endurance",
  },
  [Attribute.Fortitude]: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconPlaceholder,
    increment: 1,
    name: "Fortitude",
    requiredSkill: Skill.Calisthenics,
  },
  [Attribute.Luck]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconPlaceholder,
    increment: 0.03,
    name: "Luck",
  },
  [Attribute.Perception]: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPlaceholder,
    increment: 0.15,
    name: "Perception",
    requiredSkill: Skill.Assassination,
  },
  [Attribute.Resilience]: {
    base: RECOVERY_RATE,
    description: "Increases recovery rate.",
    Icon: IconPlaceholder,
    increment: -150,
    maximum: 100,
    name: "Resilience",
  },
  [Attribute.Speed]: {
    base: 0,
    description: "Increases attack rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    maximum: 0.9,
    name: "Speed",
  },
  [Attribute.Strength]: {
    base: 0,
    description: "Increases base attack damage.",
    Icon: IconPlaceholder,
    increment: 3,
    name: "Strength",
  },
  [Attribute.Vigor]: {
    base: 0,
    description: "Increases health & stamina regeneration rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    name: "Vigor",
    requiredSkill: Skill.Calisthenics,
  },
  [Attribute.Vitality]: {
    base: 100,
    description: "Increases maximum health.",
    Icon: IconPlaceholder,
    increment: 10,
    name: "Vitality",
  },
};

export const ATTRIBUTES_INITIAL = [
  Attribute.Speed,
  Attribute.Strength,
  Attribute.Vitality,
  Attribute.Resilience,
] as const;

export const ATTRIBUTES_ORDER = [
  Attribute.Vitality,
  Attribute.Endurance,
  Attribute.Strength,
  Attribute.Speed,
  Attribute.Resilience,
  Attribute.Vigor,
  Attribute.Fortitude,
  Attribute.Dexterity,
  Attribute.Perception,
  Attribute.Agility,
  Attribute.Luck,
];
