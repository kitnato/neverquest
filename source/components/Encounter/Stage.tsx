import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconCorpse from "@neverquest/icons/corpse.svg?react"
import IconStage from "@neverquest/icons/stage.svg?react"
import { corpse, stage } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"

export function Stage() {
	const corpseValue = useRecoilValue(corpse)
	const stageValue = useRecoilValue(stage)

	useDeltaText({
		delta: "stage",
		state: stage,
	})

	return (
		<IconDisplay Icon={IconStage} iconProps={{ overlayPlacement: "bottom" }} tooltip="Stage">
			<Stack direction="horizontal" gap={1}>
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverHeader className="text-center">
								<span>
									<IconImage className="small" Icon={IconCorpse} />
                  &nbsp;Corpse location
								</span>
							</PopoverHeader>

							<PopoverBody>
								<IconDisplay
									className="justify-content-center"
									Icon={IconStage}
									iconProps={{ className: "small" }}
								>
									<span>
										{formatNumber({ value: corpseValue === undefined ? 0 : corpseValue.stage })}
									</span>
								</IconDisplay>
							</PopoverBody>
						</Popover>
					)}
					placement="right"
					trigger={corpseValue === undefined ? [] : POPOVER_TRIGGER}
				>
					<span>{formatNumber({ value: stageValue })}</span>
				</OverlayTrigger>

				<DeltasDisplay delta="stage" />
			</Stack>
		</IconDisplay>
	)
}
