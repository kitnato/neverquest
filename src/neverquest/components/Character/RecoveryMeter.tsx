import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env.d";
import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import { totalRecoveryRate } from "neverquest/state/stats";
import formatCountdown from "neverquest/utilities/formatCountdown";

export default function RecoveryMeter() {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const recoveryRateValue = useRecoilValue(totalRecoveryRate);
  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useAnimation((deltaTime) => {
    setDeltaRecovery((currentDelta) => currentDelta + deltaTime);
  }, !isRecoveringValue);

  useEffect(() => {
    if (deltaRecovery >= recoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    }
  }, [deltaRecovery, recoveryRateValue, setRecovering]);

  return (
    <Progress
      label={formatCountdown(recoveryRateValue - deltaRecovery)}
      value={(deltaRecovery / recoveryRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
