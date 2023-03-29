import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ARMOR_ICON } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/ribcage.svg";
import { armor, equippedArmor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const equippedArmorValue = useRecoilValue(equippedArmor);
  const isShowingArmor = useRecoilValue(isShowing(ShowingType.Armor));

  if (!isShowingArmor) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={equippedArmorValue ? ARMOR_ICON : IconUnequipped}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
