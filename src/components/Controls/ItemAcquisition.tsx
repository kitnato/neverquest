import { useRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CONSUMABLES, TRINKETS } from "@neverquest/data/inventory";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";
import { itemsAcquired } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGem,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ItemAcquisition() {
  const [itemsAcquiredValue, setItemsAcquired] = useRecoilState(itemsAcquired);

  const handleAnimationEnd = (key: string) => () =>
    setItemsAcquired((current) => current.filter(({ id }) => key !== id));

  if (itemsAcquiredValue.length === 0) {
    return null;
  }

  return itemsAcquiredValue.map((item) => {
    const { id } = item;

    if (isTrinket(item) && item.type === "knapsack") {
      return;
    }

    const Icon = (() => {
      if (isArmor(item)) {
        return IconArmor;
      }

      if (isConsumable(item)) {
        return CONSUMABLES[item.type].Icon;
      }

      if (isGem(item)) {
        return IconGem;
      }

      if (isShield(item)) {
        return IconShield;
      }

      if (isTrinket(item)) {
        return TRINKETS[item.type].Icon;
      }

      if (isWeapon(item)) {
        return IconWeapon;
      }

      return IconUnknown;
    })();

    return (
      <div
        className={`position-absolute ${getAnimationClass({ speed: "slower", type: "zoomOut" })}`}
        key={id}
        onAnimationEnd={handleAnimationEnd(id)}
        style={{ left: -12, top: 12 }}
      >
        <IconImage Icon={Icon} size="small" />
      </div>
    );
  });
}
