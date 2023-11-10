import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import {
  isMonsterAiling,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";

import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const monsterAttackDurationValue = useRecoilValue(monsterAttackDuration);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterStaggered}
      value={
        ((monsterAttackDurationValue === 0
          ? 0
          : monsterAttackRateValue - monsterAttackDurationValue) /
          monsterAttackRateValue) *
        100
      }
      variant="secondary"
    >
      {formatNumber({
        format: "time",
        value: monsterAttackDurationValue || monsterAttackRateValue,
      })}
    </LabelledProgressBar>
  );
}
