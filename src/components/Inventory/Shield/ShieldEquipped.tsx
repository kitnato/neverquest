import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { ICON_NO_SHIELD } from "@neverquest/constants";
import { SHIELD_ICON } from "@neverquest/data/gear";
import { equippedShield, shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function ShieldEquipped() {
  const equippedShieldValue = useRecoilValue(equippedShield);
  const isShowingShield = useRecoilValue(isShowing(ShowingType.Shield));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={equippedShieldValue ? SHIELD_ICON : ICON_NO_SHIELD}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
