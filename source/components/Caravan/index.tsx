import { Card, CardBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { HirableCrewMember } from "@neverquest/components/Caravan/HirableCrewMember"
import { HiredCrewMember } from "@neverquest/components/Caravan/HiredCrewMember"
import { isCaravanHired } from "@neverquest/state/caravan"
import { isShowing } from "@neverquest/state/ui"
import { CREW_MEMBER_TYPES } from "@neverquest/types/unions"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Caravan() {
	const isCaravanHiredValue = useRecoilValue(isCaravanHired)
	const isShowingCrewMemberHiring = useRecoilValue(isShowing("crewMemberHiring"))

	const showHiring = isShowingCrewMemberHiring && !isCaravanHiredValue

	return (
		<Card className={getAnimationClass({ animation: "zoomIn", speed: "fast" })}>
			<CardBody>
				<Stack gap={5}>
					<Stack gap={3}>
						{showHiring && <h6>Hired crew</h6>}

						{CREW_MEMBER_TYPES.map((crewMember, index) => (
							<HiredCrewMember crewMember={crewMember} key={index} />
						))}
					</Stack>

					{showHiring && (
						<Stack gap={3}>
							<h6>Crew for hire</h6>

							{CREW_MEMBER_TYPES.map((crewMember, index) => (
								<HirableCrewMember crewMember={crewMember} key={index} />
							))}
						</Stack>
					)}
				</Stack>
			</CardBody>
		</Card>
	)
}
