import { useRecoilCallback } from "recoil"

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { isAttacking } from "@neverquest/state/character"
import { shield, weapon } from "@neverquest/state/gear"
import { ownedItem } from "@neverquest/state/inventory"
import { isRelicEquipped } from "@neverquest/state/items"
import {
	isInexhaustible,
	protectedElement,
	regenerationDuration,
	reserveCurrent,
	staminaMaximumBlighted,
} from "@neverquest/state/reserves"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"
import { animateElement } from "@neverquest/utilities/helpers"

import type { DeltaReserve } from "@neverquest/types/ui"

export function useChangeStamina() {
	const addDelta = useAddDelta()
	const mending = useMending()
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
				const isPositive = value > 0
				const staminaMaximumBlightedValue = get(staminaMaximumBlighted)

				let newStamina = get(reserveCurrent("stamina")) + (get(isInexhaustible) ? isPositive ? value : 0 : value)

				if (newStamina <= 0) {
					newStamina = 0
				}

				if (newStamina >= staminaMaximumBlightedValue) {
					newStamina = staminaMaximumBlightedValue

					reset(regenerationDuration("stamina"))
				}

				if (
					!isPositive
					&& (newStamina < get(shield).burden || newStamina < get(weapon).burden)
					&& get(isAttacking)
					&& get(isRelicEquipped("dream catcher"))
				) {
					animateElement({
						animation: "heartBeat",
						element: get(protectedElement),
					})

					const ownedElixir = get(ownedItem("elixir"))

					if (ownedElixir === undefined) {
						toggleAttacking()
					}
					else {
						mending("stamina", ownedElixir.ID)
						return
					}
				}

				set(reserveCurrent("stamina"), newStamina)

				if (value !== 0) {
					deltaDisplay.push({
						color: isPositive ? "text-success" : "text-danger",
						value: isPositive ? `+${formattedValue}` : formattedValue,
					})
				}

				addDelta({
					contents: deltaDisplay,
					delta: "stamina",
				})
			},
		[addDelta, mending, toggleAttacking],
	)
}
