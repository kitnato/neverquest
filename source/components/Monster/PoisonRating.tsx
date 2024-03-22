import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react"
import IconPoisonRating from "@neverquest/icons/poison-rating.svg?react"
import { poisonChance } from "@neverquest/state/monster"
import { poisonLength, poisonMagnitude } from "@neverquest/state/reserves"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function PoisonRating() {
	const poisonChanceValue = useRecoilValue(poisonChance)
	const poisonLengthValue = useRecoilValue(poisonLength)
	const poisonMagnitudeValue = useRecoilValue(poisonMagnitude)

	if (poisonChanceValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconPoisonRating}
				tooltip="Poison rating"
			>
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverBody>
								<DetailsTable>
									<tr>
										<td>
											<span>Chance:</span>
										</td>

										<td>
											<Stack direction="horizontal" gap={1}>
												<span>
													{formatNumber({ format: "percentage", value: poisonChanceValue })}
&nbsp;on
												</span>

												<IconImage className="small" Icon={IconMonsterAttackRate} />
											</Stack>
										</td>
									</tr>

									<tr>
										<td>
											<span>Effect:</span>
										</td>

										<td>
											<Stack direction="horizontal" gap={1}>
												<span>
													-
													{formatNumber({
														format: "percentage",
														value: poisonMagnitudeValue,
													})}
												</span>

												<IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
													<span>{LABEL_MAXIMUM}</span>
												</IconDisplay>
											</Stack>
										</td>
									</tr>

									<tr>
										<td>
											<span>Duration:</span>
										</td>

										<td>
											<span>{formatNumber({ format: "time", value: poisonLengthValue })}</span>
										</td>
									</tr>
								</DetailsTable>
							</PopoverBody>
						</Popover>
					)}
				>
					<span>
						{formatNumber({
							value:
                ((poisonChanceValue + poisonMagnitudeValue) * poisonLengthValue)
                / PERCENTAGE_POINTS,
						})}
					</span>
				</OverlayTrigger>
			</IconDisplay>
		)
	}
}
