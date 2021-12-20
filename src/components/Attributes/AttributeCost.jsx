import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/level-two.svg";
import { attributeCost } from "state/character";

export default function AttributeCost() {
  const attributeCostValue = useRecoilValue(attributeCost);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Cost per attribute" />

      <span>{attributeCostValue}</span>
    </Stack>
  );
}
