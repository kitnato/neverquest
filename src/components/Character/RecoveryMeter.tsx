import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { recoveryRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useAnimation((delta) => {
    setDeltaRecovery((current) => current + delta);
  }, !isRecoveringValue);

  useEffect(() => {
    if (deltaRecovery >= recoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    }
  }, [deltaRecovery, recoveryRateValue, setRecovering]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(recoveryRateValue - deltaRecovery)}
      value={(deltaRecovery / recoveryRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
