import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { protection } from "@neverquest/state/statistics";

export function Protection() {
  const isShowingProtection = useRecoilValue(isShowing("protection"));
  const protectionValue = useRecoilValue(protection);

  useDeltaText({
    atomDelta: deltas("protection"),
    atomValue: protection,
  });

  if (!isShowingProtection) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{protectionValue}</span>

          <FloatingText deltaType="protection" />
        </Stack>
      }
      Icon={IconProtection}
      isAnimated
      tooltip="Protection"
    />
  );
}
