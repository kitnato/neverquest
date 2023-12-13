import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay";
import { LABEL_NONE } from "@neverquest/data/general";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function Skills() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);

  return Object.values(acquiredSkillsValue).every((haAcquiredSkill) => !haAcquiredSkill) ? (
    <span className="fst-italic">{LABEL_NONE}</span>
  ) : (
    <Stack gap={3}>
      {SKILL_TYPES.map((skill) =>
        acquiredSkillsValue[skill] ? <SkillDisplay key={skill} skill={skill} /> : undefined,
      )}
    </Stack>
  );
}
