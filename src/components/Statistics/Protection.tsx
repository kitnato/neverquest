import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { protection } from "@neverquest/state/statistics";

export function Protection() {
  const isShowingProtection = useRecoilValue(isShowing("protection"));
  const protectionValue = useRecoilValue(protection);

  useDeltaText({
    delta: "protection",
    value: protection,
  });

  if (!isShowingProtection) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{protectionValue}</span>

          <FloatingTextQueue delta="protection" />
        </Stack>
      }
      Icon={IconProtection}
      isAnimated
      tooltip="Total protection"
    />
  );
}
