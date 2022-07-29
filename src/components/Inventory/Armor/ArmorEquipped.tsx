import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import ArmorName from "@neverquest/components/Inventory/Armor/ArmorName";
import iconUnequipped from "@neverquest/icons/ribcage.svg";
import iconEquipped from "@neverquest/icons/shoulder-armor.svg";
import { armor } from "@neverquest/state/inventory";
import { showArmor } from "@neverquest/state/show";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { NO_ARMOR } from "@neverquest/utilities/constants-gear";

export default function ArmorEquipped() {
  const armorValue = useAtomValue(armor);
  const showArmorValue = useAtomValue(showArmor);

  if (!showArmorValue) {
    return null;
  }

  return (
    <Stack
      className={getAnimationClass({ type: AnimationType.FlipInX })}
      direction="horizontal"
      gap={3}
    >
      <ImageIcon
        icon={armorValue === NO_ARMOR ? iconUnequipped : iconEquipped}
        tooltip="Equipped armor"
      />

      <ArmorName armor={armorValue} />
    </Stack>
  );
}
