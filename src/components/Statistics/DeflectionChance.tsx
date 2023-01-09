import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/shield-reflect.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { deflection } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const deflectionValue = useRecoilValue(deflection);
  const isShowingDeflection = useRecoilValue(isShowing(ShowingType.Deflection));

  const deltaDeflection = deltas(DeltaType.Deflection);

  useDeltaText({
    atomDelta: deltaDeflection,
    atomValue: deflection,
  });

  if (!isShowingDeflection) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={
        <>
          <span>{formatPercentage(deflectionValue)}</span>

          <FloatingText atom={deltaDeflection} />
        </>
      }
      Icon={Icon}
      tooltip="Deflection"
    />
  );
}
