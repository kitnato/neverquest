import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { deflection } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Deflection() {
  const deflectionValue = useRecoilValue(deflection);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const skillArmorcraft = useRecoilValue(skills("armorcraft"));

  useDeltaText({
    atomDelta: deltas("deflection"),
    atomValue: deflection,
    stop: (previous) => previous === null || !skillArmorcraft,
  });

  if (!isShowingDeflection) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{skillArmorcraft ? formatPercentage(deflectionValue) : LABEL_EMPTY}</span>

          <FloatingText type="deflection" />
        </>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Deflection chance"
    />
  );
}
