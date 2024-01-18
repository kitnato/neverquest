import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AilmentMeter } from "@neverquest/components/Monster/AilmentMeter";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconStaggered from "@neverquest/icons/staggered.svg?react";
import { canReceiveAilment } from "@neverquest/state/ailments";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Staggered() {
  const canReceiveAilmentStaggered = useRecoilValue(canReceiveAilment("staggered"));
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const setMonsterStaggerDuration = useSetRecoilState(monsterAilmentDuration("staggered"));

  useTimerDelta({
    delta: setMonsterStaggerDuration,
    stop: !isMonsterStaggered || isMonsterDeadValue,
  });

  if (canReceiveAilmentStaggered) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconStaggered}
        tooltip="Staggered"
      >
        <AilmentMeter ailment="staggered" totalDuration={stabilityValue} />
      </IconDisplay>
    );
  }
}
