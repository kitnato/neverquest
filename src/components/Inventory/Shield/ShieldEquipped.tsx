import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import ShieldName from "@neverquest/components/Inventory/Shield/ShieldName";
import { NO_SHIELD } from "@neverquest/constants/gear";
import iconUnequipped from "@neverquest/icons/fist.svg";
import iconEquipped from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { ShowingType } from "@neverquest/types/enums";

export default function ShieldEquipped() {
  const shieldValue = useRecoilValue(shield);
  const showShieldValue = useRecoilValue(isShowing(ShowingType.Shield));

  if (!showShieldValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon
        icon={shieldValue === NO_SHIELD ? iconUnequipped : iconEquipped}
        tooltip="Equipped shield"
      />

      <ShieldName shield={shieldValue} />
    </Stack>
  );
}
