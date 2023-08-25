import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { bleedTick } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterBleedingMeter() {
  const [monsterBleedingDeltaValue, setMonsterBleedingDelta] = useRecoilState(monsterBleedingDelta);
  const [monsterBleedingDurationValue, setMonsterBleedingDuration] = useRecoilState(
    monsterAilmentDuration("bleeding"),
  );
  const { damage, duration } = useRecoilValue(bleedTick);
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);

  const changeMonsterHealth = useChangeMonsterHealth();

  useAnimate({
    deltas: [setMonsterBleedingDelta, setMonsterBleedingDuration],
    stop: !isMonsterBleedingValue,
  });

  useEffect(() => {
    if (monsterBleedingDeltaValue >= duration) {
      changeMonsterHealth({
        delta: {
          color: "text-danger",
          value: `BLEEDING -${damage}`,
        },
        value: -damage,
      });

      resetMonsterBleedingDelta();
    }
  }, [changeMonsterHealth, damage, duration, monsterBleedingDeltaValue, resetMonsterBleedingDelta]);

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
