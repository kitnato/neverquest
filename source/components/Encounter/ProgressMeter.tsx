import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { LABEL_UNKNOWN, PERCENTAGE_POINTS } from "@neverquest/data/general"
import { encounter, progress, progressMaximum } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"

export function ProgressMeter() {
	const encounterValue = useRecoilValue(encounter)
	const progressValue = useRecoilValue(progress)
	const progressMaximumValue = useRecoilValue(progressMaximum)

	const isInfinite = progressMaximumValue === Number.POSITIVE_INFINITY
	const isVoid = encounterValue === "void"

	return (
		<LabelledProgressBar
			value={
				isInfinite || isVoid
					? PERCENTAGE_POINTS
					: (progressValue / progressMaximumValue) * PERCENTAGE_POINTS
			}
			variant="secondary"
		>
			{isVoid
				? LABEL_UNKNOWN
				: (
					<Stack className="text-nowrap" direction="horizontal" gap={1}>
						<span>{formatNumber({ value: progressValue })}</span>

						<DeltasDisplay delta="progress" />

						<span>
							{` / ${isInfinite ? LABEL_UNKNOWN : formatNumber({ value: progressMaximumValue })}`}
						</span>
					</Stack>
				)}
		</LabelledProgressBar>
	)
}
