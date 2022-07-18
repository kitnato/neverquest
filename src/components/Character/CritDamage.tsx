import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/striking-splinter.svg";
import { showCritical } from "@neverquest/state/show";
import { totalCriticalDamage } from "@neverquest/state/statistics";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function CritDamage() {
  const criticalDamageValue = useAtomValue(totalCriticalDamage);
  const showCriticalValue = useAtomValue(showCritical);

  if (!showCriticalValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Critical damage bonus" />

      <span>{formatPercentage(criticalDamageValue)}</span>
    </Stack>
  );
}
