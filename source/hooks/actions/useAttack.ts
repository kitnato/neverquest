import { useRecoilCallback } from "recoil"

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth"
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth"
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina"
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery"
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { bleed, bleedChance, stunChance } from "@neverquest/state/ailments"
import {
	attackDuration,
	isAttacking,
} from "@neverquest/state/character"
import { canAttackOrParry, isMunitionsSufficient, weapon } from "@neverquest/state/gear"
import { masteryStatistic } from "@neverquest/state/masteries"
import {
	distance,
	monsterAilmentDuration,
	monsterElement,
	monsterHealth,
	monsterHealthMaximum,
} from "@neverquest/state/monster"
import { isReserveAtMaximum } from "@neverquest/state/reserves"
import { isSkillTrained } from "@neverquest/state/skills"
import {
	attackRate,
	criticalChance,
	criticalStrike,
	damage,
	executionThreshold,
	lifeLeech,
} from "@neverquest/state/statistics"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isMelee, isRanged } from "@neverquest/types/type-guards"
import { ELEMENTAL_TYPES } from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"
import { animateElement } from "@neverquest/utilities/helpers"

import type { DeltaDisplay } from "@neverquest/types/general"

export function useAttack() {
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

				const canAttackOrParryValue = get(canAttackOrParry)
				const isMunitionsSufficientValue = get(isMunitionsSufficient)
				const executionThresholdValue = get(executionThreshold)
				const lifeLeechValue = get(lifeLeech)
				const monsterHealthValue = get(monsterHealth)
				const weaponValue = get(weapon)
				const isWeaponRanged = isRanged(weaponValue)
				const isCriticalStrike = (
					get(isSkillTrained("assassination"))
					&& isWeaponRanged
					&& get(isTraitEarned("sharpshooter"))
					&& get(distance) > 0
				) || Math.random() <= get(criticalChance)

				let totalDamage = Math.round(isCriticalStrike ? get(criticalStrike) : get(damage))

				set(isShowing("damage"), true)

				if (get(isAttacking) && get(attackDuration) === 0) {
					set(attackDuration, get(attackRate))
				}

				if (canAttackOrParryValue && isMunitionsSufficientValue) {
					if (weaponValue.burden > 0) {
						changeStamina({ value: -weaponValue.burden })
					}

					animateElement({
						animation: "headShake",
						element: get(monsterElement),
						speed: "fast",
					})

					if (
						(
							isMelee(weaponValue)
							&& weaponValue.grip === "two-handed"
							&& monsterHealthValue / get(monsterHealthMaximum) <= executionThresholdValue
						)
						|| (
							isCriticalStrike && get(isTraitEarned("executioner")) && Math.random() <= executionThresholdValue
						)
					) {
						totalDamage = monsterHealthValue

						changeMonsterHealth({
							contents: [
								{
									color: "text-secondary",
									value: "EXECUTE",
								},
							],
							damageType: "execution",
							value: -totalDamage,
						})
					}
					else {
						const monsterDeltas: DeltaDisplay[] = []

						if (
							get(monsterAilmentDuration("bleeding")) === 0
							&& Math.random() <= get(bleedChance)
						) {
							set(monsterAilmentDuration("bleeding"), get(bleed).duration)

							progressQuest({ quest: "bleeding" })

							monsterDeltas.push({
								color: "text-secondary",
								value: "BLEEDING",
							})
						}

						if (isCriticalStrike) {
							progressQuest({ quest: "critical" })

							monsterDeltas.push({
								color: "text-secondary",
								value: "CRITICAL",
							})
						}

						if (Math.random() <= get(stunChance)) {
							set(monsterAilmentDuration("stunned"), get(masteryStatistic("might")))

							progressQuest({ quest: "stunning" })

							monsterDeltas.push({
								color: "text-secondary",
								value: "STUN",
							})
						}

						for (const elemental of ELEMENTAL_TYPES) {
							inflictElementalAilment({ elemental, slot: "weapon" })
						}

						changeMonsterHealth({
							contents: monsterDeltas,
							damageType: isCriticalStrike ? "critical" : undefined,
							value: -totalDamage,
						})
					}

					if (!get(isReserveAtMaximum("health")) && lifeLeechValue > 0) {
						changeHealth({
							contents: {
								color: "text-secondary",
								value: "LEECH",
							},
							value: lifeLeechValue,
						})
					}

					increaseMastery("butchery")
					increaseMastery("cruelty")
					increaseMastery("finesse")
					increaseMastery("marksmanship")
					increaseMastery("might")
				}
				else {
					if (!canAttackOrParryValue) {
						addDelta({
							contents: [
								{
									color: "text-secondary",
									value: "CANNOT ATTACK",
								},
								{
									color: "text-danger",
									value: `(${weaponValue.burden})`,
								},
							],
							delta: "stamina",
						})

						progressQuest({ quest: "exhausting" })
					}

					if (!isMunitionsSufficientValue) {
						addDelta({
							contents: {
								color: "text-secondary",
								value: "INSUFFICIENT MUNITIONS",
							},
							delta: "munitions",
						})
					}
				}
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
