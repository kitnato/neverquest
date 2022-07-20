import { useAtomValue } from "jotai";
import { Stack } from "react-bootstrap";

import TrainSkillButton from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import Coins from "@neverquest/components/Resource/Coins";
import { skills } from "@neverquest/state/skills";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import { SKILLS, SKILLS_ORDER } from "@neverquest/utilities/constants-skills";

export default function TrainableSkills() {
  const skillsValue = useAtomValue(skills);

  const trainableSkills = SKILLS_ORDER.filter((type) => {
    const skill = skillsValue[type];

    return !skill.isAcquired && skill.isTrainable;
  });

  return (
    <Stack gap={3}>
      <h6>Acquire new skills</h6>

      {trainableSkills.length === 0 ? (
        <span className="fst-italic">None available.</span>
      ) : (
        trainableSkills.map((type, key) => (
          <div className="align-items-center d-flex justify-content-between w-100" key={key}>
            <SkillDisplay type={type} />

            <Stack direction="horizontal" gap={3}>
              <Coins tooltip="Price (coins)" value={SKILLS[type].price} />

              <TrainSkillButton type={type} />
            </Stack>
          </div>
        ))
      )}
    </Stack>
  );
}
