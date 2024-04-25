import { useRecoilCallback } from "recoil"

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { isAttacking } from "@neverquest/state/character"
import { isRelicEquipped } from "@neverquest/state/items"
import {
	isInexhaustible,
	regenerationDuration,
	stamina,
	staminaMaximumBlighted,
} from "@neverquest/state/reserves"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { DeltaReserve } from "@neverquest/types/ui"

export function useChangeStamina() {
	const addDelta = useAddDelta()
	const toggleAttacking = useToggleAttacking()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ contents, value }: DeltaReserve) => {
				const get = getSnapshotGetter(snapshot)

				const deltaDisplay
					= contents === undefined ? [] : Array.isArray(contents) ? contents : [contents]
				const formattedValue = formatNumber({ value })
				const isPositive = value > 0
				const staminaMaximumBlightedValue = get(staminaMaximumBlighted)

				let newStamina = get(stamina) + (get(isInexhaustible) ? isPositive ? value : 0 : value)

				if (newStamina <= 0) {
					newStamina = 0
				}

				if (newStamina >= staminaMaximumBlightedValue) {
					newStamina = staminaMaximumBlightedValue

					reset(regenerationDuration("stamina"))
				}

				if (
					!isPositive
					&& newStamina === 0
					&& get(isAttacking)
					&& get(isRelicEquipped("dream catcher"))
				) {
					toggleAttacking()

					addDelta({
						contents: {
							color: "text-secondary",
							value: "CAUGHT",
						},
						delta: "stamina",
					})
				}

				set(stamina, newStamina)

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
		[addDelta],
	)
}
