import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/spiky-eclipse.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { totalCriticalChance } from "@neverquest/state/statistics";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function CritChance() {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const showCriticalValue = useRecoilValue(isShowing(ShowingType.Critical));

  if (!showCriticalValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Critical hit chance" />

      <span>{`${formatPercentage(criticalChanceValue)}`}</span>
    </Stack>
  );
}
