import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering } from "state/character";
import { totalRecoveryRate } from "state/stats";
import formatCountdown from "utilities/formatCountdown";

export default function RecoveryMeter() {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const recoveryRateValue = useRecoilValue(totalRecoveryRate);
  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useEffect(() => {
    if (deltaRecovery >= recoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    }
  }, [deltaRecovery, recoveryRateValue, setRecovering]);

  useAnimation((deltaTime) => {
    setDeltaRecovery((currentDelta) => currentDelta + deltaTime);
  }, !isRecoveringValue);

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
