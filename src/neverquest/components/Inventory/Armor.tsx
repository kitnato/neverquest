import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { armor } from "neverquest/state/equipment";
import icon from "neverquest/icons/shoulder-armor.svg";
import { showArmor } from "neverquest/state/show";

// TODO
export default function Armor() {
  const armorValue = useRecoilValue(armor);
  const showArmorValue = useRecoilValue(showArmor);

  if (!showArmorValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Armor" />

      <span>{armorValue.name}</span>
    </Stack>
  );
}
