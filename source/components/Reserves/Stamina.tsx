import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { Regeneration } from "@neverquest/components/Reserves/Regeneration"
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { RESERVES } from "@neverquest/data/reserves"
import IconEndurance from "@neverquest/icons/endurance.svg?react"
import IconQuests from "@neverquest/icons/quests.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import { attributeStatistic } from "@neverquest/state/attributes"
import { questsBonus } from "@neverquest/state/quests"
import { isShowing } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Stamina() {
	const attributeStatisticEndurance = useRecoilValue(attributeStatistic("endurance"))
	const isShowingStamina = useRecoilValue(isShowing("stamina"))
	const questsBonusStamina = useRecoilValue(questsBonus("staminaBonus"))

	const { baseAmount } = RESERVES.stamina
	const enduranceBonus = attributeStatisticEndurance - baseAmount

	if (isShowingStamina) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconStamina}
				tooltip="Stamina"
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

										{enduranceBonus > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconEndurance} iconProps={{ className: "small" }}>
														<span>Endurance:</span>
													</IconDisplay>
												</td>

												<td>
													<span>
														+
														{formatNumber({
															value: enduranceBonus,
														})}
													</span>
												</td>
											</tr>
										)}

										{questsBonusStamina > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconQuests} iconProps={{ className: "small" }}>
														<span>Quest bonus:</span>
													</IconDisplay>
												</td>

												<td>
													<IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
														<span>
															{formatNumber({
																format: "multiplier",
																value: questsBonusStamina,
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
						trigger={enduranceBonus > 0 || questsBonusStamina > 0 ? POPOVER_TRIGGER : []}
					>
						<div className="w-100">
							<ReserveMeter reserve="stamina" />
						</div>
					</OverlayTrigger>

					<Regeneration reserve="stamina" />
				</Stack>
			</IconDisplay>
		)
	}
}
