import { useRecoilCallback } from "recoil"
import { useAdvanceCaravan } from "@neverquest/hooks/actions/useAdvanceCaravan"

import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot"
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { isAttacking } from "@neverquest/state/character"
import { encounter, isStageCompleted } from "@neverquest/state/encounter"
import { isRelicEquipped } from "@neverquest/state/items"
import { itemsLoot } from "@neverquest/state/resources"
import { isFinality } from "@neverquest/types/type-guards"
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

				if (get(isStageCompleted) && get(isAttacking)) {
					if (
						get(isRelicEquipped("automincer"))
						&& !isFinality(get(encounter))
						&& get(itemsLoot).length === 0
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
