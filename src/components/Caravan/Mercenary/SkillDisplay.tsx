import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/data/skills";
import type { Skill } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function SkillDisplay({ type }: { type: Skill }) {
  const { description, Icon } = SKILLS[type];
  const name = capitalizeAll(type);

  return <IconDisplay contents={name} description={description} Icon={Icon} tooltip="Skill" />;
}
