import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isMonsterStaggered, monsterStaggeredDuration } from "@neverquest/state/monster";
import { staggerDuration } from "@neverquest/state/statistics";

import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterStaggeredMeter() {
  const [monsterStaggeredDurationValue, setMonsterStaggeredDuration] =
    useRecoilState(monsterStaggeredDuration);
  const isMonsterStaggeredValue = useRecoilValue(isMonsterStaggered);
  const staggerDurationValue = useRecoilValue(staggerDuration);

  const staggeringProgress = staggerDurationValue - monsterStaggeredDurationValue;

  useAnimation((delta) => {
    setMonsterStaggeredDuration((current) => {
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
      label={formatMilliseconds(staggeringProgress)}
      value={(staggeringProgress / staggerDurationValue) * 100}
      variant="secondary"
    />
  );
}
