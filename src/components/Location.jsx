import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import icon from "icons/compass.svg";
import { location } from "state/global";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Location" />

      <span>{locationValue}</span>
    </Stack>
  );
}
