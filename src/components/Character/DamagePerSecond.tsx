import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/heavy-timer.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { damagePerSecond } from "@neverquest/state/statistics";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(isShowing(ShowingType.DamagePerSecond));

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Damage per second (DPS)" />

      <span>{damagePerSecondValue}</span>
    </Stack>
  );
}
