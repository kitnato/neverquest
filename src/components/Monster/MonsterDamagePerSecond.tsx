import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { damagePerSecondMonster } from "@neverquest/state/monster";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";

export default function () {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  if (!isShowingDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      Icon={Icon}
      contents={damagePerSecondMonsterValue}
      isAnimated
      tooltip="Monster damage per second (DPS)"
    />
  );
}
