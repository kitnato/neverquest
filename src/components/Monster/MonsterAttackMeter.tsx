import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import {
  isMonsterAiling,
  monsterAttackDuration,
  monsterAttackRate,
} from "@neverquest/state/monster";

import { formatTime } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const monsterAttackDurationValue = useRecoilValue(monsterAttackDuration);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterFrozen}
      label={formatTime(monsterAttackDurationValue || monsterAttackRateValue)}
      value={
        ((monsterAttackDurationValue === 0
          ? 0
          : monsterAttackRateValue - monsterAttackDurationValue) /
          monsterAttackRateValue) *
        100
      }
      variant="secondary"
    />
  );
}
