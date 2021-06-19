import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AttackButton from "components/AttackButton";
import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { weapon } from "state/character/atoms";
import { attackSpeed, currentStamina } from "state/character/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function Attack() {
  const attackSpeedValue = useRecoilValue(attackSpeed);
  const weaponValue = useRecoilValue(weapon);
  const setStamina = useSetRecoilState(currentStamina);
  const [elapsedAttack, setAttacked] = useState(-1);
  const displayAttack = elapsedAttack > -1 ? elapsedAttack : attackSpeedValue;

  useAnimation((deltaTime) => {
    if (elapsedAttack >= attackSpeedValue) {
      setAttacked(-1);
    } else if (elapsedAttack > -1) {
      setAttacked(elapsedAttack + deltaTime);
    }
  }, elapsedAttack === -1);

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
          setAttacked(0);
        }}
      />
    </>
  );
}
