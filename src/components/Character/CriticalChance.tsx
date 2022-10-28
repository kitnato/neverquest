import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/spiky-eclipse.svg";
import { skills } from "@neverquest/state/skills";
import { totalCriticalChance } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/helpers";

export default function () {
  const criticalChanceValue = useRecoilValue(totalCriticalChance);
  const criticalsSkill = useRecoilValue(skills(SkillType.Criticals));

  if (!criticalsSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={formatPercentage(criticalChanceValue)}
      Icon={Icon}
      isAnimated
      tooltip="Critical strike chance"
    />
  );
}
