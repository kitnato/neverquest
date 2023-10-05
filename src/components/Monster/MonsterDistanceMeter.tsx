import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { isMonsterAiling, monsterDistance } from "@neverquest/state/monster";
import { range } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterDistanceMeter() {
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const monsterDistanceValue = useRecoilValue(monsterDistance);
  const rangeValue = useRecoilValue(range);

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterStaggered}
      label={formatValue({ format: "time", value: monsterDistanceValue })}
      value={(monsterDistanceValue / rangeValue) * 100}
      variant="secondary"
    />
  );
}
