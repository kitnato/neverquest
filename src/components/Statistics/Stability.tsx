import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { stability } from "@neverquest/state/statistics";
import { Delta, Showing, Skill } from "@neverquest/types/enums";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Stability() {
  const isShowingStability = useRecoilValue(isShowing(Showing.Stability));
  const skillShieldcraft = useRecoilValue(skills(Skill.Shieldcraft));
  const stabilityValue = useRecoilValue(stability);

  useDeltaText({
    atomDelta: deltas(Delta.Stability),
    atomValue: stability,
  });

  if (!isShowingStability) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{skillShieldcraft ? formatPercentage(stabilityValue) : LABEL_EMPTY}</span>

          <FloatingText type={Delta.Stability} />
        </>
      }
      Icon={IconStability}
      isAnimated
      tooltip="Chance for free block"
    />
  );
}
