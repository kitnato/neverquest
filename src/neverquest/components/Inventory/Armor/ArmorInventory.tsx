import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import ArmorName from "neverquest/components/Inventory/Armor/ArmorName";
import { Armor } from "neverquest/types/core";
import icon from "neverquest/icons/shoulder-armor.svg";

export default function ArmorInventory({ armor }: { armor: Armor }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Armor" />

      <ArmorName armor={armor} />
    </Stack>
  );
}
