import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import type { Item } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";

export function PurchaseItemButton({ item }: { item: Item }) {
  const coinsValue = useRecoilValue(coins);
  const setMerchantInventory = useSetRecoilState(merchantInventory);
  const setHasBoughtFromMerchant = useSetRecoilState(hasBoughtFromMerchant);

  const acquireItem = useAcquireItem();
  const acquireGear = useAcquireGear();
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const { coinPrice, weight } = item;
  const isAffordable = coinPrice <= coinsValue;
  const canFitValue = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && canFitValue;

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

      setMerchantInventory((current) => current.filter(({ item: { id } }) => id !== item.id));
      setHasBoughtFromMerchant(true);
    }
  };

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isAffordable && <div>Not enough coins!</div>}
          {!canFitValue && <div>Over-encumbered!</div>}
        </Tooltip>
      }
      trigger={isPurchasable ? [] : ["hover", "focus"]}
    >
      <span>
        <Button disabled={!isPurchasable} onClick={handlePurchase} variant="outline-dark">
          Purchase
        </Button>
      </span>
    </OverlayTrigger>
  );
}
