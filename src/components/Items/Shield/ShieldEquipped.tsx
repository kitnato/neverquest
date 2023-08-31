import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ShieldName } from "@neverquest/components/Items/Shield/ShieldName";
import { SHIELD_NONE } from "@neverquest/data/inventory";
import { ReactComponent as IconFist } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";

export function ShieldEquipped() {
  const isShowingShield = useRecoilValue(isShowing("shield"));
  const shieldValue = useRecoilValue(shield);

  if (!isShowingShield) {
    return null;
  }

  return (
    <IconDisplay
      contents={<ShieldName shield={shieldValue} />}
      Icon={shieldValue === SHIELD_NONE ? IconFist : IconShield}
      isAnimated
      tooltip="Equipped shield"
    />
  );
}
