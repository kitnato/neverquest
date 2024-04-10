import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { ProgressMeter } from "@neverquest/components/Encounter/ProgressMeter"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMonsterReduction from "@neverquest/icons/monster-reduction.svg?react"
import IconProgress from "@neverquest/icons/progress.svg?react"
import { location, progress, progressMaximum, retirementStage } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getPerkEffect } from "@neverquest/utilities/getters"

export function Progress() {
	const locationValue = useRecoilValue(location)
	const retirementStageValue = useRecoilValue(retirementStage)

	const monsterReduction = getPerkEffect({ perk: "monsterReduction", stage: retirementStageValue })

	useDeltaText({
		delta: "progress",
		ignoreZero: true,
		state: progress,
	})

	useDeltaText({
		delta: "progressMaximum",
		state: progressMaximum,
	})

	if (locationValue === "wilderness") {
		return (
			<IconDisplay
				className="w-100"
				Icon={IconProgress}
				iconProps={{ overlayPlacement: "bottom" }}
				tooltip="Progress"
			>
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverHeader className="text-center">
								<span>Monster reduction</span>
							</PopoverHeader>

							<PopoverBody>
								<Stack className="justify-content-center" direction="horizontal" gap={1}>
									<IconDisplay
										Icon={IconMonsterReduction}
										iconProps={{ className: "small", isFlipped: true }}
										tooltip="Monster reduction"
									>
										<span>
											-
											{formatNumber({
												format: "percentage",
												value: monsterReduction,
											})}
										</span>
									</IconDisplay>
								</Stack>
							</PopoverBody>
						</Popover>
					)}
					placement="bottom"
					trigger={monsterReduction > 0 ? POPOVER_TRIGGER : []}
				>
					<div className="w-100">
						<ProgressMeter />
					</div>
				</OverlayTrigger>
			</IconDisplay>
		)
	}
}
