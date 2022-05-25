import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/abstract-016.svg";
import { experienceAvailable } from "neverquest/state/character";

// TODO - obsolete?
export default function ExperienceAvailable() {
  const experienceAvailableValue = useAtomValue(experienceAvailable);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Available XP" />

      <span>{experienceAvailableValue}</span>
    </Stack>
  );
}
