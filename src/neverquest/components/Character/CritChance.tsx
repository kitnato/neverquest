import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/spiky-eclipse.svg";
import { showCritical } from "neverquest/state/show";
import { totalCriticalChance } from "neverquest/state/statistics";
import { formatPercentage } from "neverquest/utilities/helpers";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const showCriticalValue = useRecoilValue(showCritical);

  if (!showCriticalValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{`${formatPercentage(criticalChanceValue)}`}</span>
    </Stack>
  );
}
