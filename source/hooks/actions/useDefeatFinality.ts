import { useRecoilCallback } from "recoil"

import {
	encounter,
	hasDefeatedFinality,
	isStageCompleted,
} from "@neverquest/state/encounter"
import { isFinality } from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useDefeatFinality() {
	return useRecoilCallback(
		({ set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const encounterValue = get(encounter)

				if (get(isStageCompleted) && isFinality(encounterValue)) {
					set(hasDefeatedFinality(encounterValue), true)
				}
			},
		[],
	)
}
