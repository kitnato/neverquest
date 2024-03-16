import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName"
import { armor } from "@neverquest/state/gear"
import { isShowing } from "@neverquest/state/ui"
import { getAnimationClass, getGearIcon } from "@neverquest/utilities/getters"

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor)
  const isShowingArmor = useRecoilValue(isShowing(`armor`))

  if (isShowingArmor) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: `flipInX` })}
        Icon={getGearIcon(armorValue)}
        tooltip="Equipped armor"
      >
        <ArmorName armor={armorValue} overlayPlacement="top" />
      </IconDisplay>
    )
  }
}
