import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconStaggered } from "@neverquest/icons/staggered.svg";
import { masteryStatistic } from "@neverquest/state/masteries";
import {
  canReceiveAilment,
  isMonsterAiling,
  isMonsterDead,
  monsterAilmentDuration,
} from "@neverquest/state/monster";

export function MonsterStaggered() {
  const canBeStaggered = useRecoilValue(canReceiveAilment("staggered"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const setMonsterStaggerDuration = useSetRecoilState(monsterAilmentDuration("staggered"));

  useAnimate({
    delta: setMonsterStaggerDuration,
    stop: !isMonsterStaggeredValue || isMonsterDeadValue,
  });

  if (!canBeStaggered) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterAilmentMeter totalDuration={stabilityValue} type="staggered" />}
      Icon={IconStaggered}
      isAnimated
      tooltip="Staggered"
    />
  );
}
