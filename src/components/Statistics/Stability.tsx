import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { stability } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Stability() {
  const isShowingStability = useRecoilValue(isShowing("stability"));
  const skillShieldcraft = useRecoilValue(skills("shieldcraft"));
  const stabilityValue = useRecoilValue(stability);

  useDeltaText({
    atomDelta: deltas("stability"),
    atomValue: stability,
  });

  if (!isShowingStability) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{skillShieldcraft ? formatPercentage(stabilityValue) : LABEL_EMPTY}</span>

          <FloatingText deltaType="stability" />
        </Stack>
      }
      Icon={IconStability}
      isAnimated
      tooltip="Chance for free block"
    />
  );
}
