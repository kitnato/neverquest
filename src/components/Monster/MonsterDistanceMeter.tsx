import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { isMonsterAiling, monsterDistance } from "@neverquest/state/monster";
import { range } from "@neverquest/state/statistics";
import { formatTime } from "@neverquest/utilities/formatters";

export function MonsterDistanceMeter() {
  const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"));
  const monsterDistanceValue = useRecoilValue(monsterDistance);
  const rangeValue = useRecoilValue(range);

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterFrozen}
      label={formatTime(monsterDistanceValue)}
      value={(monsterDistanceValue / rangeValue) * 100}
      variant="secondary"
    />
  );
}
