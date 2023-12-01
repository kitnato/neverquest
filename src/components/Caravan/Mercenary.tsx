import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Skills } from "@neverquest/components/Skills";
import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { SKILLS_ORDER } from "@neverquest/data/skills";
import { acquiredSkills } from "@neverquest/state/skills";

export function Mercenary() {
  const trainedSkillsValue = useRecoilValue(acquiredSkills);

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Acquire new skills</h6>

        {Object.values(trainedSkillsValue).every(Boolean) ? (
          <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
        ) : (
          SKILLS_ORDER.map((current) => <TrainableSkill key={current} skill={current} />)
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Trained skills</h6>

        <Skills />
      </Stack>
    </Stack>
  );
}
