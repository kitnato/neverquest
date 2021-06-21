import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { engaged, level } from "state/atoms";
import { damageTaken } from "state/character/atoms";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function Attack() {
  const levelValue = useRecoilValue(level);
  const engagedValue = useRecoilValue(engaged);
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
  }, !canAttack || !engagedValue);

  useEffect(() => () => setCanAttack(false), []);

  return (
    <Progress
      variant="warning"
      value={(deltaAttack / attackSpeedValue) * 100}
      label={
        engagedValue
          ? formatCountdown(attackSpeedValue - deltaAttack)
          : "Lurking"
      }
    />
  );
}
