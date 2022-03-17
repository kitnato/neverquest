import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env.d";
import useAnimation from "neverquest/hooks/useAnimation";
import useDefend from "neverquest/hooks/useDefend";
import { isAttacking } from "neverquest/state/character";
import {
  currentHealthMonster,
  isMonsterDead,
  totalAttackRateMonster,
} from "neverquest/state/monster";
import formatCountdown from "neverquest/utilities/formatCountdown";

export default function MonsterAttackMeter({ isEngaged }: { isEngaged: boolean }) {
  const defend = useDefend();
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);
  const resetCurrentHealthMonster = useResetRecoilState(currentHealthMonster);

  const [deltaAttack, setDeltaAttack] = useState(0);

  useEffect(() => {
    if (!isMonsterDeadValue && deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [defend, deltaAttack, isMonsterDeadValue, totalAttackRateMonsterValue]);

  useEffect(() => {
    if (!isMonsterDeadValue && !isAttackingValue) {
      resetCurrentHealthMonster();
      setDeltaAttack(0);
    }
  }, [isAttackingValue, isMonsterDeadValue, resetCurrentHealthMonster]);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isMonsterDeadValue]);

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, isMonsterDeadValue || !isAttackingValue || !isEngaged);

  return (
    <Progress
      label={formatCountdown(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
