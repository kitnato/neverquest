import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering, totalRecoveryRate } from "state/character";
import formatCountdown from "utilities/formatCountdown";

export default function RecoveryMeter() {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const recoveryRateValue = useRecoilValue(totalRecoveryRate);
  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaRecovery >= recoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    } else {
      setDeltaRecovery(deltaRecovery + deltaTime);
    }
  }, !isRecoveringValue);

  useEffect(() => {
    if (!isRecoveringValue && deltaRecovery > 0) {
      setDeltaRecovery(0);
    }
  }, [deltaRecovery, isRecoveringValue]);

  return (
    <Progress
      label={
        isRecoveringValue
          ? formatCountdown(recoveryRateValue - deltaRecovery)
          : "--"
      }
      value={(deltaRecovery / recoveryRateValue) * 100}
      variant="warning"
    />
  );
}
