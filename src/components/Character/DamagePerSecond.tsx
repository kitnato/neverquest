import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { damagePerSecond } from "@neverquest/state/statistics";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(isShowing(ShowingType.DamagePerSecond));

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={damagePerSecondValue}
      Icon={Icon}
      isAnimated
      tooltip="Damage per second (DPS)"
    />
  );
}
