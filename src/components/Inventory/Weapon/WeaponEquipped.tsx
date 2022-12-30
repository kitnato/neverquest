import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import WeaponName from "@neverquest/components/Inventory/Weapon/WeaponName";
import { NO_WEAPON } from "@neverquest/data/gear";
import { ReactComponent as IconEquipped } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const showWeaponValue = useRecoilValue(isShowing(ShowingType.Weapon));
  const weaponValue = useRecoilValue(weapon);

  const isEquipped = weaponValue !== NO_WEAPON;

  if (!showWeaponValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={<WeaponName weapon={weaponValue} />}
      Icon={isEquipped ? IconEquipped : IconUnequipped}
      iconProps={{ isFlipped: !isEquipped }}
      isAnimated
      tooltip="Equipped weapon"
    />
  );
}
