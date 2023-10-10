import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Skills } from "@neverquest/components/Skills";
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { CREW } from "@neverquest/data/caravan";
import { SKILLS } from "@neverquest/data/skills";
import { trainedSkills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

const ALL_SKILLS = Object.entries(SKILLS)
  .sort(([a], [b]) => a.localeCompare(b))
  .sort(([, a], [, b]) => CREW[a.requiredCrew].requiredStage - CREW[b.requiredCrew].requiredStage)
  .map(([type]) => type as Skill);

export function Mercenary() {
  const trainedSkillsValues = Object.values(useRecoilValue(trainedSkills));

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Acquire new skills</h6>

        {trainedSkillsValues.every(Boolean) ? (
          <span className="fst-italic">None available.</span>
        ) : (
          ALL_SKILLS.map((current) => <TrainableSkill key={current} skill={current} />)
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Trained skills</h6>

        <Skills />
      </Stack>
    </Stack>
  );
}