import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { WEAPON_NONE } from "@neverquest/data/inventory";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";

export function WeaponEquipped() {
  const isShowingWeapon = useRecoilValue(isShowing("weapon"));
  const weaponValue = useRecoilValue(weapon);

  const isUnarmed = weaponValue === WEAPON_NONE;

  if (!isShowingWeapon) {
    return null;
  }

  return (
    <IconDisplay
      contents={<WeaponName weapon={weaponValue} />}
      Icon={isUnarmed ? IconUnequipped : IconWeapon}
      iconProps={{ isMirrored: isUnarmed }}
      isAnimated
      tooltip="Equipped weapon"
    />
  );
}
