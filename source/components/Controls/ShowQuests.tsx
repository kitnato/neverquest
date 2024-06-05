import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { DismissableScreen } from "@neverquest/components/DismissableScreen"
import { IconImage } from "@neverquest/components/IconImage"
import { Quests } from "@neverquest/components/Quests"
import IconAttention from "@neverquest/icons/attention.svg?react"
import IconQuests from "@neverquest/icons/quests.svg?react"
import { isAttacking, location } from "@neverquest/state/character"
import { ownedItem } from "@neverquest/state/inventory"
import { canCompleteQuests } from "@neverquest/state/quests"
import { isIncapacitated } from "@neverquest/state/reserves"
import { activeControl } from "@neverquest/state/ui"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function ShowQuests() {
	const [activeControlValue, setActiveControl] = useRecoilState(activeControl)
	const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"))
	const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"))
	const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"))
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const locationValue = useRecoilValue(location)
	const isAttackingValue = useRecoilValue(isAttacking)
	const ownedItemJournal = useRecoilValue(ownedItem("journal"))
	const resetActiveControl = useResetRecoilState(activeControl)

	const canCompleteQuest = canCompleteConquests || canCompleteRoutines || canCompleteTriumphs

	if (ownedItemJournal !== undefined) {
		return (
			<>
				<OverlayTrigger
					overlay={(
						<Tooltip>
							<span>Quests</span>
						</Tooltip>
					)}
				>
					<div className={getAnimationClass({ animation: "bounceIn" })}>
						<Button
							className={`position-relative${canCompleteQuest && !isIncapacitatedValue && locationValue === "caravan"
								? ` ${getAnimationClass({
									animation: "pulse",
									isInfinite: true,
								})}`
								: ""}`}
							disabled={isAttackingValue || isIncapacitatedValue}
							onClick={() => {
								setActiveControl("quests")
							}}
							variant="outline-dark"
						>
							<IconImage Icon={IconQuests} />

							{canCompleteQuest && (
								<Badge
									bg="secondary"
									className="position-absolute top-50 start-100 translate-middle"
								>
									<IconImage className="small" Icon={IconAttention} />
								</Badge>
							)}
						</Button>
					</div>
				</OverlayTrigger>

				<DismissableScreen
					hideOverflow
					isShowing={activeControlValue === "quests"}
					onClose={resetActiveControl}
					title="Quests"
				>
					<Quests />
				</DismissableScreen>
			</>
		)
	}
}
