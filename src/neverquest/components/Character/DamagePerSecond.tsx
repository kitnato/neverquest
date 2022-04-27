import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/heavy-timer.svg";
import { showDamagePerSecond } from "neverquest/state/show";
import { damagePerSecond } from "neverquest/state/statistics";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showDamagePerSecondValue = useRecoilValue(showDamagePerSecond);

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Damage per second (DPS)" />

      <span>{damagePerSecondValue}</span>
    </Stack>
  );
}
