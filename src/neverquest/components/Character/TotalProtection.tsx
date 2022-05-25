import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import useDeltaText from "neverquest/hooks/useDeltaText";
import icon from "neverquest/icons/barbute.svg";
import { deltaTotalProtection } from "neverquest/state/deltas";
import { showTotalProtection } from "neverquest/state/show";
import { totalProtection } from "neverquest/state/statistics";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function TotalProtection() {
  const showTotalProtectionValue = useAtomValue(showTotalProtection);
  const totalProtectionValue = useAtomValue(totalProtection);

  useDeltaText({
    deltaAtom: deltaTotalProtection,
    valueAtom: totalProtection,
  });

  if (!showTotalProtectionValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total protection" />

      <span>{totalProtectionValue}</span>

      <FloatingText atom={deltaTotalProtection} />
    </Stack>
  );
}
