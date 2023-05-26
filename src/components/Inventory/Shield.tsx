import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

export function Shield() {
  const isShowingShield = useRecoilValue(isShowing(Showing.Shield));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return <IconDisplay contents={shieldValue.name} Icon={IconShield} isAnimated tooltip="Shield" />;
}
