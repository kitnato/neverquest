import { OverlayTrigger, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from "react-bootstrap"
import { CircularProgressbar } from "react-circular-progressbar"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import {
	CLASS_FULL_WIDTH_JUSTIFIED,
	LABEL_UNKNOWN,
	POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { QUEST_COMPLETION_BONUS } from "@neverquest/data/quests"
import { useCompleteQuest } from "@neverquest/hooks/actions/useCompleteQuest"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import { questProgress, questStatuses } from "@neverquest/state/quests"
import { isQuestBonus } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getQuestClass } from "@neverquest/utilities/getters"

import type { QuestData } from "@neverquest/types"
import type { Quest, QuestBonus } from "@neverquest/types/unions"

export function QuestDisplay({
	activeQuest: {
		description,
		hidden,
		progressionIndex,
		progressionMaximum,
		title,
	},
	quest,
}: {
	activeQuest: QuestData
	quest: Quest
}) {
	const questProgressValue = useRecoilValue(questProgress(quest))
	const questStatusesValue = useRecoilValue(questStatuses(quest))

	const completeQuest = useCompleteQuest()

	const previousStatus = progressionIndex > 0 && questStatusesValue.length > 1 ? questStatusesValue[progressionIndex - 1] : undefined
	const status = questStatusesValue[progressionIndex]

	if (status === undefined) {
		return
	}

	const hasCompletedQuest = isQuestBonus(status)
	const canCompleteQuest = !hasCompletedQuest && (previousStatus === undefined || isQuestBonus(previousStatus))
	const isQuestOver = hasCompletedQuest || status === "complete"
	const cappedProgress = isQuestOver
		? progressionMaximum
		: questProgressValue < 0
			? 0
			: questProgressValue
	const choiceID = `quest-completion-${quest}-${progressionMaximum}`

	return (
		<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
			<Stack
				className={`me-2${hasCompletedQuest ? " opacity-25" : ""}`}
				direction="horizontal"
				gap={3}
			>
				<CircularProgressbar
					maxValue={progressionMaximum}
					text={`${formatNumber({
						format: "abbreviated",
						value: cappedProgress,
					})}/${formatNumber({
						format: "abbreviated",
						value: progressionMaximum,
					})}`}
					value={cappedProgress}
				/>

				<Stack gap={1}>
					<span>{title}</span>

					<div className="small text-secondary">
						{hidden !== undefined && isQuestOver
							? description.replace(LABEL_UNKNOWN, hidden)
							: description}
					</div>
				</Stack>
			</Stack>

			{status !== "incomplete" && (
				<OverlayTrigger
					overlay={(
						<Tooltip>
							<span>Choose a quest reward.</span>
						</Tooltip>
					)}
					show={canCompleteQuest ? undefined : false}
					trigger={canCompleteQuest ? POPOVER_TRIGGER : []}
				>
					<ToggleButtonGroup
						className={`me-1${canCompleteQuest ? "" : " opacity-50"}`}
						name={choiceID}
						onChange={(value) => {
							completeQuest({
								bonus: value as QuestBonus,
								progression: progressionMaximum,
								quest,
							})
						}}
						type="radio"
						value={hasCompletedQuest ? status : undefined}
					>
						{[
							{ bonus: "healthBonus", Icon: IconHealth },
							{ bonus: "staminaBonus", Icon: IconStamina },
							{ bonus: "damageBonus", Icon: IconDamage },
						].map(({ bonus, Icon }) => (
							<ToggleButton
								disabled={!canCompleteQuest}
								id={`${choiceID}-${bonus}`}
								key={bonus}
								value={bonus}
								variant="outline-dark"
							>
								<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
									<span>
										+
										{formatNumber({
											decimals: 0,
											format: "percentage",
											value: QUEST_COMPLETION_BONUS[getQuestClass(quest)],
										})}
									</span>
								</IconDisplay>
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</OverlayTrigger>
			)}
		</div>
	)
}
