import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useAcquireTrinket } from "@neverquest/hooks/actions/useAcquireTrinket";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { isTrinket } from "@neverquest/types/type-guards";

export function PurchaseItemButton({ id }: { id: string }) {
  const coinsValue = useRecoilValue(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);
  const setHasBoughtFromMerchant = useSetRecoilState(hasBoughtFromMerchant);

  const acquireTrinket = useAcquireTrinket();
  const acquireGear = useAcquireGear();
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  const { item } = merchantInventoryValue[id];
  const { coinPrice, weight } = item;
  const isAffordable = coinPrice <= coinsValue;
  const canFitValue = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && canFitValue;

  const handlePurchase = () => {
    let acquiredID = null;

    if (isTrinket(item)) {
      acquiredID = acquireTrinket({ trinket: item });
    } else {
      const [shouldAutoEquip, id] = acquireGear({ gear: item });

      if (id) {
        acquiredID = id;

        if (shouldAutoEquip) {
          toggleEquipGear(acquiredID);
        }
      }
    }

    if (acquiredID) {
      transactResources({ coinsDifference: -coinPrice });
      setMerchantInventory((current) => {
        const newMerchantInventory = { ...current };

        Reflect.deleteProperty(newMerchantInventory, id);

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
      placement="top"
      trigger={isPurchasable ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button disabled={!isPurchasable} onClick={handlePurchase} variant="outline-dark">
          Purchase
        </Button>
      </span>
    </OverlayTrigger>
  );
}
