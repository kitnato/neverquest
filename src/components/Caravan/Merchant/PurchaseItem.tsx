import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import type { Item } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";

export function PurchaseItem({ item }: { item: Item }) {
  const acquireItem = useAcquireItem();
  const merchantTradeItem = useMerchantTradeItem();
  const toggleEquipGear = useToggleEquipGear();

  const handlePurchase = () => {
    const acquisitionStatus = acquireItem(item, "purchase");

    if (acquisitionStatus === "noFit") {
      return;
    }

    if (acquisitionStatus === "autoEquip" && isGear(item)) {
      toggleEquipGear(item);
    }

    merchantTradeItem(item, "purchase");
  };

  return <PurchaseItemButton handlePurchase={handlePurchase} item={item} />;
}
