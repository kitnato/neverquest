import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterStaggeredMeter() {
  const [monsterStaggerDurationValue, setMonsterStaggerDuration] = useRecoilState(
    monsterAilmentDuration("staggered"),
  );
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const mightValue = useRecoilValue(rawMasteryStatistic("might"));

  const staggeringProgress = mightValue - monsterStaggerDurationValue;

  useAnimation({
    callback: (delta) => {
      setMonsterStaggerDuration((current) => {
        const value = current - delta;

        if (value < 0) {
          return 0;
        }

        return value;
      });
    },
    stop: !isMonsterStaggeredValue,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={isMonsterStaggeredValue ? formatMilliseconds(staggeringProgress) : LABEL_EMPTY}
      value={isMonsterStaggeredValue ? (staggeringProgress / mightValue) * 100 : 0}
      variant="secondary"
    />
  );
}
