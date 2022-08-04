import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { totalCriticalDamage } from "@neverquest/state/statistics";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function CriticalDamage() {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
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
      <ImageIcon Icon={Icon} tooltip="Critical damage bonus" />

      <span>{formatPercentage(criticalDamageValue)}</span>
    </Stack>
  );
}
