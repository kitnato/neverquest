import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterStaggeredMeter } from "@neverquest/components/Monster/MonsterStaggeredMeter";
import { ReactComponent as Icon } from "@neverquest/icons/knocked-out-stars.svg";
import { skills } from "@neverquest/state/skills";
import { staggerDuration } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";

export function MonsterStaggered() {
  const staggerSkill = useRecoilValue(skills(SkillType.Stagger));
  const staggerDurationValue = useRecoilValue(staggerDuration);

  if (!staggerSkill || staggerDurationValue === 0) {
    return null;
  }

  return <IconDisplay contents={<MonsterStaggeredMeter />} Icon={Icon} tooltip="Staggered" />;
}
