import { useEffect } from "preact/hooks"
import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ArmorBurdenDisplay } from "@neverquest/components/Statistics/ArmorBurdenDisplay"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { TANK_PROTECTION_BONUS } from "@neverquest/data/traits"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconProtection from "@neverquest/icons/protection.svg?react"
import IconTank from "@neverquest/icons/tank.svg?react"
import { armor, shield } from "@neverquest/state/gear"
import { protection } from "@neverquest/state/statistics"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isArmor, isShield } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Protection() {
	const armorValue = useRecoilValue(armor)
	const isShowingProtection = useRecoilValue(isShowing("protection"))
	const isTraitEarnedTank = useRecoilValue(isTraitEarned("tank"))
	const protectionValue = useRecoilValue(protection)
	const shieldValue = useRecoilValue(shield)

	const progressQuest = useProgressQuest()

	const { burden, protection: armorProtection } = armorValue

	useDeltaText({
		delta: "protection",
		state: protection,
	})

	useEffect(() => {
		progressQuest({
			amount: protectionValue,
			isAbsolute: true,
			quest: "protection",
		})
	}, [progressQuest, protectionValue])

	if (isShowingProtection) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconProtection}
				tooltip="Total protection"
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
												<span>{formatNumber({ value: armorProtection })}</span>
											</td>
										</tr>

										{isArmor(armorValue) && isShield(shieldValue) && isTraitEarnedTank && (
											<tr>
												<td>
													<IconDisplay Icon={IconTank} iconProps={{ className: "small" }}>
														<span>Tank:</span>
													</IconDisplay>
												</td>

												<td>
													<span>
														+
														{formatNumber({
															format: "percentage",
															value: TANK_PROTECTION_BONUS[armorValue.gearClass],
														})}
													</span>
												</td>
											</tr>
										)}

										{burden > 0 && (
											<tr>
												<td>
													<IconDisplay Icon={IconBurden} iconProps={{ className: "small" }}>
														<span>When struck:</span>
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
						trigger={burden > 0 || isTraitEarnedTank ? POPOVER_TRIGGER : []}
					>
						<span>{formatNumber({ value: protectionValue })}</span>
					</OverlayTrigger>

					<DeltasDisplay delta="protection" />
				</Stack>
			</IconDisplay>
		)
	}

	return null
}
