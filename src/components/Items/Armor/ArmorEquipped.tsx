import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Items/Armor/ArmorName";
import { ARMOR_NONE } from "@neverquest/data/inventory";
import { ReactComponent as IconArmorNone } from "@neverquest/icons/armor-none.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const isShowingArmor = useRecoilValue(isShowing("armor"));

  if (!isShowingArmor) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={armorValue === ARMOR_NONE ? IconArmorNone : IconArmor}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
