import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import RecoveryMeter from "@neverquest/components/Character/RecoveryMeter";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/knockout.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { totalRecoveryRate } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

export default function () {
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
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <RecoveryMeter />

          <FloatingText atom={deltaTotalRecoveryRate} />
        </Stack>
      }
      Icon={Icon}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}
