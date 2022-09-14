import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/barbute.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { totalProtection } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";

export default function () {
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
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={
        <>
          <span>{totalProtectionValue}</span>

          <FloatingText atom={deltaTotalProtection} />
        </>
      }
      Icon={Icon}
      tooltip="Total protection"
    />
  );
}
