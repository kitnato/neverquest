import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import WeaponName from "neverquest/components/Inventory/Weapon/WeaponName";
import icon from "neverquest/icons/axe-sword.svg";
import { weapon } from "neverquest/state/equipment";
import { showWeapon } from "neverquest/state/show";

export default function WeaponEquipped() {
  const showWeaponValue = useRecoilValue(showWeapon);
  const weaponValue = useRecoilValue(weapon);

  if (!showWeaponValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Equipped weapon" />

      <WeaponName weapon={weaponValue} />
    </Stack>
  );
}
