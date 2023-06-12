import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { ReactComponent as IconStaggered } from "@neverquest/icons/monster-staggered.svg";
import { isShowing } from "@neverquest/state/isShowing";

export function MonsterStaggered() {
  const isShowingStagger = useRecoilValue(isShowing("stagger"));

  if (!isShowingStagger) {
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
