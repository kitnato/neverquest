import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/round-shield.svg";
import { shield } from "neverquest/state/inventory";
import { showShield } from "neverquest/state/show";

// TODO
export default function Shield() {
  const shieldValue = useRecoilValue(shield);
  const showShieldValue = useRecoilValue(showShield);

  if (!showShieldValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Shield" />

      <span>{shieldValue.name}</span>
    </Stack>
  );
}
