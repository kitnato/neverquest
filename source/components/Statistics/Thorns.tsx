import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { ACANTHACEOUS_GEM_EFFECT_BONUS } from "@neverquest/data/traits"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconAcanthaceous from "@neverquest/icons/acanthaceous.svg?react"
import IconThorns from "@neverquest/icons/thorns.svg?react"
import { powerLevel } from "@neverquest/state/attributes"
import { elementalEffects } from "@neverquest/state/gear"
import { thorns } from "@neverquest/state/statistics"
import { isTraitEarned } from "@neverquest/state/traits"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Thorns() {
	const { armor } = useRecoilValue(elementalEffects)
	const isTraitEarnedAcanthaceous = useRecoilValue(isTraitEarned("acanthaceous"))
	const powerLevelValue = useRecoilValue(powerLevel)
	const thornsValue = useRecoilValue(thorns)

	const hasElementalEffect = Object.values(armor).some(({ damage }) => damage > 0)

	useDeltaText({
		delta: "thorns",
		state: thorns,
	})

	if (thornsValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconThorns}
				tooltip="Thorns"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										{hasElementalEffect && <ElementalDetails slot="armor" />}

										{isTraitEarnedAcanthaceous && (
											<tr>
												<td>
													<IconDisplay Icon={IconAcanthaceous} iconProps={{ className: "small" }}>
														<span>Acanthaceous:</span>
													</IconDisplay>
												</td>

												<td>
													<Stack direction="horizontal" gap={1}>
														<>
															{hasElementalEffect && (
																<>
																	<span>
																		{formatNumber({
																			format: "multiplier",
																			value: ACANTHACEOUS_GEM_EFFECT_BONUS,
																		})}
																	</span>

																	{LABEL_SEPARATOR}
																</>
															)}

															<span>{`+${powerLevelValue}`}</span>
														</>
													</Stack>
												</td>
											</tr>
										)}
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
					>
						<span>{thornsValue}</span>
					</OverlayTrigger>

					<DeltasDisplay delta="thorns" />
				</Stack>
			</IconDisplay>
		)
	}
}
