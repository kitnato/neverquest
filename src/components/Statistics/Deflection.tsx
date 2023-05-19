import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { deflection } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Deflection() {
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
      contents={
        <>
          <span>{formatPercentage(deflectionValue)}</span>

          <FloatingText type={DeltaType.Deflection} />
        </>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Deflection chance"
    />
  );
}
