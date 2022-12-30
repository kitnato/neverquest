import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import ShieldName from "@neverquest/components/Inventory/Shield/ShieldName";
import { NO_SHIELD } from "@neverquest/data/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconEquipped } from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function () {
  const shieldValue = useRecoilValue(shield);
  const showShieldValue = useRecoilValue(isShowing(ShowingType.Shield));

  if (!showShieldValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={shieldValue === NO_SHIELD ? IconUnequipped : IconEquipped}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
