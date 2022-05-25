import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/heavy-timer.svg";
import { showDamagePerSecond } from "neverquest/state/show";
import { damagePerSecond } from "neverquest/state/statistics";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function DamagePerSecond() {
  const damagePerSecondValue = useAtomValue(damagePerSecond);
  const showDamagePerSecondValue = useAtomValue(showDamagePerSecond);

  if (!showDamagePerSecondValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Damage per second (DPS)" />

      <span>{damagePerSecondValue}</span>
    </Stack>
  );
}
