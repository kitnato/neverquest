import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { ownedItem } from "@neverquest/state/inventory";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function AcquireOccultistSkill() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const ownedItemDreamCatcher = useRecoilValue(ownedItem("dream catcher"));

  const acquiredSkillsOccultist = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === "occultist" && !acquiredSkillsValue[skill],
  );

  return (
    <Stack gap={3}>
      <h6>Acquire skill</h6>

      {ownedItemDreamCatcher === undefined ? (
        <span>
          &quot;There exists tremendous power in dreams, one must but find a medium to harness
          them.&quot;
        </span>
      ) : acquiredSkillsOccultist.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        <>
          <span>&quot;The cipher sings.&quot;</span>

          {acquiredSkillsOccultist.map((skill) => (
            <TrainableSkill key={skill} skill={skill} />
          ))}
        </>
      )}
    </Stack>
  );
}
