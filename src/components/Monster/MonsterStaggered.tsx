import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { ReactComponent as IconStaggered } from "@neverquest/icons/staggered.svg";
import {
  canReceiveAilment,
  isMonsterAiling,
  monsterAilmentDuration,
} from "@neverquest/state/monster";

export function MonsterStaggered() {
  const canBeStaggered = useRecoilValue(canReceiveAilment("staggered"));
  const isMonsterStaggeredValue = useRecoilValue(isMonsterAiling("staggered"));
  const setMonsterStaggerDuration = useSetRecoilState(monsterAilmentDuration("staggered"));

  useAnimate({
    delta: setMonsterStaggerDuration,
    stop: !isMonsterStaggeredValue,
  });

  if (!canBeStaggered) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterStaggeredMeter />}
      Icon={IconStaggered}
      isAnimated
      tooltip="Stagger duration"
    />
  );
}
