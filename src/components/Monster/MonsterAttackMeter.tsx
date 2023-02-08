import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDefend } from "@neverquest/hooks/actions/useDefend";
import { useRegenerateMonster } from "@neverquest/hooks/actions/useRegenerateMonster";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isAttacking } from "@neverquest/state/character";
import {
  isMonsterDead,
  isMonsterStaggered,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const [monsterAttackDurationValue, setMonsterAttackDuration] =
    useRecoilState(monsterAttackDuration);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);
  const resetMonsterAttackDuration = useResetRecoilState(monsterAttackDuration);

  const defend = useDefend();
  const regenerateMonster = useRegenerateMonster();

  useEffect(() => {
    if (isAttackingValue) {
      setMonsterAttackDuration(monsterAttackRateValue);
    } else {
      resetMonsterAttackDuration();

      if (!isMonsterDeadValue) {
        regenerateMonster();
      }
    }
  }, [
    isAttackingValue,
    isMonsterDeadValue,
    monsterAttackRateValue,
    regenerateMonster,
    resetMonsterAttackDuration,
    setMonsterAttackDuration,
  ]);

  useAnimation((delta) => {
    let newDuration = monsterAttackDurationValue - delta;

    if (newDuration <= 0) {
      defend();
      newDuration = monsterAttackRateValue;
    }

    setMonsterAttackDuration(newDuration);
  }, !isAttackingValue || isMonsterDeadValue || isMonsterStaggeredValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(monsterAttackDurationValue || monsterAttackRateValue)}
      value={
        ((monsterAttackDurationValue === 0
          ? 0
          : monsterAttackRateValue - monsterAttackDurationValue) /
          monsterAttackRateValue) *
        100
      }
      variant={UIVariant.Secondary}
    />
  );
}
