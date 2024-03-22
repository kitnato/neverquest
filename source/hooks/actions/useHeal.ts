import { useRecoilCallback } from "recoil"

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth"
import { health, healthMaximumPoisoned } from "@neverquest/state/reserves"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useHeal() {
	const changeHealth = useChangeHealth()

	return useRecoilCallback(
		({ snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const healthDifference = get(healthMaximumPoisoned) - get(health)

				changeHealth({
					contents: {
						color: "text-secondary",
						value: "HEAL",
					},
					value: healthDifference,
				})
			},
		[changeHealth],
	)
}
