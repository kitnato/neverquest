import { useRecoilCallback } from "recoil"

import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { essenceLoot, itemsLoot } from "@neverquest/state/resources"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useCollectLoot() {
	const acquireItem = useAcquireItem()
	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const itemsLootValue = get(itemsLoot)

				transactEssence(get(essenceLoot))
				progressQuest({ quest: "looting" })

				reset(essenceLoot)

				if (itemsLootValue.length > 0) {
					const acquiredItemIDs = new Set(
						itemsLootValue.filter(item => acquireItem(item) === "success").map(({ ID }) => ID),
					)

					set(itemsLoot, currentItemsLoot =>
						currentItemsLoot.filter(({ ID }) => !acquiredItemIDs.has(ID)),
					)

					if (acquiredItemIDs.size < itemsLootValue.length) {
						return "failure"
					}
				}

				return "success"
			},
		[acquireItem, progressQuest, transactEssence],
	)
}
