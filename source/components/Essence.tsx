import { Card, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { perkEffect } from "@neverquest/state/character"
import { essence } from "@neverquest/state/resources"
import { isShowing } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Essence() {
	const essenceValue = useRecoilValue(essence)
	const isShowingEssence = useRecoilValue(isShowing("essence"))
	const perkEffectEssenceBonus = useRecoilValue(perkEffect("essenceBonus"))

	useDeltaText({
		delta: "essence",
		state: essence,
	})

	return (
		<Card className="border-0 px-2 py-1 overlay-modal-backdrop">
			<Stack
				className={
					isShowingEssence ? `visible ${getAnimationClass({ animation: "flipInX" })}` : "invisible"
				}
				direction="horizontal"
				gap={1}
			>
				<IconDisplay
					Icon={IconEssence}
					iconProps={{ overlayPlacement: "bottom" }}
					tooltip="Essence"
				>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverHeader className="text-center">
									<span>Essence loot bonus</span>
								</PopoverHeader>

								<PopoverBody>
									<Stack className="justify-content-center" direction="horizontal" gap={1}>
										<IconDisplay
											Icon={IconEssenceBonus}
											iconProps={{ className: "small" }}
											tooltip="Essence bonus"
										>
											<span>
												+
												{formatNumber({
													format: "percentage",
													value: perkEffectEssenceBonus,
												})}
											</span>
										</IconDisplay>
									</Stack>
								</PopoverBody>
							</Popover>
						)}
						placement="bottom"
						trigger={perkEffectEssenceBonus > 0 ? POPOVER_TRIGGER : []}
					>
						<span>{formatNumber({ value: essenceValue })}</span>
					</OverlayTrigger>
				</IconDisplay>

				<DeltasDisplay delta="essence" />
			</Stack>
		</Card>
	)
}
