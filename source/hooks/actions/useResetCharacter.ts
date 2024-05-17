import { useRecoilCallback } from "recoil"

import { blacksmithOptions, fletcherOptions } from "@neverquest/state/caravan"
import { attackDuration, recoveryDuration } from "@neverquest/state/character"
import { isStageStarted, location, progress } from "@neverquest/state/encounter"
import { isRelicEquipped } from "@neverquest/state/items"
import {
	blight,
	poisonDuration,
	regenerationDuration,
	reserveCurrent,
} from "@neverquest/state/reserves"
import { essence } from "@neverquest/state/resources"
import { RELIC_TYPES } from "@neverquest/types/unions"

export function useResetCharacter() {
	return useRecoilCallback(
		({ reset }) =>
			(resetStanding?: boolean) => {
				reset(attackDuration)
				reset(blacksmithOptions)
				reset(blight)
				reset(fletcherOptions)
				reset(poisonDuration)
				reset(recoveryDuration)
				reset(regenerationDuration("health"))
				reset(regenerationDuration("stamina"))
				reset(reserveCurrent("health"))
				reset(reserveCurrent("stamina"))

				for (const relic of RELIC_TYPES) {
					reset(isRelicEquipped(relic))
				}

				if (resetStanding) {
					reset(essence)
					reset(isStageStarted)
					reset(progress)
					reset(location)
				}
			},
		[],
	)
}
