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
	Stack,
	Tooltip,
} from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { Glitch } from "@neverquest/components/Glitch"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general"
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START, FINALITY_STAGE } from "@neverquest/data/monster"
import { useDefeatFinality } from "@neverquest/hooks/actions/useDefeatFinality"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import IconBossHiding from "@neverquest/icons/boss-hiding.svg?react"
import IconCompass from "@neverquest/icons/compass.svg?react"
import IconNavigation from "@neverquest/icons/navigation.svg?react"
import { location, stage, wildernesses } from "@neverquest/state/encounter"
import { activeControl } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"

const StageDisplay = ({ currentStage, wildernesses }: { currentStage: number, wildernesses: string[] }) => {
	const stageName = wildernesses[currentStage - 1]

	if (stageName !== undefined) {
		return (
			<Stack className="d-inline-flex" direction="horizontal" gap={1}>
				<span>
					Stage
				</span>

				<span>
					{formatNumber({ value: currentStage })}
				</span>

				{LABEL_SEPARATOR}

				{
					currentStage >= BOSS_STAGE_START
					&& currentStage % BOSS_STAGE_INTERVAL === 0
					&& (
						<IconImage className="small" Icon={IconBossHiding} />
					)
				}

				{Object.values(FINALITY_STAGE).includes(currentStage)
					? (
						<Glitch isContinuous>
							<span>
								{stageName}
							</span>
						</Glitch>
					)
					: (
						<span>
							{stageName}
						</span>
					)}
			</Stack>
		)
	}
}

export function CompassNavigate() {
	const locationValue = useRecoilValue(location)
	const [stageValue, setStage] = useRecoilState(stage)
	const wildernessesValue = useRecoilValue(wildernesses)
	const resetActiveControl = useResetRecoilState(activeControl)

	const [isShowingNavigation, setIsShowingNavigation] = useState(false)

	const defeatFinality = useDefeatFinality()
	const progressQuest = useProgressQuest()
	const resetWilderness = useResetWilderness()

	const canNavigate = locationValue === "wilderness"

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
									defeatFinality()
									progressQuest({ quest: "warpingWilderness" })

									setIsShowingNavigation(false)
									resetActiveControl()

									setStage(Number(eventKey))
									resetWilderness()
								}
							}}
							title={<StageDisplay currentStage={stageValue} wildernesses={wildernessesValue} />}
							variant="outline-dark"
						>
							{wildernessesValue.map((name, index) => {
								const stageIndex = index + 1

								return (
									<DropdownItem as="button" eventKey={stageIndex} key={name}>
										<StageDisplay currentStage={stageIndex} wildernesses={wildernessesValue} />
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
