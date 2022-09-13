import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/wingfoot.svg";
import { skills } from "@neverquest/state/skills";
import { totalDodgeChance } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const dodgeChanceValue = useRecoilValue(totalDodgeChance);
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (dodgeSkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Dodge chance" />

      <span>{formatPercentage(dodgeChanceValue)}</span>
    </Stack>
  );
}
