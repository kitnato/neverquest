import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { isRecovering, recoveryDuration } from "@neverquest/state/character"
import { recoveryRate } from "@neverquest/state/statistics"
import { formatNumber } from "@neverquest/utilities/formatters"

export function RecoveryMeter() {
  const isRecoveringValue = useRecoilValue(isRecovering)
  const recoveryDurationValue = useRecoilValue(recoveryDuration)
  const recoveryRateValue = useRecoilValue(recoveryRate)

  return (
    <LabelledProgressBar
      disableTransitions
      value={
        ((isRecoveringValue ? recoveryRateValue - recoveryDurationValue : 0) / recoveryRateValue) *
        PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      <Stack direction="horizontal" gap={1}>
        <span>
          {formatNumber({ format: `time`, value: recoveryDurationValue || recoveryRateValue })}
        </span>

        <DeltasDisplay delta="recoveryRate" />
      </Stack>
    </LabelledProgressBar>
  )
}
