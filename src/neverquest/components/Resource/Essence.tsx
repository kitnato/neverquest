import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import essenceIcon from "neverquest/icons/incense.svg";
import { LootProps } from "neverquest/types/props";

export default function Essence({ tooltip, value }: LootProps) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={essenceIcon} tooltip={tooltip || "Essence"} />

      <span>{value}</span>
    </Stack>
  );
}
