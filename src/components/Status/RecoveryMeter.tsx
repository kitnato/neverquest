import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { isRecovering, recoveryDuration } from "@neverquest/state/character";
import { recoveryRate } from "@neverquest/state/statistics";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function RecoveryMeter() {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const recoveryDurationValue = useRecoilValue(recoveryDuration);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(recoveryDurationValue || recoveryRateValue)}
      value={
        ((isRecoveringValue ? recoveryRateValue - recoveryDurationValue : 0) / recoveryRateValue) *
        100
      }
      variant="secondary"
    />
  );
}
