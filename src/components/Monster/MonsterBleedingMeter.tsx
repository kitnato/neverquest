import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { monsterBleedingDelta } from "@neverquest/state/deltas";
import { isMonsterAiling, monsterAilmentDuration } from "@neverquest/state/monster";
import { bleedTick } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function MonsterBleedingMeter() {
  const { damage, duration } = useRecoilValue(bleedTick);
  const isMonsterBleedingValue = useRecoilValue(isMonsterAiling("bleeding"));
  const monsterBleedingDurationValue = useRecoilValue(monsterAilmentDuration("bleeding"));
  const monsterBleedingDeltaValue = useRecoilValue(monsterBleedingDelta);
  const resetMonsterBleedingDelta = useResetRecoilState(monsterBleedingDelta);

  const changeMonsterHealth = useChangeMonsterHealth();

  // TODO - move to onDelta in useAnimate.
  // TODO - burning affects bleed damage taken.
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
