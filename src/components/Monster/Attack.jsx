import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking, level } from "state/atoms";
import { defend } from "state/selectors";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function MonsterAttack({ damagePerHit }) {
  const levelValue = useRecoilValue(level);
  const isAttacking = useRecoilValue(attacking);
  const setDefend = useSetRecoilState(defend);
  const [deltaAttack, setDeltaAttack] = useState(0);
  const [canAttack, setCanAttack] = useState(true);
  const attackSpeedValue = 2000 - 10 * levelValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDefend(getDamage(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !canAttack || !isAttacking);

  useEffect(() => () => setCanAttack(false), []);

  return (
    <Progress
      variant="warning"
      value={(deltaAttack / attackSpeedValue) * 100}
      label={
        isAttacking
          ? formatCountdown(attackSpeedValue - deltaAttack)
          : "Lurking"
      }
    />
  );
}
