import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { WEAPON_ICON, WEAPON_NONE } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function WeaponEquipped() {
  const isShowingWeapon = useRecoilValue(isShowing(ShowingType.Weapon));
  const weaponValue = useRecoilValue(weapon);

  const isEquipped = weaponValue !== WEAPON_NONE;

  if (!isShowingWeapon) {
    return null;
  }

  return (
    <IconDisplay
      contents={<WeaponName weapon={weaponValue} />}
      Icon={isEquipped ? WEAPON_ICON : IconUnequipped}
      iconProps={{ isFlipped: !isEquipped }}
      isAnimated
      tooltip="Equipped weapon"
    />
  );
}
