import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import useCombat from "hooks/useCombat";
import { isAttacking, isRecovering } from "state/character";
import { totalAttackRate } from "state/stats";
import formatCountdown from "utilities/formatCountdown";

export default function AttackMeter() {
  const attackRateValue = useRecoilValue(totalAttackRate);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const [deltaAttack, setDeltaAttack] = useState(0);

  const [attack] = useCombat();

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackRateValue) {
      attack();
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttackingValue || isRecoveringValue);

  useEffect(() => {
    if (!isAttackingValue && deltaAttack > 0) {
      setDeltaAttack(0);
    }
  }, [deltaAttack, isAttackingValue]);

  return (
    <Progress
      label={formatCountdown(attackRateValue - deltaAttack)}
      value={(deltaAttack / attackRateValue) * 100}
      variant="warning"
    />
  );
}
