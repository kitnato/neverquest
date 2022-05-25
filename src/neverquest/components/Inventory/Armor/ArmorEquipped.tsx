import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import ArmorName from "neverquest/components/Inventory/Armor/ArmorName";
import icon from "neverquest/icons/shoulder-armor.svg";
import { armor } from "neverquest/state/inventory";
import { showArmor } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function ArmorEquipped() {
  const armorValue = useAtomValue(armor);
  const showArmorValue = useAtomValue(showArmor);

  if (!showArmorValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Equipped armor" />

      <ArmorName armor={armorValue} />
    </Stack>
  );
}
