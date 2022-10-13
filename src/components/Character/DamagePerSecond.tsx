import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecond } from "@neverquest/state/statistics";

export default function () {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  if (!isShowingDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      Icon={Icon}
      contents={damagePerSecondValue}
      isAnimated
      tooltip="Damage per second (DPS)"
    />
  );
}
