import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import icon from "neverquest/icons/weight-crush.svg";
import { encumbrance, inventorySize } from "neverquest/state/inventory";

export default function Encumbrance() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Encumbrance" />

      <ResourceMeter resourceCurrent={encumbrance} resourceMaximum={inventorySize} />
    </Stack>
  );
}
