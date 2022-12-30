import IconDisplay from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/data/skills";
import { SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const { description, Icon, name } = SKILLS[type];

  return <IconDisplay contents={name} description={description} Icon={Icon} tooltip={name} />;
}
