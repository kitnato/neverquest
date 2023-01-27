import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useAcquireTrinket } from "@neverquest/hooks/actions/useAcquireTrinket";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { isTrinket } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

export function BuyItemButton({ id }: { id: string }) {
  const coinsValue = useRecoilValue(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);

  const acquireTrinket = useAcquireTrinket();
  const acquireGear = useAcquireGear();
  const transactResources = useTransactResources();

  const { item } = merchantInventoryValue[id];
  const { price, weight } = item;
  const isAffordable = price <= coinsValue;
  const isFitting = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && isFitting;

  const handlePurchase = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    currentTarget.blur();

    const isReceived = isTrinket(item)
      ? acquireTrinket({ trinket: item })
      : acquireGear({ gear: item });

    if (isReceived) {
      setMerchantInventory((current) => {
        const newMerchantInventory = { ...current };

        delete newMerchantInventory[id];

        return newMerchantInventory;
      });
      transactResources({ coinsDifference: -price });
    }
  };

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isAffordable && <div>Not enough coins!</div>}
          {!isFitting && <div>Over-encumbered!</div>}
        </Tooltip>
      }
      placement="top"
      trigger={isPurchasable ? [] : ["hover", "focus"]}
    >
      <span className="d-inline-block">
        <Button disabled={!isPurchasable} onClick={handlePurchase} variant={UIVariant.Outline}>
          Buy
        </Button>
      </span>
    </OverlayTrigger>
  );
}
