import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import useDefend from "neverquest/hooks/useDefend";
import { isAttacking } from "neverquest/state/character";
import {
  currentHealthMonster,
  isMonsterDead,
  isMonsterEngaged,
  totalAttackRateMonster,
} from "neverquest/state/monster";
import { formatCountdown } from "neverquest/utilities/helpers";

export default function MonsterAttackMeter() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);
  const resetCurrentHealthMonster = useResetRecoilState(currentHealthMonster);
  const [deltaAttack, setDeltaAttack] = useState(0);

  const defend = useDefend();

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isAttackingValue || isMonsterDeadValue || !isMonsterEngagedValue);

  useEffect(() => {
    if (!isMonsterDeadValue && deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [defend, deltaAttack, isMonsterDeadValue, totalAttackRateMonsterValue]);

  useEffect(() => {
    if (!isMonsterDeadValue && !isAttackingValue) {
      setDeltaAttack(0);
      resetCurrentHealthMonster();
    }
  }, [isAttackingValue, isMonsterDeadValue, resetCurrentHealthMonster]);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isMonsterDeadValue]);

  return (
    <Progress
      label={formatCountdown(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
