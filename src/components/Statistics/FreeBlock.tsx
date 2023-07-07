import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconFreeBlock } from "@neverquest/icons/free-block.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function FreeBlock() {
  const stability = rawMasteryStatistic("stability");

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
      Icon={IconFreeBlock}
      isAnimated
      tooltip="0-stamina block chance"
    />
  );
}
