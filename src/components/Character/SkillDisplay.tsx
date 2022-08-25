import { Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import { SKILLS } from "@neverquest/constants/skills";
import { SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const { description, Icon, name } = SKILLS[type];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip={name} />

      <span>{description}</span>
    </Stack>
  );
}
