import { useRecoilCallback } from "recoil"

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth"
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina"
import { health, healthMaximumPoisoned, stamina, staminaMaximumBlighted } from "@neverquest/state/reserves"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { DeltaReserve } from "@neverquest/types/ui"
import type { Reserve } from "@neverquest/types/unions"

export function useHealing() {
	const changeHealth = useChangeHealth()
	const changeStamina = useChangeStamina()

	return useRecoilCallback(
		({ snapshot }) =>
			(reserve: Reserve) => {
				const get = getSnapshotGetter(snapshot)

				const isHealth = reserve === "health"
				const difference = get(isHealth ? healthMaximumPoisoned : staminaMaximumBlighted) - get(isHealth ? health : stamina)
				const deltaReserve: DeltaReserve = {
					contents: {
						color: "text-secondary",
						value: reserve === "health" ? "HEAL" : "RECOVER",
					},
					value: difference,
				}

				if (isHealth) {
					changeHealth(deltaReserve)
				}
				else {
					changeStamina(deltaReserve)
				}
			},
		[changeHealth, changeStamina],
	)
}
