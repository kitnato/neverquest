import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { range } from "@neverquest/state/gear";
import { distance, isMonsterAiling } from "@neverquest/state/monster";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonsterDistanceMeter() {
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const distanceValue = useRecoilValue(distance);
  const rangeValue = useRecoilValue(range);

  return (
    <LabelledProgressBar
      disableTransitions
      isStriped={isMonsterStaggered}
      label={formatValue({ format: "time", value: distanceValue })}
      value={(distanceValue / rangeValue) * 100}
      variant="secondary"
    />
  );
}
