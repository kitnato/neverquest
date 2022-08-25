import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import TrainableSkill from "@neverquest/components/Caravan/Mercenary/TrainableSkill";
import TrainedSkill from "@neverquest/components/Caravan/Mercenary/TrainedSkill";
import { SKILLS_ORDER } from "@neverquest/constants/skills";
import { skillsStatus } from "@neverquest/state/skills";

export default function () {
  const { areTrainable, areTrained } = useRecoilValue(skillsStatus);

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Acquire new skills</h6>

        {areTrainable.length === 0 ? (
          <span className="fst-italic">None available.</span>
        ) : (
          SKILLS_ORDER.map((type, index) => <TrainableSkill key={index} type={type} />)
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Trained skills</h6>

        {areTrained.length === 0 ? (
          <span className="fst-italic">None.</span>
        ) : (
          SKILLS_ORDER.map((type, index) => <TrainedSkill key={index} type={type} />)
        )}
      </Stack>
    </Stack>
  );
}
