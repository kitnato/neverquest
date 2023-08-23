import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { ReactComponent as IconStaggered } from "@neverquest/icons/staggered.svg";
import { canReceiveAilment } from "@neverquest/state/monster";

export function MonsterStaggered() {
  const canReceiveStaggered = useRecoilValue(canReceiveAilment("staggered"));

  if (!canReceiveStaggered) {
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
