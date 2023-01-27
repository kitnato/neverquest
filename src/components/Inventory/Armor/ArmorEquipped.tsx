import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ARMOR_NONE } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/ribcage.svg";
import { ReactComponent as IconEquipped } from "@neverquest/icons/shoulder-armor.svg";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const isShowingArmor = useRecoilValue(isShowing(ShowingType.Armor));

  if (!isShowingArmor) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={armorValue === ARMOR_NONE ? IconUnequipped : IconEquipped}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
