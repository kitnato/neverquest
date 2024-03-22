import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { RageMeter } from "@neverquest/components/Monster/RageMeter"
import { RAGE } from "@neverquest/data/monster"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react"
import IconRage from "@neverquest/icons/rage.svg?react"
import { stage } from "@neverquest/state/encounter"
import { rage } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function Rage() {
	const stageValue = useRecoilValue(stage)

	const { effect, requiredStage } = RAGE

	useDeltaText({
		delta: "rage",
		ignoreZero: true,
		state: rage,
	})

	if (stageValue >= requiredStage) {
		return (
			<IconDisplay Icon={IconRage} tooltip="Rage">
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverBody>
								<span>Once enraged,&nbsp;</span>

								<IconImage className="small" Icon={IconMonsterAttackRate} />

								<span>
                  &nbsp;attack rate is hastened by&nbsp;
									{formatNumber({ decimals: 0, format: "percentage", value: effect })}
									.
								</span>
							</PopoverBody>
						</Popover>
					)}
				>
					<div className="w-100">
						<RageMeter />
					</div>
				</OverlayTrigger>
			</IconDisplay>
		)
	}
}
