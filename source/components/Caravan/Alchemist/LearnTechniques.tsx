import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { ownedItem } from "@neverquest/state/inventory";
import { acquiredSkills } from "@neverquest/state/skills";
import { SKILL_TYPES } from "@neverquest/types/unions";

export function LearnTechniques() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const ownedItemTornManuscript = useRecoilValue(ownedItem("torn manuscript"));

  const learnableTechniques = SKILL_TYPES.filter(
    (skill) => SKILLS[skill].trainer === "alchemist" && !acquiredSkillsValue[skill],
  );

  return (
    <Stack gap={3}>
      <h6>Learn techniques</h6>

      {ownedItemTornManuscript === undefined ? (
        <span>
          &quot;Alas, most teachings are lost to time. You wouldn&apos;t have come across any arcane
          writs lately?&quot;
        </span>
      ) : learnableTechniques.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        learnableTechniques.map((skill) => <TrainableSkill key={skill} skill={skill} />)
      )}
    </Stack>
  );
}
