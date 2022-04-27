import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import { totalRecoveryRate } from "neverquest/state/statistics";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function RecoveryMeter() {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const totalRecoveryRateValue = useRecoilValue(totalRecoveryRate);
  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useAnimation((deltaTime) => {
    setDeltaRecovery((currentDelta) => currentDelta + deltaTime);
  }, !isRecoveringValue);

  useEffect(() => {
    if (deltaRecovery >= totalRecoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    }
  }, [deltaRecovery, totalRecoveryRateValue, setRecovering]);

  return (
    <Progress
      disableTransitions
      label={formatMilliseconds(totalRecoveryRateValue - deltaRecovery)}
      value={(deltaRecovery / totalRecoveryRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
