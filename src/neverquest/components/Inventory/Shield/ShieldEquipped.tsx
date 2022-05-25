import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import ShieldName from "neverquest/components/Inventory/Shield/ShieldName";
import icon from "neverquest/icons/round-shield.svg";
import { shield } from "neverquest/state/inventory";
import { showShield } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function ShieldEquipped() {
  const shieldValue = useAtomValue(shield);
  const showShieldValue = useAtomValue(showShield);

  if (!showShieldValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Equipped shield" />

      <ShieldName shield={shieldValue} />
    </Stack>
  );
}
