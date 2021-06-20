import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AttackButton from "components/Character/AttackButton";
import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { damageDealt, weapon } from "state/character/atoms";
import {
  attackSpeed,
  damagePerHit,
  currentStamina,
} from "state/character/selectors";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const weaponValue = useRecoilValue(weapon);
  const dphValue = useRecoilValue(damagePerHit);
  const setStamina = useSetRecoilState(currentStamina);
  const setDamageDealt = useSetRecoilState(damageDealt);
  const [deltaAttack, setDeltaAttack] = useState(-1);
  const displayAttack = deltaAttack > -1 ? deltaAttack : attackSpeedValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDeltaAttack(-1);
    } else if (deltaAttack > -1) {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, deltaAttack === -1);

  return (
    <>
      <Progress
        variant="warning"
        value={(displayAttack / attackSpeedValue) * 100}
        label={formatCountdown(attackSpeedValue - displayAttack)}
        className="mb-2"
      />

      <AttackButton
        isRecharging={displayAttack < attackSpeedValue}
        onClick={() => {
          setStamina(-weaponValue.cost);
          setDamageDealt(getDamage(dphValue));
          setDeltaAttack(0);
        }}
      />
    </>
  );
}
