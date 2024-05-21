import { useRecoilCallback } from "recoil"

import { TEARS_MAXIMUM } from "@neverquest/data/items"
import { AILMENT_PENALTY } from "@neverquest/data/statistics"
import { NUDIST } from "@neverquest/data/traits"
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth"
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth"
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina"
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery"
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { staggerChance } from "@neverquest/state/ailments"
import {
	isAttacking,
	recoveryDuration,
	statusElement,
} from "@neverquest/state/character"
import { armor, armorBurden, canAttackOrParry, canBlockOrStagger, canDodge, shield, weapon } from "@neverquest/state/gear"
import { ownedItem } from "@neverquest/state/inventory"
import { tears } from "@neverquest/state/items"
import { masteryStatistic } from "@neverquest/state/masteries"
import {
	blightChance,
	isMonsterAiling,
	monsterAilmentDuration,
	monsterAttackDuration,
	monsterAttackRate,
	monsterDamageAiling,
	monsterElement,
	poisonChance,
} from "@neverquest/state/monster"
import {
	blight,
	healthMaximumPoisoned,
	isPoisoned,
	poisonDuration,
	poisonLength,
} from "@neverquest/state/reserves"
import {
	blockChance,
	deflectionChance,
	dodgeChance,
	parryAvoidance,
	parryChance,
	parryDamage,
	protection,
	recoveryRate,
	thorns,
} from "@neverquest/state/statistics"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isUnarmored } from "@neverquest/types/type-guards"
import { ELEMENTAL_TYPES } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"
import { animateElement } from "@neverquest/utilities/helpers"

import type { DeltaDisplay } from "@neverquest/types/ui"

