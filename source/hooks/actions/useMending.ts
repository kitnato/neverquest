import { useRecoilCallback } from "recoil"

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { inventory } from "@neverquest/state/inventory"
import { health, healthMaximumPoisoned, stamina, staminaMaximumBlighted } from "@neverquest/state/reserves"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Reserve } from "@neverquest/types/unions"

export function useMending() {
	const addDelta = useAddDelta()
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) =>
			(reserve: Reserve, consumableID?: string) => {
				const get = getSnapshotGetter(snapshot)

				const isHealth = reserve === "health"
				const reserveMaximumValue = get(isHealth ? healthMaximumPoisoned : staminaMaximumBlighted)

				if (consumableID !== undefined) {
					set(inventory, currentInventory =>
						currentInventory.filter(({ ID: currentItemID }) => currentItemID !== consumableID),
					)

					progressQuest({ quest: isHealth ? "bandaging" : "potions" })
				}

				set(isHealth ? health : stamina, reserveMaximumValue)

				addDelta({
					contents: [{
						color: "text-secondary",
						value: reserve === "health" ? "HEAL" : "RECOVER",
					},
					{
						color: "text-success",
						value: `+${reserveMaximumValue - get(isHealth ? health : stamina)}`,
					}],
					delta: reserve,
				})
			},
		[progressQuest],
	)
}
