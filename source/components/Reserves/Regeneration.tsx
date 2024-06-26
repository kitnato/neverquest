import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { RESERVES } from "@neverquest/data/reserves"
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth"
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { useTimer } from "@neverquest/hooks/useTimer"
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react"
import IconVigor from "@neverquest/icons/vigor.svg?react"
import { attributeStatistic } from "@neverquest/state/attributes"
import { isRecovering } from "@neverquest/state/character"
import {
	isIncapacitated,
	isReserveAtMaximum,
	regenerationAmount,
	regenerationDuration,
	regenerationRate,
} from "@neverquest/state/reserves"
import { isSkillTrained } from "@neverquest/state/skills"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Reserve } from "@neverquest/types/unions"

export function Regeneration({ reserve }: { reserve: Reserve }) {
	const {
		baseRegenerationRate,
		Icon,
		regeneration,
		regenerationRateDelta,
	} = RESERVES[reserve]

	const attributeStatisticVigor = useRecoilValue(
		attributeStatistic("vigor"),
	)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isRecoveringValue = useRecoilValue(isRecovering)
	const isReserveAtMaximumValue = useRecoilValue(isReserveAtMaximum(reserve))
	const isSkillTrainedCalisthenics = useRecoilValue(isSkillTrained("calisthenics"))
	const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve))
	const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve))

	const changeReserve = {
		health: useChangeHealth,
		stamina: useChangeStamina,
	}[reserve]()

	useDeltaText({
		delta: regenerationRateDelta,
		format: "time",
		state: regenerationRate(reserve),
	})

	useTimer({
		onElapsed: () => {
			changeReserve({ value: regenerationAmountValue })
		},
		setDuration: setRegenerationDuration,
		stop: isIncapacitatedValue || isRecoveringValue || isReserveAtMaximumValue,
	})

	return (
		<Stack direction="horizontal">
			<OverlayTrigger
				overlay={(
					<Popover>
						<PopoverBody>
							<DetailsTable>
								<tr>
									<td>
										<span>Base rate:</span>
									</td>

									<td>
										<IconDisplay Icon={IconRegenerationRate} iconProps={{ className: "small" }}>
											<span>{formatNumber({ format: "time", value: baseRegenerationRate })}</span>
										</IconDisplay>
									</td>
								</tr>

								{attributeStatisticVigor < 0 && (
									<tr>
										<td>
											<IconDisplay Icon={IconVigor} iconProps={{ className: "small" }}>
												<span>
													Vigor:
												</span>
											</IconDisplay>
										</td>

										<td>
											<Stack direction="horizontal" gap={1}>
												<span>
													{formatNumber({
														format: "percentage",
														value: attributeStatisticVigor,
													})}
												</span>
											</Stack>
										</td>
									</tr>
								)}

								<tr>
									<td>
										<span>Regeneration:</span>
									</td>

									<td>
										<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
											<span>
												+
												{formatNumber({ format: "percentage", value: regeneration })}
												{" "}
												(
												{formatNumber({ value: regenerationAmountValue })}
												)
											</span>
										</IconDisplay>
									</td>
								</tr>
							</DetailsTable>
						</PopoverBody>
					</Popover>
				)}
				placement="right"
				trigger={isSkillTrainedCalisthenics ? POPOVER_TRIGGER : []}
			>
				<div className="w-100">
					<RegenerationMeter reserve={reserve} />
				</div>
			</OverlayTrigger>

			<DeltasDisplay delta={regenerationRateDelta} />
		</Stack>
	)
}
