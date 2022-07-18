import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/mountain-road.svg";
import { location } from "@neverquest/state/encounter";
import { OverlayPlacement } from "@neverquest/types/ui";

export default function Location() {
  const locationValue = useAtomValue(location);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} placement={OverlayPlacement.Bottom} tooltip="Location" />

      <span>{locationValue}</span>
    </Stack>
  );
}
