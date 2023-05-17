import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ReactComponent as IconArmorNone } from "@neverquest/icons/armor-none.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { armor, equippedGearID } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { GearType, ShowingType } from "@neverquest/types/enums";

export function ArmorEquipped() {
  const armorValue = useRecoilValue(armor);
  const equippedArmorValue = useRecoilValue(equippedGearID(GearType.Armor));
  const isShowingArmor = useRecoilValue(isShowing(ShowingType.Armor));

  if (!isShowingArmor) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ArmorName armor={armorValue} />}
      Icon={equippedArmorValue === null ? IconArmorNone : IconArmor}
      isAnimated
      tooltip="Equipped armor"
    />
  );
}
