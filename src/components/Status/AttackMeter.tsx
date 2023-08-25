import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import {
  attackDuration,
  canAttackOrParry,
  isAttacking,
  isLooting,
  isRecovering,
} from "@neverquest/state/character";
import { isMonsterDead } from "@neverquest/state/monster";
import { attackRateTotal } from "@neverquest/state/statistics";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function AttackMeter() {
  const [attackDurationValue, setAttackDuration] = useRecoilState(attackDuration);
  const attackRateTotalValue = useRecoilValue(attackRateTotal);
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const attack = useAttack();

  useAnimate({
    deltas: [setAttackDuration],
    stop:
      !canAttackOrParryValue ||
      !isAttackingValue ||
      isLootingValue ||
      isMonsterDeadValue ||
      isRecoveringValue,
  });

  useEffect(() => {
    if (isAttackingValue && attackDurationValue === 0) {
      attack();
      setAttackDuration(attackRateTotalValue);
    }
  }, [attack, attackDurationValue, attackRateTotalValue, isAttackingValue, setAttackDuration]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        canAttackOrParryValue
          ? formatMilliseconds(attackDurationValue || attackRateTotalValue)
          : "EXHAUSTED"
      }
      value={
        ((attackDurationValue === 0 ? 0 : attackRateTotalValue - attackDurationValue) /
          attackRateTotalValue) *
        100
      }
      variant="secondary"
    />
  );
}
