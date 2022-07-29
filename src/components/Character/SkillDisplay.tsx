import { Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import { SkillType } from "@neverquest/types/enums";
import { SKILLS } from "@neverquest/utilities/constants-skills";

export default function SkillDisplay({ type }: { type: SkillType }) {
  const { description, icon, name } = SKILLS[type];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <span>{description}</span>
    </Stack>
  );
}
