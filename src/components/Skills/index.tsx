import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Skills/SkillDisplay";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function Skills() {
  const trainedSkillsValue = useRecoilValue(acquiredSkills);

  return Object.values(trainedSkillsValue).every((current) => !current) ? (
    <span className="fst-italic">None.</span>
  ) : (
    <Stack gap={3}>
      {SKILL_TYPES.map((current) =>
        trainedSkillsValue[current] ? <SkillDisplay key={current} skill={current} /> : undefined,
      )}
    </Stack>
  );
}
