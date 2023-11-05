import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

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
  isConsumableItem,
  isGem,
  isMelee,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ItemAcquisition() {
  const [itemsAcquiredValue, setItemsAcquired] = useRecoilState(itemsAcquired);
  const resetItemsAcquired = useResetRecoilState(itemsAcquired);

  const onAnimationEnd = (key: string) => () =>
    setItemsAcquired((current) => current.filter(({ id }) => key !== id));

  useEffect(() => resetItemsAcquired);

  return itemsAcquiredValue.map((current) => {
    const { id } = current;

    return (
      <div
        className={`position-absolute ${getAnimationClass({ name: "zoomOut", speed: "slower" })}`}
        key={id}
        onAnimationEnd={onAnimationEnd(id)}
        // TODO - Bootstrap positioning utilities do not work with this Animation.css
        style={{ left: -10, top: 16 }}
      >
        <IconImage
          Icon={(() => {
            if (isArmor(current)) {
              return IconArmor;
            }

            if (isConsumableItem(current)) {
              return CONSUMABLES[current.name].Icon;
            }

            if (isGem(current)) {
              return IconGem;
            }

            if (isShield(current)) {
              return IconShield;
            }

            if (isTrinketItem(current)) {
              return TRINKETS[current.name].Icon;
            }

            if (isWeapon(current)) {
              if (isMelee(current)) {
                return IconMelee;
              }

              return IconRanged;
            }

            return IconUnknown;
          })()}
          size="small"
        />
      </div>
    );
  });
}
