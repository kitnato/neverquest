import { useRecoilState, useSetRecoilState } from "recoil";

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import type { Item } from "@neverquest/types";
import { isConsumable, isGear } from "@neverquest/types/type-guards";

export function PurchaseItem({ item }: { item: Item }) {
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);
  const setHasBoughtFromMerchant = useSetRecoilState(hasBoughtFromMerchant);

  const acquireItem = useAcquireItem();
  const acquireGear = useAcquireGear();
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const { coinPrice } = item;

  const handlePurchase = () => {
    let hasAcquiredItem = false;

    if (isGear(item)) {
      if (acquireGear(item)) {
        toggleEquipGear(item);
        hasAcquiredItem = true;
      }
    } else {
      hasAcquiredItem = acquireItem(item);
    }

    if (hasAcquiredItem) {
      transactResources({ coinsDifference: -coinPrice });

      if (isConsumable(item)) {
        const { stack, type } = item;

        if (stack === 1) {
          setMerchantInventory((current) => current.filter(({ item: { id } }) => id !== item.id));
        } else {
          const merchantStackIndex = merchantInventoryValue.findIndex(
            ({ item }) => isConsumable(item) && item.type === type
          );

          setMerchantInventory((current) => [
            ...current.slice(0, merchantStackIndex),
            { isReturned: true, item: { ...item, stack: item.stack - 1 } },
            ...current.slice(merchantStackIndex + 1),
          ]);
        }
      } else {
        setMerchantInventory((current) => current.filter(({ item: { id } }) => id !== item.id));
      }

      setHasBoughtFromMerchant(true);
    }
  };

  return <PurchaseItemButton handlePurchase={handlePurchase} item={item} />;
}
