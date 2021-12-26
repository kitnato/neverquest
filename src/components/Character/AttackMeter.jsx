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

  useEffect(() => {
    if (deltaAttack >= totalAttackRateValue) {
      setDeltaAttack(0);
      attack();
    }
  }, [attack, deltaAttack, totalAttackRateValue]);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isAttackingValue || isRecoveringValue);

  return (
    <Progress
      label={formatCountdown(totalAttackRateValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateValue) * 100}
      variant="warning"
    />
  );
}
