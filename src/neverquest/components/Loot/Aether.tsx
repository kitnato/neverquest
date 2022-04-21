import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import { LootProps } from "neverquest/env";
import aetherIcon from "neverquest/icons/incense.svg";

export default function Aether({ tooltip, value }: LootProps) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={aetherIcon} tooltip={tooltip || "Aether"} />

      <span>{value}</span>
    </Stack>
  );
}
