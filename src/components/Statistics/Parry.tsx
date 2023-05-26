import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { parry } from "@neverquest/state/statistics";
import { Delta, Skill } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Parry() {
  const parryValue = useRecoilValue(parry);
  const parrySkill = useRecoilValue(skills(Skill.Escrime));

  const deltaParry = deltas(Delta.Parry);

  useDeltaText({
    atomDelta: deltaParry,
    atomValue: parry,
  });

  if (!parrySkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(parryValue)}</span>

          <FloatingText type={Delta.Parry} />
        </>
      }
      Icon={IconParry}
      isAnimated
      tooltip="Parry chance"
    />
  );
}
