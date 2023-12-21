import { useSetRecoilState } from "recoil";

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { merchantInventory } from "@neverquest/state/caravan";
import type { MerchantInventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGearItem,
  isInfusableItem,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards";

export function PurchaseItem({ merchantItem }: { merchantItem: MerchantInventoryItem }) {
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const acquireItem = useAcquireItem();
  const progressQuest = useProgressQuest();
  const toggleEquipGear = useToggleEquipGear();
  const transactEssence = useTransactEssence();

  return (
    <PurchaseItemButton
      item={merchantItem}
      onPurchase={() => {
        const { isEradicated: _, isReturned, ...item } = merchantItem;

        const acquisitionStatus = acquireItem(item);

        if (acquisitionStatus === "noFit") {
          return;
        }

        const { ID, price } = item;

        transactEssence(-price);

        if (acquisitionStatus === "autoEquip" && isGearItem(item)) {
          toggleEquipGear(item);
        }

        setMerchantInventory((currentMerchantInventory) =>
          currentMerchantInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
        );

        if (isReturned) {
          progressQuest({ quest: "buyingBack" });
        }

        progressQuest({
          quest: isArmor(item)
            ? "purchasingArmor"
            : isShield(item)
              ? "purchasingShield"
              : isWeapon(item)
                ? "purchasingWeapon"
                : isInfusableItem(item)
                  ? "purchasingInfusable"
                  : "purchasingTrinket",
        });
      }}
    />
  );
}
