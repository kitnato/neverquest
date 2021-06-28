import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking } from "state/atoms";
import { attack, attackSpeed } from "state/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const setAttack = useSetRecoilState(attack);
  const isAttacking = useRecoilValue(attacking);
  const [deltaAttack, setDeltaAttack] = useState(0);
  const displayAttackRate = deltaAttack > 0 ? deltaAttack : attackSpeedValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setAttack();
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttacking);

  return (
    <Progress
      variant="warning"
      value={(displayAttackRate / attackSpeedValue) * 100}
      label={formatCountdown(attackSpeedValue - displayAttackRate)}
      className="mb-2"
    />
  );
}
