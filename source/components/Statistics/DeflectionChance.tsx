import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { DEFLECTION_MAXIMUM } from "@neverquest/data/statistics"
import { INOCULATED_DEFLECTION_BASE } from "@neverquest/data/traits"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconDeflectionChance from "@neverquest/icons/deflection-chance.svg?react"
import IconInoculated from "@neverquest/icons/inoculated.svg?react"
import { armor } from "@neverquest/state/gear"
import { deflectionChance } from "@neverquest/state/statistics"
import { isTraitEarned } from "@neverquest/state/traits"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function DeflectionChance() {
	const { deflectionChance: armorDeflectionChance } = useRecoilValue(armor)
	const deflectionChanceValue = useRecoilValue(deflectionChance)
	const isTraitEarnedInoculated = useRecoilValue(isTraitEarned("inoculated"))

	useDeltaText({
		delta: "deflectionChance",
		format: "percentage",
		state: deflectionChance,
	})

	if (deflectionChanceValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconDeflectionChance}
				tooltip="Total deflection chance"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<tr>
											<td>
												<IconDisplay Icon={IconArmor} iconProps={{ className: "small" }}>
													<span>Armor:</span>
												</IconDisplay>
											</td>

											<td>
												<IconDisplay Icon={IconDeflectionChance} iconProps={{ className: "small" }}>
													<span>{formatNumber({ format: "percentage", value: armorDeflectionChance })}</span>
												</IconDisplay>
											</td>
										</tr>

										<tr>
											<td>
												<IconDisplay Icon={IconInoculated} iconProps={{ className: "small" }}>
													<span>Inoculated:</span>
												</IconDisplay>
											</td>

											<td>
												<span>
													+
													{formatNumber({
														format: "percentage",
														value: INOCULATED_DEFLECTION_BASE,
													})}
												</span>
											</td>
										</tr>
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
						trigger={isTraitEarnedInoculated ? POPOVER_TRIGGER : []}
					>
						<span>
							{formatNumber({ format: "percentage", value: deflectionChanceValue })}
						</span>
					</OverlayTrigger>

					<DeltasDisplay delta="deflectionChance" />

					{deflectionChanceValue === DEFLECTION_MAXIMUM && <BadgeMaximum />}
				</Stack>
			</IconDisplay>
		)
	}

	return null
}
