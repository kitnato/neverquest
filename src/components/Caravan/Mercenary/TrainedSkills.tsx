import { useAtomValue } from "jotai";
import { Stack } from "react-bootstrap";

import { skills } from "@neverquest/state/skills";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import { SKILLS_ORDER } from "@neverquest/utilities/constants-skills";

export default function TrainedSkills() {
  const skillsValue = useAtomValue(skills);

  const trainedSkills = SKILLS_ORDER.filter((type) => {
    const skill = skillsValue[type];

    return skill.isAcquired && skill.isTrainable;
  });

  if (trainedSkills.length === 0) {
    return null;
  }

  return (
    <Stack gap={3}>
      <h6>Trained skills</h6>

      {trainedSkills.map((type, key) => (
        <SkillDisplay key={key} type={type} />
      ))}
    </Stack>
  );
}
