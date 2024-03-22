import { useState } from "react"
import {
	Button,
	DropdownButton,
	DropdownItem,
	Modal,
	ModalBody,
	ModalHeader,
	ModalTitle,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general"
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START } from "@neverquest/data/monster"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import IconBossHiding from "@neverquest/icons/boss-hiding.svg?react"
import IconCompass from "@neverquest/icons/compass.svg?react"
import IconNavigation from "@neverquest/icons/navigation.svg?react"
import { location, stage, wildernesses } from "@neverquest/state/encounter"
import { activeControl } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"

export function CompassNavigate() {
	const locationValue = useRecoilValue(location)
	const [stageValue, setStage] = useRecoilState(stage)
	const wildernessesValue = useRecoilValue(wildernesses)
	const resetActiveControl = useResetRecoilState(activeControl)

	const [isShowingNavigation, setIsShowingNavigation] = useState(false)

	const progressQuest = useProgressQuest()
	const resetWilderness = useResetWilderness()

	const canNavigate = locationValue === "wilderness"

	const stageDisplay = (currentStage: number) => {
		const stageName = wildernessesValue[currentStage - 1]

		if (stageName !== undefined) {
			return (
				<>
					<span>
						Stage&nbsp;
						{formatNumber({
							value: currentStage,
						})}
            &nbsp;
					</span>

					{currentStage >= BOSS_STAGE_START && currentStage % BOSS_STAGE_INTERVAL === 0
						? (
							<IconImage className="small" Icon={IconBossHiding} />
						)
						: (
							LABEL_SEPARATOR
						)}

					<span>
&nbsp;
						{stageName}
					</span>
				</>
			)
		}
	}

	return (
		<>
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>The needle is spinning.</span>
					</Tooltip>
				)}
				trigger={canNavigate ? [] : POPOVER_TRIGGER}
			>
				<div>
					<Button
						disabled={!canNavigate}
						onClick={() => {
							setIsShowingNavigation(true)
						}}
						variant="outline-dark"
					>
						<span>Navigate</span>
					</Button>
				</div>
			</OverlayTrigger>

			<Modal
				onHide={() => {
					setIsShowingNavigation(false)
				}}
				show={isShowingNavigation}
			>
				<ModalHeader closeButton>
					<ModalTitle>
						<IconDisplay Icon={IconCompass}>
							<span>Navigate the wilderness</span>
						</IconDisplay>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<IconDisplay Icon={IconNavigation} tooltip="Navigation">
						<DropdownButton
							onSelect={(eventKey) => {
								if (eventKey !== null) {
									progressQuest({ quest: "warpingWilderness" })

									setIsShowingNavigation(false)
									resetActiveControl()

									setStage(Number(eventKey))
									resetWilderness()
								}
							}}
							title={stageDisplay(stageValue)}
							variant="outline-dark"
						>
							{wildernessesValue.map((name, index) => {
								const stageIndex = index + 1

								return (
									<DropdownItem as="button" eventKey={stageIndex} key={name}>
										{stageDisplay(stageIndex)}
									</DropdownItem>
								)
							})}
						</DropdownButton>
					</IconDisplay>
				</ModalBody>
			</Modal>
		</>
	)
}
