import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { bleedTick } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterBleedingMeter() {
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);
  const [monsterBleedingDeltaValue, setMonsterBleedingDelta] = useRecoilState(monsterBleedingDelta);
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] = useRecoilState(
    monsterAilmentDuration("bleeding"),
  );
  const { damage, duration } = useRecoilValue(bleedTick);
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));

  const changeMonsterHealth = useChangeMonsterHealth();

  useAnimation({
    callback: (delta) => {
      const newDelta = monsterBleedingDeltaValue + delta;

      if (newDelta >= duration) {
        changeMonsterHealth({
          delta: {
            color: "text-danger",
            value: `BLEEDING -${damage}`,
          },
          value: -damage,
        });

        resetMonsterBleedingDelta();
      } else {
        setMonsterBleedingDelta(newDelta);
      }

      setMonsterBleedingDuration((current) => {
        const value = current - delta;

        if (value < 0) {
          return 0;
        }

        return value;
      });
    },
    stop: !isMonsterBleedingValue,
  });

  return (
    <LabelledProgressBar
      disableTransitions
      label={
        isMonsterBleedingValue ? formatMilliseconds(monsterBleedingDurationValue) : LABEL_EMPTY
      }
      value={(monsterBleedingDurationValue / duration) * 100}
      variant="secondary"
    />
  );
}
