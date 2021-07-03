import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking } from "state/atoms";
import { attack, attackSpeed } from "state/selectors";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const setAttack = useSetRecoilState(attack);
  const isAttacking = useRecoilValue(attacking);
  const [deltaAttack, setDeltaAttack] = useState(0);

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
      attached="above"
      size="tiny"
      value={(deltaAttack / attackSpeedValue) * 100}
      variant="info"
    />
  );
}
