import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import aetherIcon from "icons/incense.svg";

export default function Aether({ tooltip, value }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={aetherIcon} tooltip={tooltip || "Aether"} />

      <span>{value}</span>
    </Stack>
  );
}
