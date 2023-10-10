import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ARMOR_NONE } from "@neverquest/data/inventory";
import { ReactComponent as IconArmorNone } from "@neverquest/icons/armor-none.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { armor } from "@neverquest/state/items";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const isShowingArmor = useRecoilValue(isShowing("armor"));

  if (!isShowingArmor) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={armorValue.name === ARMOR_NONE.name ? IconArmorNone : IconArmor}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
