import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import useAnimation from "neverquest/hooks/useAnimation";
import useDefend from "neverquest/hooks/useDefend";
import { isAttacking } from "neverquest/state/character";
import {
  currentHealthMonster,
  isMonsterDead,
  isMonsterEngaged,
  isMonsterStaggered,
  totalAttackRateMonster,
} from "neverquest/state/monster";
import { UIVariant } from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function MonsterAttackMeter() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterEngagedValue = useRecoilValue(isMonsterEngaged);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);
  const resetCurrentHealthMonster = useResetRecoilState(currentHealthMonster);

  const [deltaAttack, setDeltaAttack] = useState(0);

  const defend = useDefend();

  useAnimation((deltaTime) => {
    setDeltaAttack((currentDelta) => currentDelta + deltaTime);
  }, !isAttackingValue || isMonsterDeadValue || !isMonsterEngagedValue || isMonsterStaggeredValue);

  useEffect(() => {
    if (!isMonsterDeadValue && deltaAttack >= totalAttackRateMonsterValue) {
      setDeltaAttack(0);
      defend();
    }
  }, [deltaAttack, isMonsterDeadValue, totalAttackRateMonsterValue]);

  useEffect(() => {
    if (!isAttackingValue && !isMonsterDeadValue) {
      setDeltaAttack(0);
      resetCurrentHealthMonster();
    }
  }, [isAttackingValue, isMonsterDeadValue]);

  useEffect(() => {
    if (isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isMonsterDeadValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
