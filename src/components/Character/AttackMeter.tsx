import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAttack } from "@neverquest/hooks/actions/useAttack";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { attackDuration, isAttacking, isLooting, isRecovering } from "@neverquest/state/character";
import { canAttackOrParry } from "@neverquest/state/reserves";
import { attackRateTotal } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function AttackMeter() {
  const [attackDurationValue, setAttackDuration] = useRecoilState(attackDuration);
  const attackRateTotalValue = useRecoilValue(attackRateTotal);
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLootingValue = useRecoilValue(isLooting);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const attack = useAttack();

  const attackProgress = attackDurationValue === 0 ? 0 : attackRateTotalValue - attackDurationValue;

  useAnimation((delta) => {
    let newDuration = attackDurationValue - delta;

    if (newDuration <= 0) {
      attack();
      newDuration = attackRateTotalValue;
    }

    setAttackDuration(newDuration);
  }, !canAttackOrParryValue || !isAttackingValue || isLootingValue || isRecoveringValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={canAttackOrParryValue ? formatMilliseconds(attackProgress) : "EXHAUSTED"}
      value={(attackProgress / attackRateTotalValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
