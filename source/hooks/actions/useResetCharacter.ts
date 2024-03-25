import { useRecoilCallback } from "recoil"

import { blacksmithOptions, fletcherOptions } from "@neverquest/state/caravan"
import { attackDuration, recoveryDuration } from "@neverquest/state/character"
import { isStageStarted, location, progress, stage } from "@neverquest/state/encounter"
import { isRelicEquipped } from "@neverquest/state/items"
import {
	blight,
	health,
	poisonDuration,
	regenerationDuration,
	stamina,
} from "@neverquest/state/reserves"
import { essence } from "@neverquest/state/resources"
import { RELIC_TYPES } from "@neverquest/types/unions"

export function useResetCharacter() {
	return useRecoilCallback(
		({ reset }) =>
			() => {
				reset(attackDuration)
				reset(blacksmithOptions)
				reset(blight)
				reset(essence)
				reset(fletcherOptions)
				reset(health)
				reset(isStageStarted)
				reset(poisonDuration)
				reset(progress)
				reset(location)
				reset(recoveryDuration)
				reset(regenerationDuration("health"))
				reset(regenerationDuration("stamina"))
				reset(stage)
				reset(stamina)

				for (const relic of RELIC_TYPES) {
					reset(isRelicEquipped(relic))
				}
			},
		[],
	)
}
