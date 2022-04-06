import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import WeaponName from "neverquest/components/Inventory/WeaponName";
import icon from "neverquest/icons/axe-sword.svg";
import { weapon } from "neverquest/state/equipment";
import { show } from "neverquest/state/global";

export default function WeaponEquipped() {
  const showValue = useRecoilValue(show);
  const weaponValue = useRecoilValue(weapon);

  if (!showValue.weapon) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Equipped weapon" />

      <WeaponName weapon={weaponValue} />
    </Stack>
  );
}
