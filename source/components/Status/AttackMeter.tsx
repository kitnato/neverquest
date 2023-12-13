import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { attackDuration, canAttackOrParry } from "@neverquest/state/character";
import { attackRate } from "@neverquest/state/statistics";

import { formatNumber } from "@neverquest/utilities/formatters";

export function AttackMeter() {
  const attackDurationValue = useRecoilValue(attackDuration);
  const attackRateValue = useRecoilValue(attackRate);
  const canAttackOrParryValue = useRecoilValue(canAttackOrParry);

  return (
    <LabelledProgressBar
      disableTransitions
      value={
        ((attackDurationValue === 0 ? 0 : attackRateValue - attackDurationValue) /
          attackRateValue) *
        PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      <span>
        {canAttackOrParryValue
          ? formatNumber({ format: "time", value: attackDurationValue || attackRateValue })
          : "EXHAUSTED"}
      </span>
    </LabelledProgressBar>
  );
}
