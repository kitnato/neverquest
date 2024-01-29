import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general";
import { TRAITS } from "@neverquest/data/traits";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { acquiredSkills } from "@neverquest/state/skills";
import type { Trait } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function TraitDisplay({ trait }: { trait: Trait }) {
  const acquiredSkillsValue = useRecoilValue(acquiredSkills);

  const { description, Icon, requiredSkill } = TRAITS[trait];
  const name = capitalizeAll(trait);

  if (requiredSkill === undefined || acquiredSkillsValue[requiredSkill]) {
    return (
      <IconDisplay description={<span>{description}</span>} Icon={Icon} tooltip="Trait">
        <span>{name}</span>
      </IconDisplay>
    );
  }

  return (
    <IconDisplay
      description={<span>{LABEL_SKILL_REQUIRED}</span>}
      Icon={IconUnknown}
      tooltip="Trait"
    >
      <span>{LABEL_UNKNOWN}</span>
    </IconDisplay>
  );
}
