import { useRecoilValue } from "recoil";

import { TrainedSkill } from "@neverquest/components/Skills/TrainedSkill";
import { SKILLS } from "@neverquest/data/skills";
import { skillsTrained } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

const ALL_SKILLS = Object.entries(SKILLS)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([type]) => type as Skill);

export function Skills() {
  const skillsTrainedValue = Object.values(useRecoilValue(skillsTrained));

  return skillsTrainedValue.every((isSkillTrained) => !isSkillTrained) ? (
    <span className="fst-italic">None.</span>
  ) : (
    ALL_SKILLS.sort((a, b) => a.localeCompare(b)).map((current) => (
      <TrainedSkill key={current} skill={current} />
    ))
  );
}
