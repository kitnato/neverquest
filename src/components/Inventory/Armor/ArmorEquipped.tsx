import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import ArmorName from "@neverquest/components/Inventory/Armor/ArmorName";
import { NO_ARMOR } from "@neverquest/constants/gear";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/ribcage.svg";
import { ReactComponent as IconEquipped } from "@neverquest/icons/shoulder-armor.svg";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const armorValue = useRecoilValue(armor);
  const showArmorValue = useRecoilValue(isShowing(ShowingType.Armor));

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
        Icon={armorValue === NO_ARMOR ? IconUnequipped : IconEquipped}
        tooltip="Equipped armor"
      />

      <ArmorName armor={armorValue} />
    </Stack>
  );
}
