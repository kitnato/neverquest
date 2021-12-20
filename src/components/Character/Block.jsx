import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/round-shield.svg";
import { shield } from "state/equipment";

export default function Block() {
  const shieldValue = useRecoilValue(shield);

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
