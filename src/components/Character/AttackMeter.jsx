import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isAttacking, attack, attackSpeed } from "state/character";
import formatCountdown from "utilities/formatCountdown";

export default function AttackMeter() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const setAttack = useSetRecoilState(attack);
  const isAttackingValue = useRecoilValue(isAttacking);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setAttack();
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttackingValue);

  useEffect(() => {
    if (!isAttackingValue) {
      setDeltaAttack(0);
    }
  }, [isAttackingValue]);

  return (
    <Progress
      label={formatCountdown(attackSpeedValue - deltaAttack)}
      value={(deltaAttack / attackSpeedValue) * 100}
      variant="warning"
    />
  );
}
