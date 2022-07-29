import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import ShieldName from "@neverquest/components/Inventory/Shield/ShieldName";
import icon from "@neverquest/icons/round-shield.svg";
import { Shield } from "@neverquest/types";

export default function ShieldInventory({ shield }: { shield: Shield }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Shield" />

      <ShieldName shield={shield} />
    </Stack>
  );
}
