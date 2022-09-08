import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { skills } from "@neverquest/state/skills";
import { totalCriticalDamage } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage, getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const criticalsSkill = useRecoilValue(skills(SkillType.Criticals));

  if (criticalsSkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Critical damage bonus" />

      <span>{formatPercentage(criticalDamageValue)}</span>
    </Stack>
  );
}
