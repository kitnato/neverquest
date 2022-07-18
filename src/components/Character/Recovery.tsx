import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import RecoveryMeter from "@neverquest/components/Character/RecoveryMeter";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import icon from "@neverquest/icons/knockout.svg";
import { deltaTotalRecoveryRate } from "@neverquest/state/deltas";
import { showRecovery } from "@neverquest/state/show";
import { totalRecoveryRate } from "@neverquest/state/statistics";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Recovery() {
  const showRecoveryValue = useAtomValue(showRecovery);

  useDeltaText({
    deltaAtom: deltaTotalRecoveryRate,
    isTime: true,
    valueAtom: totalRecoveryRate,
  });

  if (!showRecoveryValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <Stack className="w-100" direction="horizontal">
        <RecoveryMeter />

        <FloatingText atom={deltaTotalRecoveryRate} />
      </Stack>
    </Stack>
  );
}
