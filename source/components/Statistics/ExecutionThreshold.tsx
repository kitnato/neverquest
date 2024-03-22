import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_EMPTY } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconExecution from "@neverquest/icons/execution.svg?react"
import { executionThreshold } from "@neverquest/state/statistics"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function ExecutionThreshold() {
	const executionValue = useRecoilValue(executionThreshold)

	useDeltaText({
		delta: "executionThreshold",
		format: "percentage",
		state: executionThreshold,
	})

	if (executionValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconExecution}
				tooltip="Execution threshold"
			>
				<Stack direction="horizontal" gap={1}>
					<span>
						{executionValue === 0
							? LABEL_EMPTY
							: formatNumber({ format: "percentage", value: executionValue })}
					</span>

					<DeltasDisplay delta="executionThreshold" />
				</Stack>
			</IconDisplay>
		)
	}
}
