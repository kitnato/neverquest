import { Button } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { Alchemist } from "@neverquest/components/Caravan/Alchemist"
import { Blacksmith } from "@neverquest/components/Caravan/Blacksmith"
import { Fletcher } from "@neverquest/components/Caravan/Fletcher"
import { Medic } from "@neverquest/components/Caravan/Medic"
import { Mercenary } from "@neverquest/components/Caravan/Mercenary"
import { Merchant } from "@neverquest/components/Caravan/Merchant"
import { Occultist } from "@neverquest/components/Caravan/Occultist"
import { Tailor } from "@neverquest/components/Caravan/Tailor"
import { Witch } from "@neverquest/components/Caravan/Witch"
import { DismissableScreen } from "@neverquest/components/DismissableScreen"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { CREW } from "@neverquest/data/caravan"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import { activeCrewMember, isHired, monologue } from "@neverquest/state/caravan"
import type { CrewMember } from "@neverquest/types/unions"
import { capitalizeAll } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function HiredCrewMember({ crewMember }: { crewMember: CrewMember }) {
	const [activeCrewMemberValue, setActiveCrewMember] = useRecoilState(activeCrewMember)
	const isHiredValue = useRecoilValue(isHired(crewMember))
	const monologueValue = useRecoilValue(monologue(crewMember))
	const resetCrewMember = useResetRecoilState(activeCrewMember)

	const Component = {
		alchemist: Alchemist,
		blacksmith: Blacksmith,
		fletcher: Fletcher,
		medic: Medic,
		mercenary: Mercenary,
		merchant: Merchant,
		occultist: Occultist,
		tailor: Tailor,
		witch: Witch,
	}[crewMember]

	if (isHiredValue) {
		const { Icon, interaction } = CREW[crewMember]

		return (
			<>
				<div
					className={`${CLASS_FULL_WIDTH_JUSTIFIED} ${getAnimationClass({ animation: "flipInX" })}`}
				>
					<IconDisplay
						description={(
							<span>
								&quot;
								{monologueValue}
								&quot;
							</span>
						)}
						Icon={Icon}
						tooltip="Crew member"
					>
						<span>{capitalizeAll(crewMember)}</span>
					</IconDisplay>

					<Button
						className="ms-2"
						onClick={() => {
							setActiveCrewMember(crewMember)
						}}
						variant="outline-dark"
					>
						<span>{interaction}</span>
					</Button>
				</div>

				<DismissableScreen
					isShowing={activeCrewMemberValue === crewMember}
					onClose={resetCrewMember}
					title={capitalizeAll(crewMember)}
				>
					<Component />
				</DismissableScreen>
			</>
		)
	}
}
