import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Character/SkillDisplay";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/enums";

export function TrainedSkill({ type }: { type: Skill }) {
  const skillValue = useRecoilValue(skills(type));

  if (!skillValue) {
    return null;
  }

  return <SkillDisplay type={type} />;
}
