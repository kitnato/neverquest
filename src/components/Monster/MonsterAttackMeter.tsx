import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useDefend from "@neverquest/hooks/actions/useDefend";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isAttacking } from "@neverquest/state/character";
import { isMonsterDead, isMonsterStaggered, monsterAttackRate } from "@neverquest/state/monster";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);

  const [deltaAttack, setDeltaAttack] = useState(0);

  const defend = useDefend();

  useEffect(() => {
    if (deltaAttack >= monsterAttackRateValue) {
      defend();
      setDeltaAttack(0);
    }
  }, [defend, deltaAttack, monsterAttackRateValue]);

  useEffect(() => {
    if ((!isAttackingValue && !isMonsterDeadValue) || isMonsterDeadValue) {
      setDeltaAttack(0);
    }
  }, [isAttackingValue, isMonsterDeadValue]);

  useAnimation((delta) => {
    setDeltaAttack((current) => current + delta);
  }, !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterAttackRateValue - deltaAttack)}
      value={(deltaAttack / monsterAttackRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
