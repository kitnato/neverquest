import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName"
import { weapon } from "@neverquest/state/gear"
import { isShowing } from "@neverquest/state/ui"
import { getAnimationClass, getGearIcon } from "@neverquest/utilities/getters"

export function WeaponEquipped() {
  const isShowingWeapon = useRecoilValue(isShowing(`weapon`))
  const weaponValue = useRecoilValue(weapon)

  if (isShowingWeapon) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: `flipInX` })}
        Icon={getGearIcon(weaponValue)}
        tooltip="Equipped weapon"
      >
        <WeaponName overlayPlacement="top" weapon={weaponValue} />
      </IconDisplay>
    )
  }
}
