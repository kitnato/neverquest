import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import ArmorName from "neverquest/components/Inventory/Armor/ArmorName";
import icon from "neverquest/icons/shoulder-armor.svg";
import { armor } from "neverquest/state/inventory";
import { showArmor } from "neverquest/state/show";

export default function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const showArmorValue = useRecoilValue(showArmor);

  if (!showArmorValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Armor" />

      <ArmorName armor={armorValue} />
    </Stack>
  );
}
