import { useRecoilCallback } from "recoil"

import { CREW } from "@neverquest/data/caravan"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { isHired } from "@neverquest/state/caravan"
import { isShowing } from "@neverquest/state/ui"
import { CREW_MEMBER_TYPES, type CrewMember } from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useHireCrewMember() {
	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	return useRecoilCallback(
		({ set, snapshot }) =>
			({ crewMember, price }: { crewMember: CrewMember, price: number }) => {
				const get = getSnapshotGetter(snapshot)

				const { shows } = CREW[crewMember]

				set(isHired(crewMember), true)
				transactEssence(-price)

				if (shows !== undefined) {
					for (const show of shows) {
						set(isShowing(show), true)
					}
				}

				progressQuest({ quest: "hiring" })

				if (
					crewMember === "blacksmith" && CREW_MEMBER_TYPES
						.filter(crewMemberType => crewMemberType !== crewMember && crewMemberType !== "merchant")
						.every(hirableCrewMember => !get(isHired(hirableCrewMember)))
				) {
					progressQuest({ quest: "hiringBlacksmithFirst" })
				}
			},
		[progressQuest],
	)
}
