import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { parry } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Parry() {
  const parryValue = useRecoilValue(parry);
  const isShowingParry = useRecoilValue(isShowing("parry"));
  const skillEscrime = useRecoilValue(skills("escrime"));

  useDeltaText({
    atomDelta: deltas("parry"),
    atomValue: parry,
    stop: (previous) => previous === null || !skillEscrime,
  });

  if (!isShowingParry) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{skillEscrime ? formatPercentage(parryValue) : LABEL_EMPTY}</span>

          <FloatingText type="parry" />
        </>
      }
      Icon={IconParry}
      isAnimated
      tooltip="Parry chance"
    />
  );
}
