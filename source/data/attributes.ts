import { RESERVES } from "@neverquest/data/reserves"
import IconAgility from "@neverquest/icons/agility.svg?react"
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react"
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react"
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react"
import IconDexterity from "@neverquest/icons/dexterity.svg?react"
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react"
import IconEndurance from "@neverquest/icons/endurance.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconPerception from "@neverquest/icons/perception.svg?react"
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react"
import IconSpeed from "@neverquest/icons/speed.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import IconStrength from "@neverquest/icons/strength.svg?react"
import IconVigor from "@neverquest/icons/vigor.svg?react"
import IconVitality from "@neverquest/icons/vitality.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"

import type { AttributeOrMasteryBase, IncrementBonus } from "@neverquest/types"
import type { Attribute, NumberFormat, Showing, Skill } from "@neverquest/types/unions"

export const ATTRIBUTE_COST_BASE = 2

export const ATTRIBUTES: Record<
	Attribute,
	AttributeOrMasteryBase & {
		formatting: { decimals?: number, format: NumberFormat }
		increment: {
			amount: number
			bonus?: IncrementBonus
		}
		maximum?: number
		requiredSkill?: Skill
		shows?: Showing
	}
> = {
	agility: {
		base: 0.03,
		description: "Increases chance to # dodge an attack.",
		descriptionIcons: [IconDodgeChance],
		formatting: { format: "percentage" },
		Icon: IconAgility,
		increment: { amount: 0.015 },
		maximum: 0.9,
		requiredSkill: "evasion",
	},
	dexterity: {
		base: 0.03,
		description: "Increases # critical strike chance.",
		descriptionIcons: [IconCriticalChance],
		formatting: { format: "percentage" },
		Icon: IconDexterity,
		increment: { amount: 0.0066 },
		maximum: 0.5,
		requiredSkill: "assassination",
	},
	endurance: {
		base: RESERVES.stamina.baseAmount,
		description: "Increases maximum # stamina.",
		descriptionIcons: [IconStamina],
		formatting: { format: "integer" },
		Icon: IconEndurance,
		increment: {
			amount: 10,
			bonus: { maximum: 80, perRank: 5 },
		},
		shows: "stamina",
	},
	perception: {
		base: 1.2,
		description: "Increases # critical strike damage.",
		descriptionIcons: [IconCriticalDamage],
		formatting: { format: "percentage" },
		Icon: IconPerception,
		increment: { amount: 0.03 },
		maximum: 2.1,
		requiredSkill: "assassination",
	},
	speed: {
		base: 0,
		description: "Reduces # attack rate.",
		descriptionIcons: [IconAttackRate],
		formatting: { format: "percentage" },
		Icon: IconSpeed,
		increment: { amount: -0.02 },
		maximum: -0.8,
		shows: "attackRate",
	},
	strength: {
		base: 0,
		description: "Increases # weapon damage.",
		descriptionIcons: [IconWeaponDamage],
		formatting: { format: "percentage" },
		Icon: IconStrength,
		increment: { amount: 0.035 },
		maximum: 1.05,
		shows: "damage",
	},
	vigor: {
		base: 0,
		description: "Reduces # regeneration rates of # health and # stamina.",
		descriptionIcons: [IconRegenerationRate, IconHealth, IconStamina],
		formatting: { format: "percentage" },
		Icon: IconVigor,
		increment: { amount: -0.025 },
		maximum: -0.85,
		requiredSkill: "calisthenics",
	},
	vitality: {
		base: RESERVES.health.baseAmount,
		description: "Increases maximum # health.",
		descriptionIcons: [IconHealth],
		formatting: { format: "integer" },
		Icon: IconVitality,
		increment: {
			amount: 15,
			bonus: { maximum: 200, perRank: 10 },
		},
		shows: "health",
	},
}
