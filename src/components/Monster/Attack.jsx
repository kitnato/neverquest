import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking, level } from "state/atoms";
import { damageTaken } from "state/character/atoms";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function Attack() {
  const levelValue = useRecoilValue(level);
  const isAttacking = useRecoilValue(attacking);
  const setDamageTaken = useSetRecoilState(damageTaken);
  const damagePerHit = { min: levelValue, max: levelValue + 1 };
  const attackSpeedValue = 2000 - 50 * levelValue;
  const [deltaAttack, setDeltaAttack] = useState(0);
  const [canAttack, setCanAttack] = useState(true);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDamageTaken(getDamage(damagePerHit));
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
