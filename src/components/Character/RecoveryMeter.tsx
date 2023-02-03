import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { recoveryDuration } from "@neverquest/state/character";
import { recoveryRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function RecoveryMeter() {
  const [recoveryDurationValue, setRecoveryDuration] = useRecoilState(recoveryDuration);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  const hasRecovered = recoveryDurationValue === 0;

  useAnimation((delta) => {
    setRecoveryDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, hasRecovered);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(recoveryDurationValue || recoveryRateValue)}
      value={
        ((hasRecovered ? 0 : recoveryRateValue - recoveryDurationValue) / recoveryRateValue) * 100
      }
      variant={UIVariant.Secondary}
    />
  );
}
