import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/carnivore-mouth.svg";

export default function MonsterName() {
  // TODO - SLIM
  const name = "???";

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster" />

      <span>{name}</span>
    </Stack>
  );
}
