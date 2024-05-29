import { useRecoilCallback } from "recoil"

import { FINALITY_STAGE } from "@neverquest/data/monster"
import { useAdvanceCaravan } from "@neverquest/hooks/actions/useAdvanceCaravan"
import { useDefeatFinality } from "@neverquest/hooks/actions/useDefeatFinality"
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { blacksmithOptions, fletcherOptions } from "@neverquest/state/caravan"
import { canAwaken, consciousness, isAwoken, isFinalityDefeated, isStageCompleted, location, stage, stageMaximum } from "@neverquest/state/character"
import { isShowing } from "@neverquest/state/ui"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useToggleLocation() {
	const advanceCaravan = useAdvanceCaravan()
	const defeatFinality = useDefeatFinality()
	const increaseStage = useIncreaseStage()
	const resetWilderness = useResetWilderness()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			(isWarp?: boolean) => {
				const get = getSnapshotGetter(snapshot)

				const stageValue = get(stage)

				if (get(location) === "wilderness") {
					advanceCaravan()
					defeatFinality()

					if (get(canAwaken) && !isWarp) {
						set(consciousness, "vigilans")
						set(isAwoken, true)
					}

					set(isShowing("location"), true)
					set(location, "caravan")
				}
				else {
					if (get(isStageCompleted) && get(stage) === get(stageMaximum)) {
						reset(blacksmithOptions)
						reset(fletcherOptions)

						if (!(stageValue === FINALITY_STAGE["res cogitans"] && !get(isFinalityDefeated("res cogitans")))) {
							increaseStage()
						}
					}

					resetWilderness()

					set(location, "wilderness")
				}
			},
		[advanceCaravan, increaseStage, resetWilderness],
	)
}
