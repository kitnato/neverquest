import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { protection } from "@neverquest/state/statistics";
import { Delta, Showing } from "@neverquest/types/enums";

export function Protection() {
  const isShowingProtection = useRecoilValue(isShowing(Showing.Protection));
  const protectionValue = useRecoilValue(protection);

  const deltaProtection = deltas(Delta.Protection);

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

          <FloatingText type={Delta.Protection} />
        </>
      }
      Icon={IconProtection}
      isAnimated
      tooltip="Protection"
    />
  );
}
