import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/data/skills";
import type { Skill } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SkillDisplay({ skill }: { skill: Skill }) {
  const { description, Icon } = SKILLS[skill];
  const name = capitalizeAll(skill);

  return (
    <IconDisplay description={description} Icon={Icon} tooltip="Skill">
      {name}
    </IconDisplay>
  );
}
