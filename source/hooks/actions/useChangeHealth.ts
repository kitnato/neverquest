import { useRecoilCallback } from "recoil"

import { CORPSE_VALUE } from "@neverquest/data/encounter"
import { HEALTH_LOW_THRESHOLD } from "@neverquest/data/reserves"
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { absorbedEssence } from "@neverquest/state/attributes"
import { isAttacking, recoveryDuration } from "@neverquest/state/character"
import { corpse, stage } from "@neverquest/state/encounter"
import { ownedItem } from "@neverquest/state/inventory"
import { isRelicEquipped } from "@neverquest/state/items"
import {
	healthMaximumPoisoned,
	isInvulnerable,
	protectedElement,
	regenerationDuration,
	reserveCurrent,
} from "@neverquest/state/reserves"
import { essence } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"
import { animateElement } from "@neverquest/utilities/helpers"

import type { DeltaReserve } from "@neverquest/types/ui"

export function useChangeHealth() {
	const addDelta = useAddDelta()
	const mending = useMending()
	const progressQuest = useProgressQuest()
	const toggleAttacking = useToggleAttacking()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ contents, value }: DeltaReserve) => {
				const get = getSnapshotGetter(snapshot)

				const deltaDisplay = contents === undefined
					? []
					: Array.isArray(contents)
						? contents
						: [contents]
				const formattedValue = formatNumber({ value })
				const healthMaximumPoisonedValue = get(healthMaximumPoisoned)
				const isAttackingValue = get(isAttacking)
				const isPositive = value > 0

				let newHealth = get(reserveCurrent("health")) + (get(isInvulnerable) ? isPositive ? value : 0 : value)

				if (newHealth <= 0) {
					newHealth = 0

					reset(regenerationDuration("health"))
					reset(regenerationDuration("stamina"))
					reset(recoveryDuration)

					progressQuest({ quest: "flatlining" })

					if (isAttackingValue) {
						toggleAttacking()
					}

					if (get(ownedItem("phylactery")) === undefined) {
						set(corpse, {
							essence: Math.round(get(essence) + get(absorbedEssence) * CORPSE_VALUE),
							stage: get(stage),
						})
					}
				}

				if (newHealth >= healthMaximumPoisonedValue) {
					newHealth = healthMaximumPoisonedValue

					reset(regenerationDuration("health"))
				}

				if (
					!isPositive
					&& newHealth > 0
					&& newHealth <= healthMaximumPoisonedValue * HEALTH_LOW_THRESHOLD
					&& isAttackingValue
					&& get(isRelicEquipped("dream catcher"))
				) {
					animateElement({
						animation: "heartBeat",
						element: get(protectedElement),
					})

					const ownedBandages = get(ownedItem("bandages"))

					if (ownedBandages === undefined) {
						toggleAttacking()
					}
					else {
						mending("health", ownedBandages.ID)
						return
					}
				}

				set(reserveCurrent("health"), newHealth)

				if (value !== 0) {
					deltaDisplay.push({
						color: isPositive ? "text-success" : "text-danger",
						value: isPositive ? `+${formattedValue}` : formattedValue,
					})
				}

				addDelta({
					contents: deltaDisplay,
					delta: "health",
				})
			},
		[addDelta, mending, progressQuest, toggleAttacking],
	)
}
