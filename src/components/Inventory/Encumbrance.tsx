import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/weight-crush.svg";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export default function Encumbrance() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Encumbrance" />

      <ReserveMeter atom={encumbrance} atomMaximum={encumbranceMaximum} />
    </Stack>
  );
}
