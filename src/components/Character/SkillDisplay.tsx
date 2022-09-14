import IconDisplay from "@neverquest/components/IconDisplay";
import { SKILLS } from "@neverquest/constants/skills";
import { SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const { description, Icon, name } = SKILLS[type];

  return <IconDisplay contents={description} Icon={Icon} isDescription tooltip={name} />;
}
