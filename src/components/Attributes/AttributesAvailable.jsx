import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/level-two-advanced.svg";
import { attributesAvailable } from "state/character";

export default function AttributesAvailable() {
  const attributesAvailableValue = useRecoilValue(attributesAvailable);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Attribute points" />

      <span>{attributesAvailableValue}</span>
    </Stack>
  );
}
