import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import RecoveryMeter from "@neverquest/components/Character/RecoveryMeter";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import icon from "@neverquest/icons/knockout.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { totalRecoveryRate } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Recovery() {
  const showRecoveryValue = useRecoilValue(isShowing(ShowingType.Recovery));

  const deltaTotalRecoveryRate = deltas(DeltaType.TotalRecoveryRate);

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
