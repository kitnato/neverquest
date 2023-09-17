import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { monsterDistance } from "@neverquest/state/monster";
import { range } from "@neverquest/state/statistics";
import { formatTime } from "@neverquest/utilities/formatters";

export function MonsterDistanceMeter() {
  const monsterDistanceValue = useRecoilValue(monsterDistance);
  const rangeValue = useRecoilValue(range);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatTime(monsterDistanceValue)}
      value={(monsterDistanceValue / rangeValue) * 100}
      variant="secondary"
    />
  );
}
