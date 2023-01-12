import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wingfoot.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { dodgeChance } from "@neverquest/state/statistics";
import { DeltaType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  const deltaDodgeChance = deltas(DeltaType.DodgeChance);

  useDeltaText({
    atomDelta: deltaDodgeChance,
    atomValue: dodgeChance,
  });

  if (!dodgeSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <span>{formatPercentage(dodgeChanceValue)}</span>

          <FloatingText type={DeltaType.DodgeChance} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
