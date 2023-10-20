import { useRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CONSUMABLES, TRINKETS } from "@neverquest/data/inventory";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconGem from "@neverquest/icons/gem.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { itemsAcquired } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGem,
  isMelee,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ItemAcquisition() {
  const [itemsAcquiredValue, setItemsAcquired] = useRecoilState(itemsAcquired);

  const onAnimationEnd = (key: string) => () =>
    setItemsAcquired((current) => current.filter(({ id }) => key !== id));

  if (itemsAcquiredValue.length === 0) {
    return null;
  }

  return itemsAcquiredValue.map((current) => {
    const { id } = current;

    if (isTrinket(current) && current.name === "knapsack") {
      return;
    }

    const Icon = (() => {
      if (isArmor(current)) {
        return IconArmor;
      }

      if (isConsumable(current)) {
        return CONSUMABLES[current.name].Icon;
      }

      if (isGem(current)) {
        return IconGem;
      }

      if (isShield(current)) {
        return IconShield;
      }

      if (isTrinket(current)) {
        return TRINKETS[current.name].Icon;
      }

      if (isWeapon(current)) {
        if (isMelee(current)) {
          return IconMelee;
        }

        return IconRanged;
      }

      return IconUnknown;
    })();

    return (
      <div
        className={`position-absolute ${getAnimationClass({ name: "zoomOut", speed: "slower" })}`}
        key={id}
        onAnimationEnd={onAnimationEnd(id)}
        style={{ left: -12, top: 12 }}
      >
        <IconImage Icon={Icon} size="small" />
      </div>
    );
  });
}
