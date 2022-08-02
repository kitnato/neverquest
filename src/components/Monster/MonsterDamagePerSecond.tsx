import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/heavy-timer.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { damagePerSecondMonster } from "@neverquest/state/monster";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function MonsterDamagePerSecond() {
  const damagePerSecondMonsterValue = useRecoilValue(damagePerSecondMonster);
  const isShowingDamagePerSecond = useRecoilValue(isShowing(ShowingType.DamagePerSecond));

  if (!isShowingDamagePerSecond) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Monster damage per second (DPS)" />

      <span>{damagePerSecondMonsterValue}</span>
    </Stack>
  );
}
