import { useState } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { Retirement } from "@neverquest/components/Retirement"
import { RETIREMENT_STAGE } from "@neverquest/data/general"
import IconRetire from "@neverquest/icons/retire.svg?react"
import { isIncapacitated } from "@neverquest/state/character"
import { location, stageMaximum } from "@neverquest/state/encounter"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Retire() {
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const locationValue = useRecoilValue(location)
	const stageMaximumValue = useRecoilValue(stageMaximum)

	const [isShowingRetirement, setIsShowingRetirement] = useState(false)

	const isShowingRetire
		= (locationValue === "caravan" && stageMaximumValue === RETIREMENT_STAGE)
		|| stageMaximumValue > RETIREMENT_STAGE

	return (
		<>
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>Retire</span>
					</Tooltip>
				)}
			>
				<div
					className={isShowingRetire ? getAnimationClass({ animation: "bounceIn" }) : "invisible"}
				>
					<Button
						disabled={isIncapacitatedValue || locationValue === "wilderness"}
						onClick={() => {
							setIsShowingRetirement(true)
						}}
						variant="outline-dark"
					>
						<IconImage Icon={IconRetire} />
					</Button>
				</div>
			</OverlayTrigger>

			<Retirement state={[isShowingRetirement, setIsShowingRetirement]} />
		</>
	)
}
