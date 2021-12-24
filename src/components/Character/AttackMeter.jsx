import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import useAttack from "hooks/useAttack";
import { isAttacking, isRecovering } from "state/character";
import { totalAttackRate } from "state/stats";
import formatCountdown from "utilities/formatCountdown";

export default function AttackMeter() {
  const attack = useAttack();
  const totalAttackRateValue = useRecoilValue(totalAttackRate);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= totalAttackRateValue) {
      setDeltaAttack(0);
      attack();
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttackingValue || isRecoveringValue);

  useEffect(() => {
    // Reset meter if attacks stop for whatever reason.
    if (deltaAttack > 0 && !isAttackingValue) {
      setDeltaAttack(0);
    }
  }, [deltaAttack, isAttackingValue]);

  return (
    <Progress
      label={formatCountdown(totalAttackRateValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant="warning"
    />
  );
}
