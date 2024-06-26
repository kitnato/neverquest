import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems"
import { BurdenDetail } from "@neverquest/components/Inventory/BurdenDetail"
import { GearComparison } from "@neverquest/components/Inventory/GearComparison"
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail"
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail"
import { type SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import IconBlockChance from "@neverquest/icons/block-chance.svg?react"
import IconStaggerChance from "@neverquest/icons/stagger-chance.svg?react"
import { shield as shieldEquipped } from "@neverquest/state/gear"
import { isSkillTrained } from "@neverquest/state/skills"
import { isShowing } from "@neverquest/state/ui"
import { isUnshielded } from "@neverquest/types/type-guards"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"

import type { Shield } from "@neverquest/types"
import type { Placement } from "react-bootstrap/esm/types"

export function ShieldName({
	overlayPlacement,
	shield,
}: {
	overlayPlacement: Placement
	shield: Shield | typeof SHIELD_NONE
}) {
	const isShowingGearClass = useRecoilValue(isShowing("gearClass"))
	const shieldEquippedValue = useRecoilValue(shieldEquipped)
	const isSkillTrainedShieldcraft = useRecoilValue(isSkillTrained("shieldcraft"))

	const { blockChance, burden, ID, level, name, staggerChance, weight } = shield
	const isShieldUnequipped = isUnshielded(shield)
	const showComparison = ID !== shieldEquippedValue.ID

	return (
		<OverlayTrigger
			overlay={(
				<Popover>
					<PopoverBody>
						<DetailsTable>
							<GearLevelDetail
								comparison={showComparison && {
									showing: "offhand",
									subtrahend: shieldEquippedValue.level,
								}}
								level={level}
							/>

							<AppliedGems gearItem={shield} />

							<tr>
								<td>
									<span>Block chance:</span>
								</td>

								<td>
									<Stack direction="horizontal" gap={1}>
										<IconDisplay Icon={IconBlockChance} iconProps={{ className: "small" }}>
											<span>{formatNumber({ format: "percentage", value: blockChance })}</span>
										</IconDisplay>

										{showComparison && (
											<GearComparison
												difference={blockChance - shieldEquippedValue.blockChance}
												showing="offhand"
											/>
										)}
									</Stack>
								</td>
							</tr>

							<tr>
								{isSkillTrainedShieldcraft
									? (
										<>
											<td>
												<span>Stagger chance:</span>
											</td>

											<td>
												<Stack direction="horizontal" gap={1}>
													<IconDisplay Icon={IconStaggerChance} iconProps={{ className: "small" }}>
														<span>{formatNumber({ format: "percentage", value: staggerChance })}</span>
													</IconDisplay>

													{showComparison && (
														<GearComparison
															difference={staggerChance - shieldEquippedValue.staggerChance}
															showing="offhand"
														/>
													)}
												</Stack>
											</td>
										</>
									)
									: (
										<td className="text-end">
											<span>{LABEL_UNKNOWN}</span>
										</td>
									)}
							</tr>

							<BurdenDetail
								burden={burden}
								comparison={showComparison && {
									showing: "offhand",
									subtrahend: shieldEquippedValue.burden,
								}}
							/>

							{!isShieldUnequipped && (
								<tr>
									{isShowingGearClass
										? (
											<>
												<td>
													<span>Class:</span>
												</td>

												<td>
													{(() => {
														const { gearClass } = shield
														const { Icon } = SHIELD_SPECIFICATIONS[gearClass]

														return (
															<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
																<span>{capitalizeAll(gearClass)}</span>
															</IconDisplay>
														)
													})()}
												</td>
											</>
										)
										: (
											<td className="text-end">
												<span>{LABEL_UNKNOWN}</span>
											</td>
										)}
								</tr>
							)}

							{!isShieldUnequipped && (
								<WeightDetail
									comparison={
										showComparison && { showing: "offhand", subtrahend: shieldEquippedValue.weight }
									}
									weight={weight}
								/>
							)}
						</DetailsTable>
					</PopoverBody>
				</Popover>
			)}
			placement={overlayPlacement}
		>
			<span>
				{name}
				&nbsp;
			</span>
		</OverlayTrigger>
	)
}
