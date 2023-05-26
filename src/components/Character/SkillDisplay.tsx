import { IconDisplay } from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/data/skills";
import type { Skill } from "@neverquest/types/enums";

export function SkillDisplay({ type }: { type: Skill }) {
  const { description, Icon, name } = SKILLS[type];

  return <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />;
}
