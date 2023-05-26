import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { isGear } from "@neverquest/types/type-guards";

export function PurchaseItemButton({ id }: { id: string }) {
  const coinsValue = useRecoilValue(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);
  const setHasBoughtFromMerchant = useSetRecoilState(hasBoughtFromMerchant);

  const acquireItem = useAcquireItem();
  const acquireGear = useAcquireGear();
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const { item } = merchantInventoryValue[id];
  const { coinPrice, weight } = item;
  const isAffordable = coinPrice <= coinsValue;
  const canFitValue = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && canFitValue;

  const handlePurchase = () => {
    let acquiredID: string | null = null;

    if (isGear(item)) {
      const [shouldAutoEquip, id] = acquireGear({ gear: item });

      if (id !== null) {
        acquiredID = id;

        if (shouldAutoEquip) {
          toggleEquipGear(acquiredID);
        }
      }
    } else {
      acquiredID = acquireItem({ item });
    }

    if (acquiredID !== null) {
      transactResources({ coinsDifference: -coinPrice });

      setMerchantInventory((current) => {
        const { [id]: _, ...newMerchantInventory } = current;

        return newMerchantInventory;
      });
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
