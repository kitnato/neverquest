import { useRecoilCallback } from "recoil"

import { useGenerateMerchantOffer } from "@neverquest/hooks/actions/useGenerateMerchantOffer"
import { useSetMonologues } from "@neverquest/hooks/actions/useSetMonologues"
import {
	isStageCompleted,
} from "@neverquest/state/encounter"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useAdvanceCaravan() {
	const generateMerchantOffer = useGenerateMerchantOffer()
	const setMonologues = useSetMonologues()

	return useRecoilCallback(
		({ snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				if (get(isStageCompleted)) {
					generateMerchantOffer()
					setMonologues()
				}
			},
		[generateMerchantOffer, setMonologues],
	)
}
