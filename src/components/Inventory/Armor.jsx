import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import { armor } from "state/equipment";
import icon from "icons/shoulder-armor.svg";
import { show } from "state/global";

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
