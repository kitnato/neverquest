import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/barbute.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { totalProtection } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function TotalProtection() {
  const showTotalProtectionValue = useRecoilValue(isShowing(ShowingType.TotalProtection));
  const totalProtectionValue = useRecoilValue(totalProtection);

  const deltaTotalProtection = deltas(DeltaType.TotalProtection);

  useDeltaText({
    deltaAtom: deltaTotalProtection,
    valueAtom: totalProtection,
  });

  if (!showTotalProtectionValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Total protection" />

      <span>{totalProtectionValue}</span>

      <FloatingText atom={deltaTotalProtection} />
    </Stack>
  );
}
