import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { damagePerSecondMonster } from "@neverquest/state/monster";

export default function () {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);

  if (!isShowingDamagePerSecondValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={damagePerSecondMonsterValue}
      Icon={Icon}
      isAnimated
      tooltip="Monster damage per second (DPS)"
    />
  );
}
