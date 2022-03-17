import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import aetherIcon from "neverquest/icons/incense.svg";

export default function Aether({ tooltip, value }: { tooltip?: string; value: number }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={aetherIcon} tooltip={tooltip || "Aether"} />

      <span>{value}</span>
    </Stack>
  );
}
