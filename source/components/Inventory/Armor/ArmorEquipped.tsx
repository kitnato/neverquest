import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ARMOR_NONE } from "@neverquest/data/gear";
import IconArmorNone from "@neverquest/icons/armor-none.svg?react";
import IconArmor from "@neverquest/icons/armor.svg?react";
import { armor } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const isShowingArmor = useRecoilValue(isShowing("armor"));

  if (isShowingArmor) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={armorValue.ID === ARMOR_NONE.ID ? IconArmorNone : IconArmor}
        tooltip="Equipped armor"
      >
        <ArmorName armor={armorValue} />
      </IconDisplay>
    );
  }
}
