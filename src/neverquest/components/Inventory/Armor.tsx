import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { armor } from "neverquest/state/equipment";
import icon from "neverquest/icons/shoulder-armor.svg";
import { show } from "neverquest/state/global";

// TODO
export default function Armor() {
  const armorValue = useRecoilValue(armor);
  const showValue = useRecoilValue(show);

  if (!showValue.armor) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Armor" />

      <span>{armorValue.name}</span>
    </Stack>
  );
}
