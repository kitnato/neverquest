import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import aetherIcon from "neverquest/icons/incense.svg";
import { LootProps } from "neverquest/types/props";

export default function Aether({ tooltip, value }: LootProps) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={aetherIcon} tooltip={tooltip || "Aether"} />

      <span>{value}</span>
    </Stack>
  );
}
