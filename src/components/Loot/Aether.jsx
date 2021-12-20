import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import aetherIcon from "icons/incense.svg";

export default function Aether({ value }) {
  if (!value) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={aetherIcon} tooltip="Aether" />

      <span>{value}</span>
    </Stack>
  );
}
