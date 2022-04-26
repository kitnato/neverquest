import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/round-shield.svg";
import { shield } from "neverquest/state/inventory";
import { showBlockChance } from "neverquest/state/show";

export default function Block() {
  const shieldValue = useRecoilValue(shield);
  const showBlockChanceValue = useRecoilValue(showBlockChance);

  if (!showBlockChanceValue) {
    return null;
  }

  return (
    <Stack
      className="animate__animated animate__flipInX"
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Block chance" />

      <span>{shieldValue.stagger * 100}</span>
    </Stack>
  );
}
