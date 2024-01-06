import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TrainableSkill } from "@neverquest/components/Skills/TrainableSkill";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { SKILLS } from "@neverquest/data/skills";
import { ownedItem } from "@neverquest/state/inventory";
import { acquiredSkills } from "@neverquest/state/skills";
import type { ConsumableItem, InfusableItem, TrinketItem } from "@neverquest/types";
import { type Inheritable, SKILL_TYPES } from "@neverquest/types/unions";

export function LearnTechniques() {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);
  const ownedItems: Partial<
    Record<Inheritable, ConsumableItem | InfusableItem | TrinketItem | undefined>
  > = {
    journal: useRecoilValue(ownedItem("journal")),
    "mysterious egg": useRecoilValue(ownedItem("mysterious egg")),
  };

  const learnableTechniques = SKILL_TYPES.filter((skill) => {
    const { requiredInheritable, trainer } = SKILLS[skill];

    return (
      trainer === "alchemist" &&
      (requiredInheritable === undefined || ownedItems[requiredInheritable] !== undefined) &&
      !acquiredSkillsValue[skill]
    );
  });

  return (
    <Stack gap={3}>
      <h6>Learn techniques</h6>

      {learnableTechniques.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
      ) : (
        learnableTechniques.map((skill) => <TrainableSkill key={skill} skill={skill} />)
      )}
    </Stack>
  );
}
