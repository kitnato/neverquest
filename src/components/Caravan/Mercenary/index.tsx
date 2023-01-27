import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Caravan/Mercenary/TrainableSkill";
import { TrainedSkill } from "@neverquest/components/Caravan/Mercenary/TrainedSkill";
import { SKILLS_ORDER } from "@neverquest/data/skills";
import { skillsTrained } from "@neverquest/state/skills";

export function Mercenary() {
  const skillsTrainedAll = Object.values(useRecoilValue(skillsTrained));

  const allTrained = skillsTrainedAll.every((isSkillTrained) => isSkillTrained);
  const noneTrained = skillsTrainedAll.every((isSkillTrained) => !isSkillTrained);

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Acquire new skills</h6>

        {allTrained ? (
          <span className="fst-italic">None available.</span>
        ) : (
          SKILLS_ORDER.map((type) => <TrainableSkill key={type} type={type} />)
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Trained skills</h6>

        {noneTrained ? (
          <span className="fst-italic">None.</span>
        ) : (
          SKILLS_ORDER.map((type) => <TrainedSkill key={type} type={type} />)
        )}
      </Stack>
    </Stack>
  );
}
