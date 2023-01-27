import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Character/SkillDisplay";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";

export function TrainedSkill({ type }: { type: SkillType }) {
  const skillValue = useRecoilValue(skills(type));

  if (!skillValue) {
    return null;
  }

  return <SkillDisplay type={type} />;
}
