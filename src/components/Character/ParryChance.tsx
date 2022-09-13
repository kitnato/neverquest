import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/sword-clash.svg";
import { skills } from "@neverquest/state/skills";
import { totalParryChance } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const parryChanceValue = useRecoilValue(totalParryChance);
  const parrySkill = useRecoilValue(skills(SkillType.Parry));

  if (parrySkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon Icon={Icon} tooltip="Parry chance" />

      <span>{formatPercentage(parryChanceValue)}</span>
    </Stack>
  );
}
