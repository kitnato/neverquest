import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ArmorBurdenDisplay } from "@neverquest/components/Statistics/ArmorBurdenDisplay"
import { ATTRIBUTES } from "@neverquest/data/attributes"
import { NUDIST } from "@neverquest/data/traits"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconAgility from "@neverquest/icons/agility.svg?react"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconNudist from "@neverquest/icons/nudist.svg?react"
import { attributeStatistic } from "@neverquest/state/attributes"
import { armor, armorBurden } from "@neverquest/state/gear"
import { healthMaximumPoisoned } from "@neverquest/state/reserves"
import { dodgeChance } from "@neverquest/state/statistics"
import { isTraitEarned } from "@neverquest/state/traits"
import { isUnarmored } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function DodgeChance() {
	const armorValue = useRecoilValue(armor)
	const armorBurdenValue = useRecoilValue(armorBurden)
	const agility = useRecoilValue(attributeStatistic("agility"))
	const dodgeChanceValue = useRecoilValue(dodgeChance)
	const healthMaximumPoisonedValue = useRecoilValue(healthMaximumPoisoned)
	const isTraitEarnedNudist = useRecoilValue(isTraitEarned("nudist"))
	const { dodgeBonus, healAmount } = NUDIST
	const formattedDodgeChance = formatNumber({ format: "percentage", value: dodgeChanceValue })

	useDeltaText({
		delta: "dodgeChance",
		format: "percentage",
		state: dodgeChance,
	})

	if (dodgeChanceValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconDodgeChance}
				tooltip="Dodge chance"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<tr>
											<td>
												<IconDisplay Icon={IconAgility} iconProps={{ className: "small" }}>
													<span>Agility:</span>
												</IconDisplay>
											</td>

											<td>
												<Stack direction="horizontal" gap={1}>
													<span>
														{formatNumber({
															format: "percentage",
															value: agility,
														})}
													</span>
												</Stack>
											</td>
										</tr>

										{isTraitEarnedNudist && isUnarmored(armorValue) && (
											<tr>
												<td>
													<IconDisplay Icon={IconNudist} iconProps={{ className: "small" }}>
														<span>Nudist:</span>
													</IconDisplay>
												</td>

												<td>
													<Stack gap={1}>
														<span>
															{formatNumber({
																format: "multiplier",
																value: dodgeBonus,
															})}
														</span>

														<IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
															<span>
																+
																{formatNumber({ value: healthMaximumPoisonedValue * healAmount })}
															</span>
														</IconDisplay>
													</Stack>
												</td>
											</tr>
										)}

										{armorBurdenValue > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
														<span>On dodge:</span>
													</IconDisplay>
												</td>

												<td>
													<ArmorBurdenDisplay />
												</td>
											</tr>
										)}
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
					>
						<Stack direction="horizontal" gap={1}>
							<span>{formattedDodgeChance}</span>

							{dodgeChanceValue >= (ATTRIBUTES.agility.maximum ?? Number.POSITIVE_INFINITY) && <BadgeMaximum />}
						</Stack>
					</OverlayTrigger>

					<DeltasDisplay delta="dodgeChance" />
				</Stack>
			</IconDisplay>
		)
	}

	return null
}
