import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Caravan/Mercenary/SkillDisplay";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

export function TrainedSkill({ skill }: { skill: Skill }) {
  const skillValue = useRecoilValue(skills(skill));

  if (!skillValue) {
    return null;
  }

  return <SkillDisplay skill={skill} />;
}
