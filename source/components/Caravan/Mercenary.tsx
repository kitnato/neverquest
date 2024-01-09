import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function Mercenary() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);

  const trainableSkills = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === "mercenary" && !acquiredSkillsValue[skill],
  );

  return (
    <Stack gap={3}>
      <h6>Acquire skills</h6>

      {trainableSkills.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        trainableSkills.map((skill) => <TrainableSkill key={skill} skill={skill} />)
      )}
    </Stack>
  );
}
