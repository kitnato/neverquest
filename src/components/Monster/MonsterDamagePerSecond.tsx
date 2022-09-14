import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { damagePerSecondMonster } from "@neverquest/state/monster";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecond = useRecoilValue(isShowing(ShowingType.DamagePerSecond));

  if (!isShowingDamagePerSecond) {
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
