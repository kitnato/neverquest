import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useDefend from "@neverquest/hooks/actions/useDefend";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isAttacking } from "@neverquest/state/character";
import {
  isMonsterDead,
  isMonsterStaggered,
  totalAttackRateMonster,
} from "@neverquest/state/monster";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);

  const [deltaAttack, setDeltaAttack] = useState(0);

  const defend = useDefend();

  useAnimation((delta) => {
    setDeltaAttack((current) => current + delta);
  }, !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue);

  useEffect(() => {
    if (deltaAttack >= totalAttackRateMonsterValue) {
      defend();
      setDeltaAttack(0);
    }
  }, [defend, deltaAttack, totalAttackRateMonsterValue]);

  useEffect(() => {
    if ((!isAttackingValue && !isMonsterDeadValue) || isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isAttackingValue, isMonsterDeadValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(totalAttackRateMonsterValue - deltaAttack)}
      value={(deltaAttack / totalAttackRateMonsterValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
