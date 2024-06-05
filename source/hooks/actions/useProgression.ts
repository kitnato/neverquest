import { useRecoilCallback } from "recoil"

import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster"
import { progress, progressMaximum } from "@neverquest/state/character"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useProgression() {
	const generateMonster = useGenerateMonster()

	return useRecoilCallback(
		({ set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const nextProgress = get(progress) + 1

				set(progress, nextProgress)

				if (nextProgress < get(progressMaximum)) {
					generateMonster()
				}
			},
		[generateMonster],
	)
}
