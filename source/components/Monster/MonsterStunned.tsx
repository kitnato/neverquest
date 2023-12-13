import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconStunned from "@neverquest/icons/stunned.svg?react";
import { canReceiveAilment } from "@neverquest/state/ailments";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterStunned() {
  const canReceiveAilmentStunned = useRecoilValue(canReceiveAilment("stunned"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStunned = useRecoilValue(isMonsterAiling("stunned"));
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const setMonsterStunDuration = useSetRecoilState(monsterAilmentDuration("stunned"));

  useTimerDelta({
    delta: setMonsterStunDuration,
    stop: !isMonsterStunned || isMonsterDeadValue,
  });

  if (canReceiveAilmentStunned) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconStunned}
        tooltip="Stunned"
      >
        <MonsterAilmentMeter ailment="stunned" format="integer" totalDuration={mightValue} />
      </IconDisplay>
    );
  }
}