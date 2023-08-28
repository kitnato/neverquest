import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterAttackDuration, monsterAttackRate } from "@neverquest/state/monster";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterAttackMeter() {
  const monsterAttackDurationValue = useRecoilValue(monsterAttackDuration);
  const monsterAttackRateValue = useRecoilValue(monsterAttackRate);

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
      variant="secondary"
    />
  );
}
