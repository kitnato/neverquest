import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/round-shield.svg";
import { shield } from "neverquest/state/equipment";

export default function Block() {
  const shieldValue = useRecoilValue(shield);

  // TODO - replace with show
  if (shieldValue.name === null) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Block" />

      <span>{shieldValue.block * 100}</span>
    </Stack>
  );
}
