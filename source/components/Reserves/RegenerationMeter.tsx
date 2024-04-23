import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { REGENERATION_METER_ANIMATION_THRESHOLD, RESERVES } from "@neverquest/data/reserves"
import { isRecovering } from "@neverquest/state/character"
import {
	regenerationAmount,
	regenerationDuration,
	regenerationRate,
} from "@neverquest/state/reserves"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"

import type { Reserve } from "@neverquest/types/unions"

export function RegenerationMeter({ reserve }: { reserve: Reserve }) {
	const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve))
	const regenerationDurationValue = useRecoilValue(regenerationDuration(reserve))
	const regenerationRateValue = useRecoilValue(regenerationRate(reserve))
	const isRecoveringValue = useRecoilValue(isRecovering)

	const { Icon } = RESERVES[reserve]
	const isContinuous
		= regenerationDurationValue > 0
		&& regenerationRateValue <= REGENERATION_METER_ANIMATION_THRESHOLD
	const regenerationProgress
		= regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue

	return (
		<LabelledProgressBar
			attachment="above"
			disableTransitions
			isAnimated={isContinuous}
			isSmall
			value={
				isContinuous
					? PERCENTAGE
					: (regenerationProgress / regenerationRateValue) * PERCENTAGE
			}
			variant="secondary"
		>
			{(() => {
				if (isRecoveringValue) {
					return <span>Recovering ...</span>
				}

				if (regenerationProgress === 0) {
					return (
						<Stack>
							<span>
								{capitalizeAll(reserve)}
								{" "}
								regeneration
							</span>

							<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
								<span>
									{regenerationAmountValue}
									{" per "}
									{formatNumber({
										format: "time",
										value: regenerationRateValue,
									})}
								</span>
							</IconDisplay>
						</Stack>
					)
				}

				return (
					<Stack>
						<span>
							Regenerating
							{" "}
							{reserve}
						</span>

						<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
							<span>
								{regenerationAmountValue}
								{" in "}
								{formatNumber({
									format: "time",
									value: regenerationRateValue - regenerationProgress,
								})}
							</span>
						</IconDisplay>
					</Stack>
				)
			})()}
		</LabelledProgressBar>
	)
}
