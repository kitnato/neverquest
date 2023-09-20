import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Caravan/Mercenary/TrainableSkill";
import { Skills } from "@neverquest/components/Skills";
import { CREW } from "@neverquest/data/caravan";
import { SKILLS } from "@neverquest/data/skills";
import { skillsTrained } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

const ALL_SKILLS = Object.entries(SKILLS)
  .sort(([a], [b]) => a.localeCompare(b))
  .sort(([, a], [, b]) => CREW[a.requiredCrew].requiredStage - CREW[b.requiredCrew].requiredStage)
  .map(([type]) => type as Skill);

export function Mercenary() {
  const skillsTrainedValue = Object.values(useRecoilValue(skillsTrained));

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Acquire new skills</h6>

        {skillsTrainedValue.every((isSkillTrained) => isSkillTrained) ? (
          <span className="fst-italic">None available.</span>
        ) : (
          ALL_SKILLS.map((current) => <TrainableSkill key={current} type={current} />)
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Trained skills</h6>

        <Skills />
      </Stack>
    </Stack>
  );
}
