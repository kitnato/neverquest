import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { range } from "@neverquest/state/gear";
import { distance, isMonsterAiling } from "@neverquest/state/monster";
import { formatNumber } from "@neverquest/utilities/formatters";

export function MonsterDistanceMeter() {
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const distanceValue = useRecoilValue(distance);
  const rangeValue = useRecoilValue(range);

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterStaggered}
      value={(distanceValue / rangeValue) * 100}
      variant="secondary"
    >
      {formatNumber({ format: "time", value: distanceValue })}
    </LabelledProgressBar>
  );
}
