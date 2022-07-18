import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/shattered-sword.svg";
import { LootProps } from "@neverquest/types/props";

export default function Scrap({ tooltip, value }: LootProps) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={tooltip || "Scrap"} />

      <span>{value}</span>
    </Stack>
  );
}
