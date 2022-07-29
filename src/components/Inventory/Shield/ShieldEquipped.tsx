import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import ShieldName from "@neverquest/components/Inventory/Shield/ShieldName";
import iconUnequipped from "@neverquest/icons/fist.svg";
import iconEquipped from "@neverquest/icons/round-shield.svg";
import { shield } from "@neverquest/state/inventory";
import { showShield } from "@neverquest/state/show";
import { AnimationType } from "@neverquest/types/ui";
import { NO_SHIELD } from "@neverquest/utilities/constants-gear";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function ShieldEquipped() {
  const shieldValue = useAtomValue(shield);
  const showShieldValue = useAtomValue(showShield);

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
