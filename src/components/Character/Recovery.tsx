import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import RecoveryMeter from "@neverquest/components/Character/RecoveryMeter";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/knockout.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { recoveryRate } from "@neverquest/state/statistics";
import { DeltaTextType, DeltaType, ShowingType } from "@neverquest/types/enums";

export default function () {
  const isShowingRecovery = useRecoilValue(isShowing(ShowingType.Recovery));

  const deltaRecoveryRate = deltas(DeltaType.RecoveryRate);

  useDeltaText({
    atomDelta: deltaRecoveryRate,
    atomValue: recoveryRate,
    type: DeltaTextType.Time,
  });

  if (!isShowingRecovery) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <RecoveryMeter />

          <FloatingText type={DeltaType.RecoveryRate} />
        </Stack>
      }
      Icon={Icon}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}
