import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/wingfoot.svg";
import { showDodgeChance } from "@neverquest/state/show";
import { totalDodgeChance } from "@neverquest/state/statistics";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Dodge() {
  const dodgeChanceValue = useAtomValue(totalDodgeChance);
  const showDodgeChanceValue = useAtomValue(showDodgeChance);

  if (!showDodgeChanceValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Dodge" />

      <span>{formatPercentage(dodgeChanceValue)}</span>
    </Stack>
  );
}
