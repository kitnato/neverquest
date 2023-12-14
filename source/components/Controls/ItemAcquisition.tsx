import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { CONSUMABLES, TRINKETS } from "@neverquest/data/items";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconGem from "@neverquest/icons/gem.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { acquiredItems } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumableItem,
  isGemItem,
  isMelee,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function ItemAcquisition() {
  const [acquiredItemsValue, setItemsAcquired] = useRecoilState(acquiredItems);
  const resetItemsAcquired = useResetRecoilState(acquiredItems);

  useEffect(() => resetItemsAcquired);

  return acquiredItemsValue.map((acquiredItem) => {
    const { ID } = acquiredItem;

    return (
      <div
        className={`position-absolute ${getAnimationClass({
          animation: "zoomOut",
          speed: "slower",
        })}`}
        key={ID}
        onAnimationEnd={() => {
          setItemsAcquired((currentAcquiredItems) =>
            currentAcquiredItems.filter(({ ID: acquiredItemID }) => acquiredItemID !== ID),
          );
        }}
        // Bootstrap positioning utilities do not work with Animation.css zoomOut.
        style={{ left: -10, top: 16 }}
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
              return IconGem;
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
  });
}
