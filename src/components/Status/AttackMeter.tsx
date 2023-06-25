import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useAnimation } from "@neverquest/hooks/useAnimation";
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

  useAnimation((delta) => {
    let newDuration = attackDurationValue - delta;

    if (newDuration <= 0) {
      attack();
      newDuration = attackRateTotalValue;
    }

    setAttackDuration(newDuration);
  }, !canAttackOrParryValue || !isAttackingValue || isLootingValue || isMonsterDeadValue || isRecoveringValue);

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
