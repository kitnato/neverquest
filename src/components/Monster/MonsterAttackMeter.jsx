import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import useDefend from "hooks/useDefend";
import { isAttacking } from "state/character";
import {
  currentHealthMonster,
  isEngaged,
  totalAttackRateMonster,
} from "state/monster";
import formatCountdown from "utilities/formatCountdown";

export default function MonsterAttackMeter() {
  const defend = useDefend();
  const isAttackingValue = useRecoilValue(isAttacking);
  const isEngagedValue = useRecoilValue(isEngaged);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);
  const resetCurrentHealthMonster = useResetRecoilState(currentHealthMonster);

  const [deltaAttack, setDeltaAttack] = useState(0);

  useEffect(() => {
    if (deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [defend, deltaAttack, totalAttackRateMonsterValue]);

  useEffect(() => {
    if (!isAttackingValue) {
      resetCurrentHealthMonster();
      setDeltaAttack(0);
    }
  }, [isAttackingValue, resetCurrentHealthMonster]);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isAttackingValue || !isEngagedValue);

  return (
    <Progress
      label={formatCountdown(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant="warning"
    />
  );
}
