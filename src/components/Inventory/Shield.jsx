import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/round-shield.svg";
import { shield } from "state/equipment";
import { show } from "state/global";

// TODO
export default function Shield() {
  const shieldValue = useRecoilValue(shield);
  const showValue = useRecoilValue(show);

  if (!showValue.shield) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Shield" />

      <span>{shieldValue.name}</span>
    </Stack>
  );
}
