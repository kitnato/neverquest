import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import ArmorName from "@neverquest/components/Inventory/Armor/ArmorName";
import { NO_ARMOR } from "@neverquest/constants/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/ribcage.svg";
import { ReactComponent as IconEquipped } from "@neverquest/icons/shoulder-armor.svg";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const armorValue = useRecoilValue(armor);
  const showArmorValue = useRecoilValue(isShowing(ShowingType.Armor));

  if (!showArmorValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={armorValue === NO_ARMOR ? IconUnequipped : IconEquipped}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
