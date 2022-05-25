import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/barbed-sun.svg";
import { experience } from "neverquest/state/character";
import { deltaExperience } from "neverquest/state/deltas";

export default function Experience() {
  const experienceValue = useAtomValue(experience);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total XP" />

      <span>{experienceValue}</span>

      <FloatingText atom={deltaExperience} />
    </Stack>
  );
}
