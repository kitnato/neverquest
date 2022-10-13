import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import MonsterStaggerMeter from "@neverquest/components/Monster/MonsterStaggerMeter";
import { ReactComponent as Icon } from "@neverquest/icons/star-swirl.svg";
import { skills } from "@neverquest/state/skills";
import { totalStaggerDuration } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function () {
  const staggerSkill = useRecoilValue(skills(SkillType.Stagger));
  const totalStaggerDurationValue = useRecoilValue(totalStaggerDuration);

  if (staggerSkill !== SkillStatus.Trained || totalStaggerDurationValue === 0) {
    return null;
  }

  return (
    <IconDisplay contents={<MonsterStaggerMeter />} Icon={Icon} tooltip="Staggered duration" />
  );
}
