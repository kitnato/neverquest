import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { RECOVERY_RATE } from "@neverquest/data/statistics"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { useTimer } from "@neverquest/hooks/useTimer"
import IconRecovery from "@neverquest/icons/recovery.svg?react"
import IconResilience from "@neverquest/icons/resilience.svg?react"
import { isIncapacitated, isRecovering, recoveryDuration } from "@neverquest/state/character"
import { masteryStatistic } from "@neverquest/state/masteries"
import { recoveryRate } from "@neverquest/state/statistics"
import { isShowing } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Recovery() {
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isRecoveringValue = useRecoilValue(isRecovering)
	const isShowingRecovery = useRecoilValue(isShowing("recovery"))
	const resilienceValue = useRecoilValue(masteryStatistic("resilience"))
	const setRecoveryDuration = useSetRecoilState(recoveryDuration)

	useTimer({
		setDuration: setRecoveryDuration,
		stop: isIncapacitatedValue || !isRecoveringValue,
	})

	useDeltaText({
		delta: "recoveryRate",
		format: "time",
		state: recoveryRate,
	})

	if (isShowingRecovery) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconRecovery}
				tooltip="Recovery rate"
			>
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverBody>
								<DetailsTable>
									<tr>
										<td>
											<span>Base:</span>
										</td>

										<td>
											<IconDisplay Icon={IconRecovery} iconProps={{ className: "small" }}>
												<span>{formatNumber({ format: "time", value: RECOVERY_RATE })}</span>
											</IconDisplay>
										</td>
									</tr>

									<tr>
										<td>
											<IconDisplay Icon={IconResilience} iconProps={{ className: "small" }}>
												<span>Resilience:</span>
											</IconDisplay>
										</td>

										<td>
											<span>
												-
												{formatNumber({
													format: "percentage",
													value: resilienceValue,
												})}
											</span>
										</td>
									</tr>
								</DetailsTable>
							</PopoverBody>
						</Popover>
					)}
					trigger={resilienceValue > 0 ? POPOVER_TRIGGER : []}
				>
					<div className="w-100">
						<RecoveryMeter />
					</div>
				</OverlayTrigger>
			</IconDisplay>
		)
	}
}
