import { useRecoilCallback } from "recoil"

import { useAdvanceCaravan } from "@neverquest/hooks/actions/useAdvanceCaravan"
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot"
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { encounter, isAttacking, isStageCompleted } from "@neverquest/state/character"
import { isRelicEquipped } from "@neverquest/state/items"
import { itemsLoot } from "@neverquest/state/resources"
import { isFinality, isGemItem } from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useAutoProgressStage() {
	const advanceCaravan = useAdvanceCaravan()
	const collectLoot = useCollectLoot()
	const increaseStage = useIncreaseStage()
	const resetWilderness = useResetWilderness()
	const toggleAttacking = useToggleAttacking()

	return useRecoilCallback(
		({ snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const itemsLootValue = get(itemsLoot)

				if (get(isStageCompleted) && get(isAttacking)) {
					if (
						get(isRelicEquipped("automincer"))
						&& !isFinality(get(encounter))
						&& (itemsLootValue.length === 0 || itemsLootValue.every(item => isGemItem(item)))
						&& collectLoot() === "success"
					) {
						advanceCaravan()
						increaseStage()
						resetWilderness()
					}
					else {
						toggleAttacking()
					}
				}
			},
		[collectLoot, advanceCaravan, increaseStage, resetWilderness, toggleAttacking],
	)
}
