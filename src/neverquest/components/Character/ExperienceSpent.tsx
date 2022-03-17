import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/abstract-013.svg";
import { experienceSpent } from "neverquest/state/character";

export default function ExperienceSpent() {
  const experienceSpentValue = useRecoilValue(experienceSpent);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Spent XP" />

      <span>{experienceSpentValue}</span>
    </Stack>
  );
}
