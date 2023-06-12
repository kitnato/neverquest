import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isMonsterStaggered, monsterStaggerDuration } from "@neverquest/state/monster";
import { staggerDuration } from "@neverquest/state/statistics";

import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterStaggeredMeter() {
  const [monsterStaggerDurationValue, setMonsterStaggerDuration] =
    useRecoilState(monsterStaggerDuration);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const staggerDurationValue = useRecoilValue(staggerDuration);

  const isStaggered = monsterStaggerDurationValue > 0;
  const staggeringProgress = staggerDurationValue - monsterStaggerDurationValue;

  useAnimation((delta) => {
    setMonsterStaggerDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, !isMonsterStaggeredValue);

  return (
    <LabelledProgressBar
      disableTransitions
      label={isStaggered ? formatMilliseconds(staggeringProgress) : LABEL_EMPTY}
      value={isStaggered ? (staggeringProgress / staggerDurationValue) * 100 : 0}
      variant="secondary"
    />
  );
}
