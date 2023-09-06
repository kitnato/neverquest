import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatTime } from "@neverquest/utilities/formatters";

export function MonsterStaggeredMeter() {
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const monsterStaggerDurationValue = useRecoilValue(monsterAilmentDuration("staggered"));
  const mightValue = useRecoilValue(masteryStatistic("might"));

  const staggeringProgress = mightValue - monsterStaggerDurationValue;

  return (
    <LabelledProgressBar
      disableTransitions
      label={isMonsterStaggeredValue ? formatTime(staggeringProgress) : LABEL_EMPTY}
      value={isMonsterStaggeredValue ? (staggeringProgress / mightValue) * 100 : 0}
      variant="secondary"
    />
  );
}
