import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { recoveryDuration } from "@neverquest/state/character";
import { recoveryRate } from "@neverquest/state/statistics";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function RecoveryMeter() {
  const [recoveryDurationValue, setRecoveryDuration] = useRecoilState(recoveryDuration);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  const hasRecovered = recoveryDurationValue === 0;

  useAnimate({
    deltas: [setRecoveryDuration],
    stop: hasRecovered,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(recoveryDurationValue || recoveryRateValue)}
      value={
        ((hasRecovered ? 0 : recoveryRateValue - recoveryDurationValue) / recoveryRateValue) * 100
      }
      variant="secondary"
    />
  );
}
