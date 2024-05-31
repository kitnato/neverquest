import { selector } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { RECOVERY_MINIMUM } from "@neverquest/data/character"
import { GENERIC_MINIMUM, PERCENTAGE } from "@neverquest/data/general"
import {
	BLEED,
	DEFLECTION_MAXIMUM,
	PARRY,
	RECOVERY_RATE,
} from "@neverquest/data/statistics"
import {
	ACANTHACEOUS_GEM_EFFECT_BONUS,
	BRAWLER_DAMAGE_BONUS,
	BRUISER,
	INOCULATED_DEFLECTION_BASE,
	NUDIST,
	TANK_PROTECTION_BONUS,
} from "@neverquest/data/traits"
import { bleed, bleedChance, staggerChance, stunChance } from "@neverquest/state/ailments"
import { attributeStatistic, powerLevel } from "@neverquest/state/attributes"
import { armor, elementalEffects, shield, weapon } from "@neverquest/state/gear"
import { infusionEffect } from "@neverquest/state/items"
import { masteryStatistic } from "@neverquest/state/masteries"
import { questsBonus } from "@neverquest/state/quests"
import { reserveCurrent } from "@neverquest/state/reserves"
import { isSkillTrained } from "@neverquest/state/skills"
import { isTraitEarned } from "@neverquest/state/traits"
import {
	isArmor,
	isMelee,
	isRanged,
	isShield,
	isUnarmed,
	isUnarmored,
	isUnshielded,
} from "@neverquest/types/type-guards"
import { getAmountPerTick, getDamagePerRate } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const attackRate = withStateKey("attackRate", key =>
	selector({
		get: ({ get }) => get(weapon).rate * (1 + get(attributeStatistic("speed"))),
		key,
	}),
)

export const bleedDamage = withStateKey("bleedDamage", key =>
	selector({
		get: ({ get }) => {
			const { duration, ticks } = get(bleed)

			return Math.max(
				BLEED.minimum,
				Math.round(
					getAmountPerTick({
						amount: get(damage) * get(masteryStatistic("cruelty")),
						duration,
						ticks,
					}),
				),
			)
		},
		key,
	}),
)

export const bleedRating = withStateKey("bleedRating", key =>
	selector({
		get: ({ get }) => get(bleedChance) === 0
			? 0
			: Math.round(
				get(masteryStatistic("cruelty")) * PERCENTAGE + get(bleedChance) * PERCENTAGE + get(bleedDamage) * get(bleed).ticks,
			),
		key,
	}),
)

export const blockChance = withStateKey("blockChance", key =>
	selector({
		get: ({ get }) => {
			const weaponValue = get(weapon)

			return !isRanged(weaponValue)
				&& (weaponValue.grip === "one-handed" || get(isTraitEarned("colossus")))
				? get(shield).blockChance
				: 0
		},
		key,
	}),
)

export const criticalChance = withStateKey("criticalChance", key =>
	selector({
		get: ({ get }) => get(isSkillTrained("assassination")) ? get(attributeStatistic("dexterity")) : 0,
		key,
	}),
)

export const criticalDamage = withStateKey("criticalDamage", key =>
	selector({
		get: ({ get }) => get(isSkillTrained("assassination")) ? get(attributeStatistic("perception")) : 0,
		key,
	}),
)

export const criticalRating = withStateKey("criticalRating", key =>
	selector({
		get: ({ get }) => Math.round((get(criticalChance) * PERCENTAGE) + (get(criticalDamage) * PERCENTAGE)),
		key,
	}),
)

export const criticalStrike = withStateKey("criticalStrike", key =>
	selector({
		get: ({ get }) => Math.round(get(damage) * get(criticalDamage)),
		key,
	}),
)

export const damage = withStateKey("damage", key =>
	selector({
		get: ({ get }) => {
			const weaponValue = get(weapon)

			return Math.round((
				// Weapon damage with strength attribute effect and brawler trait bonus, if applicable.
				weaponValue.damage * (1 + get(attributeStatistic("strength")) + (
					get(isTraitEarned("brawler")) && isUnshielded(get(shield)) && !isRanged(weaponValue) && (weaponValue.grip === "one-handed")
						? BRAWLER_DAMAGE_BONUS
						: 0
				))
				// Elemental damage from any gems.
				+ Object.values(get(elementalEffects).weapon).reduce((sum, { damage }) => sum + damage, 0)
				// Current stamina portion from bruiser trait, if applicable.
				+ (get(isTraitEarned("bruiser")) && isUnarmed(weaponValue)
					? get(reserveCurrent("stamina")) * BRUISER.damage
					: 0)
				// All multiplied by total damage bonus from quest rewards.
			) * (1 + get(questsBonus("damageBonus"))))
		},
		key,
	}),
)

export const damagePerSecond = withStateKey("damagePerSecond", key =>
	selector({
		get: ({ get }) => getDamagePerRate({
			damage: get(damage),
			damageModifier: get(criticalDamage),
			damageModifierChance: get(criticalChance),
			rate: get(attackRate),
		}),
		key,
	}),
)

