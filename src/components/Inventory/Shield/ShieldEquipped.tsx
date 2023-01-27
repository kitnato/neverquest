import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { SHIELD_NONE } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconEquipped } from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export function ShieldEquipped() {
  const isShowingShield = useRecoilValue(isShowing(ShowingType.Shield));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={shieldValue === SHIELD_NONE ? IconUnequipped : IconEquipped}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
