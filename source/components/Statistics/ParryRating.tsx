import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { PARRY } from "@neverquest/data/statistics"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconFinesse from "@neverquest/icons/finesse.svg?react"
import IconParryAvoidance from "@neverquest/icons/parry-avoidance.svg?react"
import IconParryChance from "@neverquest/icons/parry-chance.svg?react"
import IconParryDamage from "@neverquest/icons/parry-damage.svg?react"
import IconParryRating from "@neverquest/icons/parry-rating.svg?react"
import { weapon } from "@neverquest/state/gear"
import { masteryStatistic } from "@neverquest/state/masteries"
import { parryAvoidance, parryChance, parryDamage, parryRating } from "@neverquest/state/statistics"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass, getGearIcon } from "@neverquest/utilities/getters"

export function ParryRating() {
	const finesseValue = useRecoilValue(masteryStatistic("finesse"))
	const parryAvoidanceValue = useRecoilValue(parryAvoidance)
	const parryChanceValue = useRecoilValue(parryChance)
	const parryDamageValue = useRecoilValue(parryDamage)
	const parryRatingValue = useRecoilValue(parryRating)
	const weaponValue = useRecoilValue(weapon)

	const { avoidance, avoidanceAttenuation, damage } = PARRY

	useDeltaText({
		delta: "parryRating",
		state: parryRating,
	})

	if (parryRatingValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconParryRating}
				tooltip="Parry rating"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<tr>
											<td>
												<IconDisplay
													Icon={getGearIcon(weaponValue)}
													iconProps={{ className: "small" }}
												>
													<span>Chance:</span>
												</IconDisplay>
											</td>

											<td>
												<IconDisplay Icon={IconParryChance} iconProps={{ className: "small" }}>
													<span>
														{formatNumber({ format: "percentage", value: parryChanceValue })}
													</span>
												</IconDisplay>
											</td>
										</tr>

										<tr>
											<td>
												<span>Damage reflected:</span>
											</td>

											<td>
												<Stack direction="horizontal" gap={1}>
													<IconDisplay Icon={IconParryDamage} iconProps={{ className: "small" }}>
														<span>
															{formatNumber({
																format: "percentage",
																value: parryDamageValue,
															})}
														</span>
													</IconDisplay>

													{LABEL_SEPARATOR}

													<span>
														{formatNumber({
															format: "percentage",
															value: damage,
														})}
													</span>

													<IconDisplay Icon={IconFinesse} iconProps={{ className: "small" }}>
														<span>
															+
															{formatNumber({
																format: "percentage",
																value: finesseValue,
															})}
														</span>
													</IconDisplay>
												</Stack>
											</td>
										</tr>

										<tr>
											<td>
												<span>Damage avoided:</span>
											</td>

											<td>
												<Stack direction="horizontal" gap={1}>
													<IconDisplay Icon={IconParryAvoidance} iconProps={{ className: "small" }}>
														<span>
															{formatNumber({
																format: "percentage",
																value: parryAvoidanceValue,
															})}
														</span>
													</IconDisplay>

													{LABEL_SEPARATOR}

													<span>
														{formatNumber({
															format: "percentage",
															value: avoidance,
														})}
													</span>

													<IconDisplay Icon={IconFinesse} iconProps={{ className: "small" }}>
														<span>
															+
															{formatNumber({
																format: "percentage",
																value: finesseValue * avoidanceAttenuation,
															})}
														</span>
													</IconDisplay>
												</Stack>
											</td>
										</tr>
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
					>
						<span>{formatNumber({ value: parryRatingValue })}</span>
					</OverlayTrigger>

					<DeltasDisplay delta="parryRating" />
				</Stack>
			</IconDisplay>
		)
	}
}
