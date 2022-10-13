import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const shieldValue = useRecoilValue(shield);
  const showShieldValue = useRecoilValue(isShowing(ShowingType.Shield));

  if (!showShieldValue) {
    return null;
  }

  return <IconDisplay Icon={Icon} contents={shieldValue.name} isAnimated tooltip="Shield" />;
}
