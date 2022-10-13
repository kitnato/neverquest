import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wingfoot.svg";
import { skills } from "@neverquest/state/skills";
import { totalDodgeChance } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";

export default function () {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (dodgeSkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={formatPercentage(dodgeChanceValue)}
      Icon={Icon}
      tooltip="Dodge chance"
    />
  );
}
