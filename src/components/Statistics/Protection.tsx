import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/barbute.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { protection } from "@neverquest/state/statistics";
import { DeltaType, ShowingType } from "@neverquest/types/enums";

export default function () {
  const isShowingProtection = useRecoilValue(isShowing(ShowingType.Protection));
  const protectionValue = useRecoilValue(protection);

  const deltaProtection = deltas(DeltaType.Protection);

  useDeltaText({
    atomDelta: deltaProtection,
    atomValue: protection,
  });

  if (!isShowingProtection) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{protectionValue}</span>

          <FloatingText type={DeltaType.Protection} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip="Protection"
    />
  );
}
