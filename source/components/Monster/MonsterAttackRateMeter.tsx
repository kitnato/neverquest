import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import {
  isMonsterAiling,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterAttackRateMeter() {
  const monsterAttackDurationValue = useRecoilValue(monsterAttackDuration);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterFrozen}
      value={
        ((monsterAttackDurationValue === 0
          ? 0
          : monsterAttackRateValue - monsterAttackDurationValue) /
          monsterAttackRateValue) *
        PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      <Stack direction="horizontal" gap={1}>
        <span>
          {formatNumber({
            format: "time",
            value: monsterAttackDurationValue || monsterAttackRateValue,
          })}
        </span>

        {isMonsterFrozen && (
          <span>
            {` (${formatNumber({
              decimals: 0,
              format: "percentage",
              value: AILMENT_PENALTY.frozen,
            })})`}
          </span>
        )}
        <DeltasDisplay delta="monsterAttackRate" />
      </Stack>
    </LabelledProgressBar>
  );
}
