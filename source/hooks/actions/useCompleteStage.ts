import { useRecoilCallback } from "recoil"

import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer"
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues"
import {
	consciousness,
	encounter,
	hasDefeatedFinality,
	isStageCompleted,
} from "@neverquest/state/encounter"
import { isFinality } from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useCompleteStage() {
	const generateMerchantOffer = useGenerateMerchantOffer()
	const setMonologues = useSetMonologues()

	return useRecoilCallback(
		({ set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				if (get(isStageCompleted)) {
					const encounterValue = get(encounter)

					generateMerchantOffer()
					setMonologues()

					if (isFinality(encounterValue)) {
						set(hasDefeatedFinality(encounterValue), true)

						if (encounterValue === "res cogitans") {
							set(consciousness, "vigilans")
						}
					}
				}
			},
		[generateMerchantOffer, setMonologues],
	)
}
