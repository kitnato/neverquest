import { computed } from "@preact/signals"

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

// COMPUTED

export const attackRate = computed(() => weapon.get().rate * (1 + attributeStatistic("speed").value))

export const bleedDamage = computed(() => {
	const { duration, ticks } = bleed.value

	return Math.max(
		BLEED.minimum,
		Math.round(
			getAmountPerTick({
				amount: damage.value * masteryStatistic("cruelty").value,
				duration,
				ticks,
			}),
		),
	)
})

export const bleedRating = computed(() => bleedChance.value === 0
	? 0
	: Math.round(
		masteryStatistic("cruelty").value * PERCENTAGE + bleedChance.value * PERCENTAGE + bleedDamage.value * bleed.value.ticks,
	))

export const blockChance = computed(() => {
	const weaponValue = weapon.get()

	return !isRanged(weaponValue)
		&& (weaponValue.grip === "one-handed" || isTraitEarned("colossus").get())
		? shield.get().blockChance
		: 0
})

export const criticalChance = computed(() => isSkillTrained("assassination").get() ? attributeStatistic("dexterity").value : 0)

export const criticalDamage = computed(() => isSkillTrained("assassination").get() ? attributeStatistic("perception").value : 0)

export const criticalRating = computed(() => Math.round(criticalChance.value * PERCENTAGE) + (criticalDamage.value * PERCENTAGE))

export const criticalStrike = computed(() => Math.round(damage.value * criticalDamage.value))

export const damage = computed(() => {
	const weaponValue = weapon.get()

	return Math.round((
		// Weapon damage with strength attribute effect and brawler trait bonus, if applicable.
		weaponValue.damage * (1 + attributeStatistic("strength").value + (
			isTraitEarned("brawler").get() && isUnshielded(shield.get()) && !isRanged(weaponValue) && (weaponValue.grip === "one-handed")
				? BRAWLER_DAMAGE_BONUS
				: 0
		))
		// Elemental damage from any gems.
		+ Object.values(elementalEffects.value.weapon).reduce((sum, { damage }) => sum + damage, 0)
		// Current stamina portion from bruiser trait, if applicable.
		+ (isTraitEarned("bruiser").get() && isUnarmed(weaponValue)
			? reserveCurrent("stamina").get() * BRUISER.damage
			: 0)
		// All multiplied by total damage bonus from quest rewards.
	) * (1 + questsBonus("damageBonus").value))
})

export const damagePerSecond = computed(() => getDamagePerRate({
	damage: damage.value,
	damageModifier: criticalDamage.value,
	damageModifierChance: criticalChance.value,
	rate: attackRate.value,
}))

export const deflectionChance = computed(() => isSkillTrained("impermeability").get()
	? Math.min(
		armor.get().deflectionChance
		+ (isTraitEarned("inoculated").get() ? INOCULATED_DEFLECTION_BASE : 0),
		DEFLECTION_MAXIMUM,
	)
	: 0)

export const dodgeChance = computed(() => isSkillTrained("evasion").get()
	? Math.min(
		attributeStatistic("agility").value
		* (isTraitEarned("nudist").get() && isUnarmored(armor.get())
			? 1 + NUDIST.dodgeBonus
			: 1),
		ATTRIBUTES.agility.maximum ?? Number.POSITIVE_INFINITY,
	)
	: 0)

export const executionThreshold = computed(() => {
	const weaponValue = weapon.get()

	return isSkillTrained("siegecraft").get()
		&& isMelee(weaponValue)
		&& weaponValue.grip === "two-handed"
		? masteryStatistic("butchery").value
		: 0
})

export const isRecoveryRelevant = computed(() => recoveryRate.value > RECOVERY_MINIMUM)

export const lifeLeech = computed(() => {
	const infusionEffectEldritchCodex = infusionEffect("eldritch codex").value

	if (infusionEffectEldritchCodex === 0) {
		return 0
	}

	return Math.max(Math.round(damage.value * infusionEffectEldritchCodex), GENERIC_MINIMUM)
})

export const parryAvoidance = computed(() => PARRY.avoidance + masteryStatistic("finesse").value * PARRY.avoidanceAttenuation)

export const parryChance = computed(() => {
	const { abilityChance, gearClass } = weapon.get()

	return isSkillTrained("escrime").get() && gearClass === "slashing" ? abilityChance : 0
})

export const parryDamage = computed(() => PARRY.damage + masteryStatistic("finesse").value)

export const parryRating = computed(() => {
	const parryChanceValue = parryChance.value

	return parryChanceValue === 0
		? 0
		: Math.round(
			parryAvoidance.value * PERCENTAGE + parryChanceValue * PERCENTAGE + parryDamage.value * PERCENTAGE,
		)
})

export const protection = computed(() => {
	const armorValue = armor.get()
	const shieldValue = shield.get()

	const { protection } = armorValue

	return (
		protection
		+ (isArmor(armorValue) && isShield(shieldValue) && isTraitEarned("tank").get()
			? Math.round(protection * TANK_PROTECTION_BONUS[armorValue.gearClass])
			: 0)
	)
})

export const recoveryRate = computed(() => RECOVERY_RATE * (1 + masteryStatistic("resilience").value))

export const range = computed(() => {
	const weaponValue = weapon.get()

	return isSkillTrained("archery").get() && isRanged(weaponValue)
		? weaponValue.range * (1 + masteryStatistic("marksmanship").value)
		: 0
})

export const staggerRating = computed(() => Math.round(staggerChance.value * masteryStatistic("stability").value))

export const stunRating = computed(() => Math.round(stunChance.value * masteryStatistic("might").value))

export const thorns = computed(() => {
	const isTraitEarnedAcanthaceous = isTraitEarned("acanthaceous").get()

	return Math.round(
		(isTraitEarnedAcanthaceous ? powerLevel.value : 0)
		+ Object.values(elementalEffects.value.armor).reduce((sum, { damage }) => sum + damage, 0)
		* (1 + (isTraitEarnedAcanthaceous ? ACANTHACEOUS_GEM_EFFECT_BONUS : 0)),
	)
})
