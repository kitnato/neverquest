import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import WeaponName from "neverquest/components/Inventory/Weapon/WeaponName";
import { UIAnimationType } from "neverquest/env";
import icon from "neverquest/icons/axe-sword.svg";
import { weapon } from "neverquest/state/inventory";
import { showWeapon } from "neverquest/state/show";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function WeaponEquipped() {
  const showWeaponValue = useRecoilValue(showWeapon);
  const weaponValue = useRecoilValue(weapon);

  if (!showWeaponValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(UIAnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Equipped weapon" />

      <WeaponName weapon={weaponValue} />
    </Stack>
  );
}
