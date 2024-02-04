import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { TEARS_MAXIMUM } from "@neverquest/data/items";
import { SKILLS } from "@neverquest/data/skills";
import { tears } from "@neverquest/state/items";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function AcquireWitchSkill() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const tearsValue = useRecoilValue(tears);

  const acquiredSkillsWitch = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === "witch" && !acquiredSkillsValue[skill],
  );

  return (
    <Stack gap={3}>
      <h6>Acquire skill</h6>

      {tearsValue < TEARS_MAXIMUM ? (
        <span>
          &quot;Before I can impart protective hexes, you must first taste the bitter tears of
          experience.&quot;
        </span>
      ) : acquiredSkillsWitch.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        <>
          <span>&quot;Your pernicious traumas sing to the cipher. You are ready.&quot;</span>

          {acquiredSkillsWitch.map((skill) => (
            <TrainableSkill key={skill} skill={skill} />
          ))}
        </>
      )}
    </Stack>
  );
}
