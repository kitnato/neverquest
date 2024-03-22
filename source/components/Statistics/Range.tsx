import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_EMPTY } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react"
import IconRange from "@neverquest/icons/range.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import { weapon } from "@neverquest/state/gear"
import { masteryStatistic } from "@neverquest/state/masteries"
import { range } from "@neverquest/state/statistics"
import type { Ranged } from "@neverquest/types"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Range() {
	const marksmanshipValue = useRecoilValue(masteryStatistic("marksmanship"))
	const rangeValue = useRecoilValue(range)
	const weaponValue = useRecoilValue(weapon)

	useDeltaText({
		delta: "range",
		format: "time",
		state: range,
	})

	if (rangeValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconRange}
				tooltip="Range"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<tr>
											<td>
												<IconDisplay Icon={IconRanged} iconProps={{ className: "small" }}>
													<span>Weapon:</span>
												</IconDisplay>
											</td>

											<td>
												<span>
													{formatNumber({ format: "time", value: (weaponValue as Ranged).range })}
												</span>
											</td>
										</tr>

										<tr>
											<td>
												<IconDisplay Icon={IconMarksmanship} iconProps={{ className: "small" }}>
													<span>Marksmanship:</span>
												</IconDisplay>
											</td>

											<td>
												<span>
													+
													{formatNumber({
														format: "percentage",
														value: marksmanshipValue,
													})}
												</span>
											</td>
										</tr>
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
					>
						<span>
							{rangeValue === 0 ? LABEL_EMPTY : formatNumber({ format: "time", value: rangeValue })}
						</span>
					</OverlayTrigger>

					<DeltasDisplay delta="range" />
				</Stack>
			</IconDisplay>
		)
	}
}
