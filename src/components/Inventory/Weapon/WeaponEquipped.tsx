import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { WEAPON_ICON } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { equippedWeapon, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function WeaponEquipped() {
  const equippedWeaponValue = useRecoilValue(equippedWeapon);
  const isShowingWeapon = useRecoilValue(isShowing(ShowingType.Weapon));
  const weaponValue = useRecoilValue(weapon);

  if (!isShowingWeapon) {
    return null;
  }

  return (
    <IconDisplay
      contents={<WeaponName weapon={weaponValue} />}
      Icon={equippedWeaponValue === null ? IconUnequipped : WEAPON_ICON}
      iconProps={{ isFlipped: equippedWeaponValue === null }}
      isAnimated
      tooltip="Equipped weapon"
    />
  );
}
