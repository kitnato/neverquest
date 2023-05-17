import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { ReactComponent as IconFist } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { equippedGearID, shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { GearType, ShowingType } from "@neverquest/types/enums";

export function ShieldEquipped() {
  const equippedShieldID = useRecoilValue(equippedGearID(GearType.Shield));
  const isShowingShield = useRecoilValue(isShowing(ShowingType.Shield));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={equippedShieldID === null ? IconFist : IconShield}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
