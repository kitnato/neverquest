import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconStunned from "@neverquest/icons/stunned.svg?react";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  canReceiveAilment,
  isMonsterAiling,
  isMonsterDead,
  monsterAilmentDuration,
} from "@neverquest/state/monster";

export function MonsterStunned() {
  const canBeStunned = useRecoilValue(canReceiveAilment("stunned"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const isMonsterStunned = useRecoilValue(isMonsterAiling("stunned"));
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const setMonsterStunDuration = useSetRecoilState(monsterAilmentDuration("stunned"));

  useAnimate({
    delta: setMonsterStunDuration,
    stop: !isMonsterStunned || isMonsterDeadValue,
  });

  if (canBeStunned) {
    return (
      <IconDisplay Icon={IconStunned} isAnimated tooltip="Stunned">
        <MonsterAilmentMeter ailment="stunned" format="integer" totalDuration={mightValue} />
      </IconDisplay>
    );
  }
}
