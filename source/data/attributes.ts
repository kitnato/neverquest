import { RESERVES } from "@neverquest/data/reserves"
import IconAgility from "@neverquest/icons/agility.svg?react"
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react"
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react"
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconDexterity from "@neverquest/icons/dexterity.svg?react"
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react"
import IconEndurance from "@neverquest/icons/endurance.svg?react"
import IconFortitude from "@neverquest/icons/fortitude.svg?react"
import IconHealthRegeneration from "@neverquest/icons/health-regeneration.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconPerception from "@neverquest/icons/perception.svg?react"
import IconSpeed from "@neverquest/icons/speed.svg?react"
import IconStaminaRegeneration from "@neverquest/icons/stamina-regeneration.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import IconStrength from "@neverquest/icons/strength.svg?react"
import IconVigor from "@neverquest/icons/vigor.svg?react"
import IconVitality from "@neverquest/icons/vitality.svg?react"

import type { AttributeOrMasteryBaseData, IncrementBonus } from "@neverquest/types"
import type { Attribute, NumberFormat, Showing, Skill } from "@neverquest/types/unions"

export const ATTRIBUTE_COST_BASE = 2

export const ATTRIBUTES: Record<
	Attribute,
	AttributeOrMasteryBaseData & {
		format: NumberFormat
		incrementBonus?: IncrementBonus
		maximum?: number
		requiredSkill?: Skill
		shows?: Showing
	}
> = {
	agility: {
		base: 0.03,
		description: "Increases chance to # dodge an attack.",
		descriptionIcons: [IconDodgeChance],
		format: "percentage",
		Icon: IconAgility,
		increment: 0.015,
		maximum: 0.95,
		requiredSkill: "evasion",
	},
	dexterity: {
		base: 0.03,
		description: "Increases # critical strike chance.",
		descriptionIcons: [IconCriticalChance],
		format: "percentage",
		Icon: IconDexterity,
		increment: 0.0066,
		maximum: 0.5,
		requiredSkill: "assassination",
	},
	endurance: {
		base: RESERVES.stamina.baseAmount,
		description: "Increases maximum # stamina.",
		descriptionIcons: [IconStamina],
		format: "integer",
		Icon: IconEndurance,
		increment: 10,
		incrementBonus: { maximum: 150, perRank: 5 },
		shows: "stamina",
	},
	fortitude: {
		base: 0,
		description: "Increases health # regeneration rate.",
		descriptionIcons: [IconHealthRegeneration],
		format: "percentage",
		Icon: IconFortitude,
		increment: -0.025,
		maximum: 0.9,
		requiredSkill: "calisthenics",
	},
	perception: {
		base: 1.2,
		description: "Increases # critical strike damage.",
		descriptionIcons: [IconCriticalDamage],
		format: "percentage",
		Icon: IconPerception,
		increment: 0.03,
		maximum: 2.5,
		requiredSkill: "assassination",
	},
	speed: {
		base: 0,
		description: "Reduces # attack rate.",
		descriptionIcons: [IconAttackRate],
		format: "percentage",
		Icon: IconSpeed,
		increment: -0.015,
		maximum: 0.75,
		shows: "attackRate",
	},
	strength: {
		base: 0,
		description: "Increases # damage.",
		descriptionIcons: [IconDamage],
		format: "integer",
		Icon: IconStrength,
		increment: 2,
		incrementBonus: { maximum: 50, perRank: 1 },
		shows: "damage",
	},
	vigor: {
		base: 0,
		description: "Reduces stamina # regeneration rate.",
		descriptionIcons: [IconStaminaRegeneration],
		format: "percentage",
		Icon: IconVigor,
		increment: -0.025,
		maximum: 0.9,
		requiredSkill: "calisthenics",
	},
	vitality: {
		base: RESERVES.health.baseAmount,
		description: "Increases maximum # health.",
		descriptionIcons: [IconHealth],
		format: "integer",
		Icon: IconVitality,
		increment: 15,
		incrementBonus: { maximum: 200, perRank: 10 },
		shows: "health",
	},
}
