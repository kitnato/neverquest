import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { attackDuration, canAttackOrParry } from "@neverquest/state/character";
import { attackRate } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AttackRateMeter() {
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
      <Stack direction="horizontal" gap={1}>
        <span>
          {canAttackOrParryValue
            ? formatNumber({ format: "time", value: attackDurationValue || attackRateValue })
            : "EXHAUSTED"}
        </span>

        <DeltasDisplay delta="attackRate" />
      </Stack>
    </LabelledProgressBar>
  );
}