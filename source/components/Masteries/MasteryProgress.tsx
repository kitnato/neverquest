import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { MASTERIES } from "@neverquest/data/masteries"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { isMasteryAtMaximum, masteryCost, masteryProgress } from "@neverquest/state/masteries"

import type { Delta, Mastery } from "@neverquest/types/unions"

export function MasteryProgress({ mastery }: { mastery: Mastery }) {
	const masteryProgressState = masteryProgress(mastery)
	const isMasteryAtMaximumValue = useRecoilValue(isMasteryAtMaximum(mastery))
	const masteryCostValue = useRecoilValue(masteryCost(mastery))
	const masteryProgressValue = useRecoilValue(masteryProgressState)

	const { instructionIcons, instructions } = MASTERIES[mastery]
	const delta: Delta = `${mastery}Progress`

	useDeltaText({
		delta,
		ignoreZero: true,
		state: masteryProgressState,
	})

	return (
		<OverlayTrigger
			overlay={(
				<Popover>
					<PopoverBody>
						<DescriptionDisplay description={instructions} descriptionIcons={instructionIcons} />
					</PopoverBody>
				</Popover>
			)}
		>
			<div className="w-100">
				<LabelledProgressBar
					value={
						isMasteryAtMaximumValue
							? PERCENTAGE
							: (masteryProgressValue / masteryCostValue) * PERCENTAGE
					}
					variant="secondary"
				>
					<Stack direction="horizontal" gap={1}>
						{isMasteryAtMaximumValue
							? <BadgeMaximum />
							: (
								<span>
									{`${masteryProgressValue} / ${masteryCostValue}`}
								</span>
							)}

						<DeltasDisplay delta={delta} />
					</Stack>
				</LabelledProgressBar>
			</div>
		</OverlayTrigger>
	)
}