export const deflectionChance = withStateKey("deflectionChance", key =>
	selector({
		get: ({ get }) => get(isSkillTrained("impermeability"))
			? Math.min(
				get(armor).deflectionChance
				+ (get(isTraitEarned("inoculated")) ? INOCULATED_DEFLECTION_BASE : 0),
				DEFLECTION_MAXIMUM,
			)
			: 0,
		key,
	}),
)

export const dodgeChance = withStateKey("dodgeChance", key =>
	selector({
		get: ({ get }) => get(isSkillTrained("evasion"))
			? Math.min(
				get(attributeStatistic("agility"))
				* (get(isTraitEarned("nudist")) && isUnarmored(get(armor))
					? 1 + NUDIST.dodgeBonus
					: 1),
				ATTRIBUTES.agility.maximum ?? Number.POSITIVE_INFINITY,
			)
			: 0,
		key,
	}),
)

export const executionThreshold = withStateKey("executionThreshold", key =>
	selector({
		get: ({ get }) => {
			const weaponValue = get(weapon)

			return get(isSkillTrained("siegecraft"))
				&& isMelee(weaponValue)
				&& weaponValue.grip === "two-handed"
				? get(masteryStatistic("butchery"))
				: 0
		},
		key,
	}),
)

export const isRecoveryRelevant = withStateKey("isRecoveryRelevant", key =>
	selector({
		get: ({ get }) => get(recoveryRate) > RECOVERY_MINIMUM,
		key,
	}),
)

export const lifeLeech = withStateKey("lifeLeech", key =>
	selector({
		get: ({ get }) => {
			const infusionEffectEldritchCodex = get(infusionEffect("eldritch codex"))

			if (infusionEffectEldritchCodex === 0) {
				return 0
			}

			return Math.max(Math.round(get(damage) * infusionEffectEldritchCodex), GENERIC_MINIMUM)
		},
		key,
	}),
)

export const parryAvoidance = withStateKey("parryAvoidance", key =>
	selector({
		get: ({ get }) => PARRY.avoidance + get(masteryStatistic("finesse")) * PARRY.avoidanceAttenuation,
		key,
	}),
)

export const parryChance = withStateKey("parryChance", key =>
	selector({
		get: ({ get }) => {
			const { abilityChance, gearClass } = get(weapon)

			return get(isSkillTrained("escrime")) && gearClass === "slashing" ? abilityChance : 0
		},
		key,
	}),
)

export const parryDamage = withStateKey("parryDamage", key =>
	selector({
		get: ({ get }) => PARRY.damage + get(masteryStatistic("finesse")),
		key,
	}),
)

export const parryRating = withStateKey("parryRating", key =>
	selector({
		get: ({ get }) => get(parryChance) === 0
			? 0
			: Math.round(
				get(parryAvoidance) * PERCENTAGE + get(parryChance) * PERCENTAGE + get(parryDamage) * PERCENTAGE,
			),
		key,
	}),
)

export const protection = withStateKey("protection", key =>
	selector({
		get: ({ get }) => {
			const armorValue = get(armor)
			const shieldValue = get(shield)

			const { protection } = armorValue

			return (
				protection
				+ (isArmor(armorValue) && isShield(shieldValue) && get(isTraitEarned("tank"))
					? Math.round(protection * TANK_PROTECTION_BONUS[armorValue.gearClass])
					: 0)
			)
		},
		key,
	}),
)

export const recoveryRate = withStateKey("recoveryRate", key =>
	selector({
		get: ({ get }) => RECOVERY_RATE * (1 + get(masteryStatistic("resilience"))),
		key,
	}),
)

export const range = withStateKey("range", key =>
	selector({
		get: ({ get }) => {
			const weaponValue = get(weapon)

			return get(isSkillTrained("archery")) && isRanged(weaponValue)
				? weaponValue.range * (1 + get(masteryStatistic("marksmanship")))
				: 0
		},
		key,
	}),
)

export const staggerRating = withStateKey("staggerRating", key =>
	selector({
		get: ({ get }) => Math.round(get(staggerChance) * get(masteryStatistic("stability"))),
		key,
	}),
)

export const stunRating = withStateKey("stunRating", key =>
	selector({
		get: ({ get }) => Math.round(get(stunChance) * get(masteryStatistic("might"))),
		key,
	}),
)

export const thorns = withStateKey("thorns", key =>
	selector({
		get: ({ get }) => {
			const isTraitEarnedAcanthaceous = get(isTraitEarned("acanthaceous"))

			return Math.round(
				(isTraitEarnedAcanthaceous ? get(powerLevel) : 0)
				+ Object.values(get(elementalEffects).armor).reduce((sum, { damage }) => sum + damage, 0)
				* (1 + (isTraitEarnedAcanthaceous ? ACANTHACEOUS_GEM_EFFECT_BONUS : 0)),
			)
		},
		key,
	}),
)
