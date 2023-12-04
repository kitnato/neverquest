import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { WEAPON_NONE } from "@neverquest/data/gear";
import IconUnequipped from "@neverquest/icons/fist.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import { weapon } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { isMelee } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function WeaponEquipped() {
  const isShowingWeapon = useRecoilValue(isShowing("weapon"));
  const weaponValue = useRecoilValue(weapon);

  const isUnarmed = weaponValue.name === WEAPON_NONE.name;

  if (isShowingWeapon) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={isUnarmed ? IconUnequipped : isMelee(weaponValue) ? IconMelee : IconRanged}
        iconProps={{ isMirrored: isUnarmed }}
        tooltip="Equipped weapon"
      >
        <WeaponName weapon={weaponValue} />
      </IconDisplay>
    );
  }
}
