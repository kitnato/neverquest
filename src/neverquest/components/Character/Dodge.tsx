import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/wingfoot.svg";
import { showDodgeChance } from "neverquest/state/show";
import { totalDodgeChance } from "neverquest/state/statistics";
import { formatPercentage } from "neverquest/utilities/helpers";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Dodge() {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const showDodgeChanceValue = useRecoilValue(showDodgeChance);

  if (!showDodgeChanceValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Dodge" />

      <span>{formatPercentage(dodgeChanceValue)}</span>
    </Stack>
  );
}
