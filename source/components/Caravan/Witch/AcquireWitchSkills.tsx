import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { POISON } from "@neverquest/data/monster";
import { SKILLS } from "@neverquest/data/skills";
import { stageMaximum } from "@neverquest/state/encounter";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function AcquireWitchSkills() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const stageMaximumValue = useRecoilValue(stageMaximum);

  const acquiredSkillsWitch = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === "witch" && !acquiredSkillsValue[skill],
  );

  return (
    <Stack gap={3}>
      <h6>Acquire skills</h6>

      {stageMaximumValue < POISON.requiredStage ? (
        <span>
          &quot;Before I can impart the wisdom of hexes, you must first taste the bitter herbs of
          experience.&quot;
        </span>
      ) : acquiredSkillsWitch.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        <>
          <span>
            &quot;Those scars concede your encounters with the most noxious of foes. You are
            ready.&quot;
          </span>

          <>
            {acquiredSkillsWitch.map((skill) => (
              <TrainableSkill key={skill} skill={skill} />
            ))}
          </>
        </>
      )}
    </Stack>
  );
}
