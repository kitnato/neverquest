import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import WeaponName from "@neverquest/components/Inventory/Weapon/WeaponName";
import { NO_WEAPON } from "@neverquest/constants/gear";
import { ReactComponent as IconEquipped } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function WeaponEquipped() {
  const showWeaponValue = useRecoilValue(isShowing(ShowingType.Weapon));
  const weaponValue = useRecoilValue(weapon);

  const isEquipped = weaponValue !== NO_WEAPON;

  if (!showWeaponValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon
        flipped={!isEquipped}
        Icon={isEquipped ? IconEquipped : IconUnequipped}
        tooltip="Equipped weapon"
      />

      <WeaponName weapon={weaponValue} />
    </Stack>
  );
}
