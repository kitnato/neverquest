import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SHIELD_ICON } from "@neverquest/data/gear";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function Shield() {
  const isShowingShield = useRecoilValue(isShowing(ShowingType.Shield));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return <IconDisplay contents={shieldValue.name} Icon={SHIELD_ICON} isAnimated tooltip="Shield" />;
}
