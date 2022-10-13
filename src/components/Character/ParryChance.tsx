import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/sword-clash.svg";
import { skills } from "@neverquest/state/skills";
import { totalParryChance } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/helpers";

export default function () {
  const parryChanceValue = useRecoilValue(totalParryChance);
  const parrySkill = useRecoilValue(skills(SkillType.Parry));

  if (parrySkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <IconDisplay
      Icon={Icon}
      animation={AnimationType.FlipInX}
      contents={formatPercentage(parryChanceValue)}
      tooltip="Parry chance"
    />
  );
}
