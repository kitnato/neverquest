import { RECOVERY_RATE } from "@neverquest/data/constants";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import { AttributeType, SkillType } from "@neverquest/types/enums";

export const ATTACK_RATE_ICON = IconAttackRate;

// TODO - diversify icons.
export const ATTRIBUTES: Readonly<Record<AttributeType, AttributeOrMastery>> = {
  [AttributeType.AttackRate]: {
    base: 0,
    description: "Increases attack rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    maximum: 0.9,
    name: "Speed",
  },
  [AttributeType.CriticalChance]: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconPlaceholder,
    increment: 0.03,
    maximum: 0.6,
    name: "Dexterity",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.CriticalDamage]: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPlaceholder,
    increment: 0.15,
    name: "Perception",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.Damage]: {
    base: 0,
    description: "Increases base attack damage.",
    Icon: IconPlaceholder,
    increment: 3,
    name: "Strength",
  },
  [AttributeType.Dodge]: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconPlaceholder,
    increment: 0.04,
    maximum: 0.8,
    name: "Agility",
    requiredSkill: SkillType.Dodge,
  },
  [AttributeType.Health]: {
    base: 100,
    description: "Increases maximum health.",
    Icon: IconPlaceholder,
    increment: 10,
    name: "Vitality",
  },
  [AttributeType.Loot]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconPlaceholder,
    increment: 0.03,
    name: "Luck",
  },
  [AttributeType.RecoveryRate]: {
    base: RECOVERY_RATE,
    description: "Increases recovery rate.",
    Icon: IconPlaceholder,
    increment: -150,
    maximum: 100,
    name: "Resilience",
  },
  [AttributeType.ReserveRegenerationAmount]: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconPlaceholder,
    increment: 1,
    name: "Fortitude",
    requiredSkill: SkillType.Regeneration,
  },

  [AttributeType.ReserveRegenerationRate]: {
    base: 0,
    description: "Increases health & stamina regeneration rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    name: "Vigor",
    requiredSkill: SkillType.Regeneration,
  },
  [AttributeType.Stamina]: {
    base: 10,
    description: "Increases maximum stamina.",
    Icon: IconPlaceholder,
    increment: 4,
    name: "Endurance",
  },
} as const;

export const ATTRIBUTES_INITIAL = [
  AttributeType.AttackRate,
  AttributeType.Damage,
  AttributeType.Health,
  AttributeType.RecoveryRate,
];

export const ATTRIBUTES_ORDER = [
  AttributeType.Health,
  AttributeType.Stamina,
  AttributeType.Damage,
  AttributeType.AttackRate,
  AttributeType.RecoveryRate,
  AttributeType.ReserveRegenerationRate,
  AttributeType.ReserveRegenerationAmount,
  AttributeType.CriticalChance,
  AttributeType.CriticalDamage,
  AttributeType.Dodge,
  AttributeType.Loot,
];

export const DAMAGE_ICON = IconDamage;
