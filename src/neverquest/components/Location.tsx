import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/compass.svg";
import { location } from "neverquest/state/global";
import { OverlayPlacement } from "neverquest/types/ui";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} placement={OverlayPlacement.Bottom} tooltip="Location" />

      <span>{locationValue}</span>
    </Stack>
  );
}
