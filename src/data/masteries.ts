// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { AttributeOrMastery } from "@neverquest/types";
import { MasteryType, SkillType } from "@neverquest/types/enums";

export const MASTERIES: Record<MasteryType, AttributeOrMastery> = {
  [MasteryType.BleedDamage]: {
    base: 0.1,
    description: "Affects bleed damage. Trains when inflicting bleed.",
    Icon,
    increment: 0.04,
    maximum: 1,
    name: "Cruelty",
    requiredSkill: SkillType.Bleed,
  },
  [MasteryType.FreeBlockChance]: {
    base: 0,
    description: "Chance that blocking consumes no stamina. Trains when blocking.",
    Icon,
    increment: 0.03,
    maximum: 0.66,
    name: "Stability",
    requiredSkill: SkillType.Shields,
  },
  [MasteryType.ParryFactor]: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying. Trains when parrying.",
    Icon,
    increment: 0.02,
    maximum: 0.8,
    name: "Finesse",
    requiredSkill: SkillType.Parry,
  },
  [MasteryType.SkipRecoveryChance]: {
    base: 0,
    description: "Chance to ignore recovery when struck. Trains when struck.",
    Icon,
    increment: 0.02,
    maximum: 0.9,
    name: "Tenacity",
    requiredSkill: SkillType.Armors,
  },
  [MasteryType.StaggerDuration]: {
    base: 1200,
    description: "Affects stagger duration. Trains when inflicting stagger.",
    Icon,
    increment: 100,
    maximum: 3500,
    name: "Might",
    requiredSkill: SkillType.Stagger,
  },
};

export const MASTERIES_ORDER = [
  MasteryType.StaggerDuration,
  MasteryType.ParryFactor,
  MasteryType.BleedDamage,
  MasteryType.SkipRecoveryChance,
  MasteryType.FreeBlockChance,
];
