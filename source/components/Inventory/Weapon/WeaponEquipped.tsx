import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import IconUnequipped from "@neverquest/icons/fist.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isMelee, isUnarmed } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function WeaponEquipped() {
  const isShowingWeapon = useRecoilValue(isShowing("weapon"));
  const weaponValue = useRecoilValue(weapon);

  const isWeaponUnarmed = isUnarmed(weaponValue);

  if (isShowingWeapon) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={isWeaponUnarmed ? IconUnequipped : isMelee(weaponValue) ? IconMelee : IconRanged}
        iconProps={{ isMirrored: isWeaponUnarmed }}
        tooltip="Equipped weapon"
      >
        <WeaponName overlayPlacement="top" weapon={weaponValue} />
      </IconDisplay>
    );
  }
}
