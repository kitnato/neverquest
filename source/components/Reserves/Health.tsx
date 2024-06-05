import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { Regeneration } from "@neverquest/components/Reserves/Regeneration"
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { RESERVES } from "@neverquest/data/reserves"
import { useTimer } from "@neverquest/hooks/useTimer"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconQuests from "@neverquest/icons/quests.svg?react"
import IconVitality from "@neverquest/icons/vitality.svg?react"
import { attributeStatistic } from "@neverquest/state/attributes"
import { questsBonus } from "@neverquest/state/quests"
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves"
import { isShowing } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Health() {
	const attributeStatisticVitality = useRecoilValue(attributeStatistic("vitality"))
	const isPoisonedValue = useRecoilValue(isPoisoned)
	const isShowingHealth = useRecoilValue(isShowing("health"))
	const questsBonusHealth = useRecoilValue(questsBonus("healthBonus"))
	const setPoison = useSetRecoilState(poisonDuration)

	const { baseAmount } = RESERVES.health
	const vitalityBonus = attributeStatisticVitality - baseAmount

	useTimer({
		setDuration: setPoison,
		stop: !isPoisonedValue,
	})

	if (isShowingHealth) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconHealth}
				tooltip="Health"
			>
				<Stack>
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
												<span>{baseAmount}</span>
											</td>
										</tr>

										{vitalityBonus > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconVitality} iconProps={{ className: "small" }}>
														<span>Vitality:</span>
													</IconDisplay>
												</td>

												<td>
													<span>
														+
														{formatNumber({
															value: vitalityBonus,
														})}
													</span>
												</td>
											</tr>
										)}

										{questsBonusHealth > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconQuests} iconProps={{ className: "small" }}>
														<span>Quest bonus:</span>
													</IconDisplay>
												</td>

												<td>
													<IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
														<span>
															{formatNumber({
																format: "multiplier",
																value: questsBonusHealth,
															})}
														</span>
													</IconDisplay>
												</td>
											</tr>
										)}
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
						placement="right"
						trigger={questsBonusHealth > 0 || vitalityBonus > 0 ? POPOVER_TRIGGER : []}
					>
						<div className="w-100">
							<ReserveMeter reserve="health" />
						</div>
					</OverlayTrigger>

					<Regeneration reserve="health" />
				</Stack>
			</IconDisplay>
		)
	}

	return null
}
