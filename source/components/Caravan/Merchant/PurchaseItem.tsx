import { useSetRecoilState } from "recoil";

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { merchantInventory } from "@neverquest/state/caravan";
import type { MerchantInventoryItem } from "@neverquest/types";
import { isConsumableItem, isGearItem } from "@neverquest/types/type-guards";

export function PurchaseItem({ merchantItem }: { merchantItem: MerchantInventoryItem }) {
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  const acquireItem = useAcquireItem();
  const progressQuest = useProgressQuest();
  const toggleEquipItem = useToggleEquipItem();
  const transactEssence = useTransactEssence();

  return (
    <PurchaseItemButton
      item={merchantItem}
      onPurchase={() => {
        const { isReturned, ...item } = merchantItem;

        const acquisitionStatus = acquireItem(item);

        if (acquisitionStatus === "failure") {
          return;
        }

        const { ID, price } = item;

        transactEssence(-price);

        if (isGearItem(item) && acquisitionStatus === "equip") {
          toggleEquipItem({ item });
        }

        setMerchantInventory((currentMerchantInventory) =>
          currentMerchantInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
        );

        if (isReturned) {
          progressQuest({ quest: "buyingBack" });
        }

        progressQuest({
          quest: isConsumableItem(item) ? "purchasingConsumable" : "purchasingItem",
        });
      }}
    />
  );
}
