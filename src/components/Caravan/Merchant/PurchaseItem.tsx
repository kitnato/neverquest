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
  isGear,
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
        const acquisitionStatus = acquireItem(merchantItem);

        if (acquisitionStatus === "noFit") {
          return;
        }

        const { ID, isReturned, price } = merchantItem;

        transactEssence(-price);

        if (acquisitionStatus === "autoEquip" && isGear(merchantItem)) {
          toggleEquipGear(merchantItem);
        }

        setMerchantInventory((current) => current.filter(({ ID: currentID }) => currentID !== ID));

        if (isReturned) {
          progressQuest({ quest: "buyingBack" });
        }

        progressQuest({
          quest: isArmor(merchantItem)
            ? "purchasingArmor"
            : isShield(merchantItem)
            ? "purchasingShield"
            : isWeapon(merchantItem)
            ? "purchasingWeapon"
            : isInfusableItem(merchantItem)
            ? "purchasingInfusable"
            : "purchasingTrinket",
        });
      }}
    />
  );
}
