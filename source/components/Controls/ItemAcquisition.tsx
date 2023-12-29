import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CONSUMABLES, GEMS, INFUSABLES, TRINKETS } from "@neverquest/data/items";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { acquiredItems } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumableItem,
  isGemItem,
  isInfusableItem,
  isMelee,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ItemAcquisition() {
  const [acquiredItemsValue, setAcquiredItems] = useRecoilState(acquiredItems);
  const resetAcquiredItems = useResetRecoilState(acquiredItems);

  useEffect(resetAcquiredItems, [resetAcquiredItems]);

  return (
    <div className="position-absolute top-50 start-0 translate-middle">
      {acquiredItemsValue.map((acquiredItem) => {
        const { ID } = acquiredItem;

        return (
          <div
            className={getAnimationClass({
              animation: "zoomOut",
              speed: "slower",
            })}
            key={ID}
            onAnimationEnd={() => {
              setAcquiredItems((currentAcquiredItems) =>
                currentAcquiredItems.filter(({ ID: acquiredItemID }) => acquiredItemID !== ID),
              );
            }}
          >
            <IconImage
              className="small"
              Icon={(() => {
                if (isArmor(acquiredItem)) {
                  return IconArmor;
                }

                if (isConsumableItem(acquiredItem)) {
                  return CONSUMABLES[acquiredItem.name].Icon;
                }

                if (isGemItem(acquiredItem)) {
                  return GEMS[acquiredItem.name].Icon;
                }

                if (isInfusableItem(acquiredItem)) {
                  return INFUSABLES[acquiredItem.name].Icon;
                }

                if (isShield(acquiredItem)) {
                  return IconShield;
                }

                if (isTrinketItem(acquiredItem)) {
                  return TRINKETS[acquiredItem.name].Icon;
                }

                if (isWeapon(acquiredItem)) {
                  if (isMelee(acquiredItem)) {
                    return IconMelee;
                  }

                  return IconRanged;
                }

                return IconUnknown;
              })()}
            />
          </div>
        );
      })}
    </div>
  );
}
