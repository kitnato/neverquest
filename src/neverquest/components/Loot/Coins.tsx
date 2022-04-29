import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/two-coins.svg";
import { LootProps } from "neverquest/types/props";

export default function Coins({ tooltip, value }: LootProps) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip || "Coins"} />

      <span>{value}</span>
    </Stack>
  );
}
