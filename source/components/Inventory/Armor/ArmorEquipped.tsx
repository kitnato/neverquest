import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import IconArmorNone from "@neverquest/icons/armor-none.svg?react";
import IconArmor from "@neverquest/icons/armor.svg?react";
import { armor } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/ui";
import { isUnarmored } from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const isShowingArmor = useRecoilValue(isShowing("armor"));

  if (isShowingArmor) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={isUnarmored(armorValue) ? IconArmorNone : IconArmor}
        tooltip="Equipped armor"
      >
        <ArmorName armor={armorValue} overlayPlacement="top" />
      </IconDisplay>
    );
  }
}
