import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { ReactComponent as IconStaggered } from "@neverquest/icons/monster-staggered.svg";
import { monsterStaggerDuration } from "@neverquest/state/monster";

export function MonsterStaggered() {
  const monsterStaggerDurationValue = useRecoilValue(monsterStaggerDuration);

  if (monsterStaggerDurationValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={<MonsterStaggeredMeter />}
      Icon={IconStaggered}
      isAnimated
      tooltip="Staggered"
    />
  );
}
