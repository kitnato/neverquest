import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/abstract-016.svg";
import { experienceAvailable } from "state/character";

export default function ExperienceAvailable() {
  const experienceAvailableValue = useRecoilValue(experienceAvailable);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Available XP" />

      <span>{experienceAvailableValue}</span>
    </Stack>
  );
}
