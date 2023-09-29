import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { attackDuration, canAttackOrParry } from "@neverquest/state/character";
import { attackRateTotal } from "@neverquest/state/statistics";

import { formatValue } from "@neverquest/utilities/formatters";

export function AttackMeter() {
  const attackDurationValue = useRecoilValue(attackDuration);
  const attackRateTotalValue = useRecoilValue(attackRateTotal);
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        canAttackOrParryValue
          ? formatValue({ format: "time", value: attackDurationValue || attackRateTotalValue })
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
