import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import type { InventoryItem } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";

export function PurchaseItem({ item }: { item: InventoryItem }) {
  const acquireItem = useAcquireItem();
  const merchantTradeItem = useMerchantTradeItem();
  const toggleEquipGear = useToggleEquipGear();
  const transactEssence = useTransactEssence();

  const handlePurchase = () => {
    const acquisitionStatus = acquireItem(item);

    if (acquisitionStatus === "noFit") {
      return;
    }

    transactEssence(-item.price);

    if (acquisitionStatus === "autoEquip" && isGear(item)) {
      toggleEquipGear(item);
    }

    merchantTradeItem(item, "purchase");
  };

  return <PurchaseItemButton handlePurchase={handlePurchase} item={item} />;
}
