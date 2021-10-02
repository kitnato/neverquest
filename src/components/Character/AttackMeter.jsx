import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import {
  attack,
  isAttacking,
  isRecovering,
  totalAttackRate,
} from "state/character";
import formatCountdown from "utilities/formatCountdown";

export default function AttackMeter() {
  const attackRateValue = useRecoilValue(totalAttackRate);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const setAttack = useSetRecoilState(attack);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackRateValue) {
      setAttack();
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
