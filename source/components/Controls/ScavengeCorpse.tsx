import { Button, OverlayTrigger, Popover, PopoverBody, PopoverHeader } from "react-bootstrap"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconCorpse from "@neverquest/icons/corpse.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { corpse, isAttacking, location, stage } from "@neverquest/state/character"
import { isIncapacitated } from "@neverquest/state/reserves"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function ScavengeCorpse() {
	const corpseValue = useRecoilValue(corpse)
	const isAttackingValue = useRecoilValue(isAttacking)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const locationValue = useRecoilValue(location)
	const stageValue = useRecoilValue(stage)
	const resetCorpse = useResetRecoilState(corpse)

	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	if (corpseValue !== undefined && !isIncapacitatedValue) {
		const { essence, stage } = corpseValue

		if (locationValue === "wilderness" && stage === stageValue) {
			return (
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverHeader className="text-center">
								<span>Scavenge corpse</span>
							</PopoverHeader>

							<PopoverBody>
								<IconDisplay
									className="justify-content-center"
									Icon={IconEssence}
									iconProps={{ className: "small" }}
								>
									<span>
										+
										{formatNumber({ value: essence })}
									</span>
								</IconDisplay>
							</PopoverBody>
						</Popover>
					)}
				>
					<div className={getAnimationClass({ animation: "bounceIn" })}>
						<Button
							className={
								isAttackingValue
									? undefined
									: getAnimationClass({ animation: "pulse", isInfinite: true })
							}
							disabled={isAttackingValue}
							onClick={() => {
								transactEssence(essence)
								progressQuest({ quest: "scavengingCorpse" })

								resetCorpse()
							}}
							variant="outline-dark"
						>
							<IconImage Icon={IconCorpse} />
						</Button>
					</div>
				</OverlayTrigger>
			)
		}
	}
}
