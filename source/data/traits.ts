import { ARMOR_CLASS_TYPES } from "@kitnato/locran/build/types"

import IconAcanthaceous from "@neverquest/icons/acanthaceous.svg?react"
import IconArmorNone from "@neverquest/icons/armor-none.svg?react"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconBleeding from "@neverquest/icons/bleeding.svg?react"
import IconBrawler from "@neverquest/icons/brawler.svg?react"
import IconBruiser from "@neverquest/icons/bruiser.svg?react"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconColossus from "@neverquest/icons/colossus.svg?react"
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconDeflectionChance from "@neverquest/icons/deflection-chance.svg?react"
import IconDistance from "@neverquest/icons/distance.svg?react"
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react"
import IconExecution from "@neverquest/icons/execution.svg?react"
import IconExecutioner from "@neverquest/icons/executioner.svg?react"
import IconGems from "@neverquest/icons/gems.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconInoculated from "@neverquest/icons/inoculated.svg?react"
import IconNudist from "@neverquest/icons/nudist.svg?react"
import IconOneHanded from "@neverquest/icons/one-handed.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import IconProtection from "@neverquest/icons/protection.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconSharpshooter from "@neverquest/icons/sharpshooter.svg?react"
import IconShieldNone from "@neverquest/icons/shield-none.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import IconShredder from "@neverquest/icons/shredder.svg?react"
import IconStalwart from "@neverquest/icons/stalwart.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import IconStrength from "@neverquest/icons/strength.svg?react"
import IconStunChance from "@neverquest/icons/stun-chance.svg?react"
import IconTank from "@neverquest/icons/tank.svg?react"
import IconThorns from "@neverquest/icons/thorns.svg?react"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"
import IconWeaponNone from "@neverquest/icons/weapon-none.svg?react"
import { formatEnumeration, formatNumber } from "@neverquest/utilities/formatters"

import { ARMOR_SPECIFICATIONS } from "./gear"

import type { SVGIcon } from "@neverquest/types/components"
import type { Description } from "@neverquest/types/ui"
import type { Skill, Trait } from "@neverquest/types/unions"

export const ACANTHACEOUS_GEM_EFFECT_BONUS = 0.5

export const BRAWLER_DAMAGE_BONUS = 0.25

export const BRUISER = {
	damage: 0.35,
	stun: { increment: 0.03, maximum: 0.9 },
}

export const INOCULATED_DEFLECTION_BASE = 0.3

export const NUDIST = {
	dodgeBonus: 0.75,
	healAmount: 0.1,
}

export const STALWART_BURDEN_REDUCTION = 0.5

export const TANK_PROTECTION_BONUS = {
	heavy: 0.05,
	light: 0.2,
	reinforced: 0.1,
}

export const TRAITS: Record<
	Trait,
	Description & {
		Icon: SVGIcon
		requiredSkill?: Skill
	}
> = {
	acanthaceous: {
		description: `Base # thorns is determined by # power level and thorns damage from # gems is increased by ${formatNumber({
			format: "percentage",
			value: ACANTHACEOUS_GEM_EFFECT_BONUS,
		})}.`,
		descriptionIcons: [IconThorns, IconPowerLevel, IconGems],
		Icon: IconAcanthaceous,
	},
	brawler: {
		description: `While # unshielded, # weapon damage of # one-handed melee weapons and # two-handed melee weapons wielded in one hand are increased by ${formatNumber({
			format: "percentage",
			value: BRAWLER_DAMAGE_BONUS,
		})}.`,
		descriptionIcons: [IconShieldNone, IconWeaponDamage, IconOneHanded, IconTwoHanded],
		Icon: IconBrawler,
	},
	bruiser: {
		description: `While # unarmed, # total damage is increased by ${formatNumber({
			format: "percentage",
			value: BRUISER.damage,
		})} of current # stamina and # stun chance is ${formatNumber({
			format: "percentage",
			value: BRUISER.stun.increment,
		})} per # strength attribute rank.`,
		descriptionIcons: [IconWeaponNone, IconDamage, IconStamina, IconStunChance, IconStrength],
		Icon: IconBruiser,
	},
	colossus: {
		description: "# Two-handed melee weapons can be wielded in one hand.",
		descriptionIcons: [IconTwoHanded],
		Icon: IconColossus,
	},
	executioner: {
		description: "# Critical strikes with a # two-handed melee weapon also have a chance to execute equivalent to the # execution threshold.",
		descriptionIcons: [IconCriticalRating, IconTwoHanded, IconExecution],
		Icon: IconExecutioner,
	},
	inoculated: {
		description: `Base # deflection chance is ${formatNumber({
			format: "percentage",
			value: INOCULATED_DEFLECTION_BASE,
		})}.`,
		descriptionIcons: [IconDeflectionChance],
		Icon: IconInoculated,
		requiredSkill: "impermeability",
	},
	nudist: {
		description: `While # unarmored, # dodge chance is increased by ${formatNumber({
			format: "percentage",
			value: NUDIST.dodgeBonus,
		})}. When dodging, ${formatNumber({
			format: "percentage",
			value: NUDIST.healAmount,
		})} of maximum # health is restored.`,
		descriptionIcons: [IconArmorNone, IconDodgeChance, IconHealth],
		Icon: IconNudist,
	},
	sharpshooter: {
		description:
			"While at a # distance, all attacks with a # ranged weapon are # critical strikes.",
		descriptionIcons: [IconDistance, IconRanged, IconCriticalRating],
		Icon: IconSharpshooter,
	},
	shredder: {
		description: "# Bleeding damage is inflicted all at once.",
		descriptionIcons: [IconBleeding],
		Icon: IconShredder,
	},
	stalwart: {
		description: `# Burden from # armor is reduced by ${formatNumber({
			format: "percentage",
			value: STALWART_BURDEN_REDUCTION,
		})}.`,
		descriptionIcons: [IconBurden, IconArmor],
		Icon: IconStalwart,
	},
	tank: {
		description: `While a # shield is equipped, # protection is increased by ${formatEnumeration(
			ARMOR_CLASS_TYPES.map(armorClass => `${formatNumber({
				format: "percentage",
				value: TANK_PROTECTION_BONUS[armorClass],
			})} for # ${armorClass}`)).replace("&", "and")} armor classes.`,
		descriptionIcons: [IconShield, IconProtection, ...ARMOR_CLASS_TYPES.map(armorClass => ARMOR_SPECIFICATIONS[armorClass].Icon)],
		Icon: IconTank,
	},
}
