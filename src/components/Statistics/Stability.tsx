import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { stability } from "@neverquest/state/statistics";
import { Delta, Skill } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Stability() {
  const stabilityValue = useRecoilValue(stability);
  const shieldsSkill = useRecoilValue(skills(Skill.Shieldcraft));

  const deltaStability = deltas(Delta.Stability);

  useDeltaText({
    atomDelta: deltaStability,
    atomValue: stability,
  });

  if (!shieldsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(stabilityValue)}</span>

          <FloatingText type={Delta.Stability} />
        </>
      }
      Icon={IconStability}
      isAnimated
      tooltip="Free block chance"
    />
  );
}
