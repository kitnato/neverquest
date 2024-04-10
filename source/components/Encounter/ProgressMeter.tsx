import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { LABEL_UNKNOWN, PERCENTAGE } from "@neverquest/data/general"
import { progress, progressMaximum } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"

export function ProgressMeter() {
	const progressValue = useRecoilValue(progress)
	const progressMaximumValue = useRecoilValue(progressMaximum)

	const isInfinite = progressMaximumValue === Number.POSITIVE_INFINITY
	const isVoid = progressMaximumValue === 0

	return (
		<LabelledProgressBar
			value={
				isInfinite || isVoid
					? PERCENTAGE
					: (progressValue / progressMaximumValue) * PERCENTAGE
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
							{`/ ${isInfinite ? LABEL_UNKNOWN : formatNumber({ value: progressMaximumValue })}`}
						</span>

						{!isInfinite && <DeltasDisplay delta="progressMaximum" />}
					</Stack>
				)}
		</LabelledProgressBar>
	)
}
