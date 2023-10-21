import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay";
import { trainedSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function Skills() {
  const trainedSkillsValue = useRecoilValue(trainedSkills);

  return Object.values(trainedSkillsValue).every((current) => !current) ? (
    <span className="fst-italic">None.</span>
  ) : (
    SKILL_TYPES.map(
      (current) => trainedSkillsValue[current] && <SkillDisplay key={current} skill={current} />,
    )
  );
}