export function useDefend() {
	const addDelta = useAddDelta()
	const changeHealth = useChangeHealth()
	const changeMonsterHealth = useChangeMonsterHealth()
	const changeStamina = useChangeStamina()
	const increaseMastery = useIncreaseMastery()
	const inflictElementalAilment = useInflictElementalAilment()
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const armorBurdenValue = get(armorBurden)
				const shieldValue = get(shield)
				const { burden: shieldBurden } = shieldValue
				const canBlockOrStaggerValue = get(canBlockOrStagger)
				const ownedItemLacrimatory = get(ownedItem("lacrimatory"))
				const canGatherTears = ownedItemLacrimatory !== undefined && get(tears) < TEARS_MAXIMUM

				const deltaHealth: DeltaDisplay[] = []
				const deltaStamina: DeltaDisplay[] = []

				set(isShowing("monsterOffense"), true)

				animateElement({
					animation: "headShake",
					element: get(statusElement),
					speed: "fast",
				})

				if (get(isAttacking) && get(monsterAttackDuration) === 0) {
					set(monsterAttackDuration, get(monsterAttackRate))
				}

				// If stunned, check if hit connects at all.
				if (get(isMonsterAiling("stunned")) && Math.random() <= AILMENT_PENALTY.stunned) {
					addDelta({
						contents: {
							color: "text-secondary",
							value: "MISS",
						},
						delta: "health",
					})

					return
				}

				// If attack is dodged, all damage and ailments are avoided.
				if (Math.random() <= get(dodgeChance)) {
					if (get(canDodge)) {
						progressQuest({ quest: "dodging" })

						deltaHealth.push({
							color: "text-secondary",
							value: "DODGED",
						})

						changeStamina({ value: -armorBurdenValue })

						if (get(isTraitAcquired("nudist")) && isUnarmored(get(armor))) {
							const healthGain = Math.round(get(healthMaximumPoisoned) * NUDIST.healAmount)

							changeHealth({
								contents: [
									...deltaHealth,
									{
										color: "text-secondary",
										value: "HEAL",
									},
								],
								value: healthGain,
							})
						}
						else {
							addDelta({ contents: deltaHealth, delta: "health" })
						}

						return
					}
					else {
						deltaStamina.push(
							{
								color: "text-secondary",
								value: "CANNOT DODGE",
							},
							{
								color: "text-danger",
								value: `(${armorBurdenValue})`,
							},
						)

						progressQuest({ quest: "exhausting" })
					}
				}

				const thornsValue = get(thorns)
				const hasInflictedThorns = thornsValue > 0

				const deflectionChanceValue = get(deflectionChance)
				const monsterDamageAilingValue = get(monsterDamageAiling)
				const protectionValue = get(protection)

				const deltaMonsterHealth: DeltaDisplay[] = []
				const totalDamage = monsterDamageAilingValue - protectionValue

				let hasParried = Math.random() <= get(parryChance)
				let hasBlocked = !hasParried && Math.random() <= get(blockChance)
				let hasStaggered = !hasParried && Math.random() <= get(staggerChance)
				let healthDamage = totalDamage > 0 ? totalDamage : 0
				let monsterHealthDamage = 0
				let staminaCost = 0

				// If parrying occurs, check if it's possible.
				if (hasParried) {
					if (get(canAttackOrParry)) {
						healthDamage = Math.round(healthDamage * (1 - get(parryAvoidance)))
						monsterHealthDamage += Math.round(healthDamage * get(parryDamage))

						progressQuest({ quest: "parrying" })

						deltaMonsterHealth.push({
							color: "text-secondary",
							value: "PARRY",
						})

						deltaHealth.push({
							color: "text-secondary",
							value: "PARRIED",
						})
					}
					else {
						hasParried = false

						deltaStamina.push(
							{
								color: "text-secondary",
								value: "CANNOT PARRY",
							},
							{
								color: "text-danger",
								value: `(${get(weapon).burden})`,
							},
						)

						progressQuest({ quest: "exhausting" })
					}
				}

				if (hasBlocked) {
					if (canBlockOrStaggerValue) {
						healthDamage = 0
						staminaCost += shieldBurden

						deltaHealth.push({
							color: "text-secondary",
							value: "BLOCKED",
						})

						increaseMastery("stability")
						progressQuest({ quest: "blocking" })
					}
					else {
						hasBlocked = false

						deltaStamina.push(
							{
								color: "text-secondary",
								value: "CANNOT BLOCK",
							},
							{
								color: "text-danger",
								value: `(${shieldBurden})`,
							},
						)

						progressQuest({ quest: "exhausting" })
					}
				}

				if (hasStaggered) {
					if (canBlockOrStaggerValue) {
						staminaCost += shieldBurden

						set(monsterAilmentDuration("staggered"), get(masteryStatistic("stability")))

						increaseMastery("stability")
						progressQuest({ quest: "staggering" })
					}
					else {
						hasStaggered = false

						deltaStamina.push(
							{
								color: "text-secondary",
								value: "CANNOT STAGGER",
							},
							{
								color: "text-danger",
								value: `(${shieldBurden})`,
							},
						)

						progressQuest({ quest: "exhausting" })
					}
				}

				// If neither dodged, parried nor blocked, show damage with protection and increase resilience.
				if (!hasBlocked && !hasParried) {
					if (protectionValue > 0) {
						deltaHealth.push({
							color: "text-secondary",
							// In the case of 0 health damage, show only inflicted damage.
							value: `(${formatNumber({
								value: Math.min(protectionValue, monsterDamageAilingValue),
							})})`,
						})
					}

					staminaCost += armorBurdenValue
				}

				// If already poisoned, check if blighting has occurred and if it's been deflected.
				if (get(isPoisoned) && Math.random() <= get(blightChance)) {
					if (Math.random() <= deflectionChanceValue) {
						progressQuest({ quest: "deflecting" })

						deltaStamina.push({
							color: "text-success",
							value: "DEFLECTED BLIGHT",
						})
					}
					else {
						if (canGatherTears) {
							progressQuest({ quest: "fillingLacrimatory" })
							set(tears, currentTears => currentTears + 1)
						}

						progressQuest({ quest: "blighting" })

						set(blight, currentBlight => currentBlight + 1)

						deltaStamina.push({
							color: "text-secondary",
							value: "BLIGHTED",
						})
					}
				}

				// If poisoning occurs, check if has been deflected, otherwise apply poison duration.
				if (Math.random() <= get(poisonChance)) {
					if (Math.random() <= deflectionChanceValue) {
						progressQuest({ quest: "deflecting" })

						deltaHealth.push({
							color: "text-success",
							value: "DEFLECTED POISON",
						})
					}
					else {
						if (canGatherTears) {
							progressQuest({ quest: "fillingLacrimatory" })
							set(tears, currentTears => currentTears + 1)
						}

						progressQuest({ quest: "poisoning" })

						set(poisonDuration, get(poisonLength))

						deltaHealth.push({
							color: "text-secondary",
							value: "POISONED",
						})
					}
				}

				// Calculate & apply thorns damage.
				if (hasInflictedThorns) {
					progressQuest({ quest: "thorns" })

					monsterHealthDamage += thornsValue

					deltaMonsterHealth.push({
						color: "text-secondary",
						value: "THORNS",
					})
				}

				if (healthDamage > 0) {
					increaseMastery("resilience")
				}

				if (!hasBlocked && !hasParried && !hasStaggered) {
					set(isShowing("recovery"), true)
					set(recoveryDuration, get(recoveryRate))
				}

				// Inflict any armor elemental effects.
				for (const elemental of ELEMENTAL_TYPES) {
					inflictElementalAilment({ elemental, slot: "armor" })
				}

				// Inflict any parry and/or thorns damage.
				if (monsterHealthDamage > 0) {
					changeMonsterHealth({
						contents: deltaMonsterHealth,
						damageType: hasInflictedThorns ? "thorns" : hasParried ? "parry" : undefined,
						value: -monsterHealthDamage,
					})
				}

				if ((hasStaggered && canBlockOrStaggerValue) || monsterHealthDamage > 0) {
					animateElement({
						animation: "headShake",
						element: get(monsterElement),
						speed: "fast",
					})
				}

				// Take any damage and any stamina costs.
				changeHealth({ contents: deltaHealth, value: -healthDamage })
				changeStamina({ contents: deltaStamina, value: -staminaCost })
			},
		[
			addDelta,
			changeHealth,
			changeMonsterHealth,
			changeStamina,
			increaseMastery,
			inflictElementalAilment,
			progressQuest,
		],
	)
}
