import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import AttackButton from "components/Character/AttackButton";
import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { attacking } from "state/atoms";
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
  const setDamageDealt = useSetRecoilState(damageDealt);
  const [{ canAttack }, setStamina] = useRecoilState(currentStamina);
  const [isAttacking, setAttacking] = useRecoilState(attacking);
  const [deltaAttack, setDeltaAttack] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDeltaAttack(0);
      if (canAttack) {
        setStamina(-weaponValue.cost);
        setDamageDealt(getDamage(dphValue));
      } else {
        setAttacking(false);
      }
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !isAttacking);

  return (
    <>
      <Progress
        variant="warning"
        value={(deltaAttack / attackSpeedValue) * 100}
        label={formatCountdown(attackSpeedValue - deltaAttack)}
        className="mb-2"
      />

      <AttackButton />
    </>
  );
}
