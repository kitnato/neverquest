import { MouseEvent } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import useAcquireGear from "@neverquest/hooks/actions/useAcquireGear";
import useAcquireItem from "@neverquest/hooks/actions/useAcquireItem";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { merchantInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { isItem } from "@neverquest/types/type-guards";
import { UIVariant } from "@neverquest/types/ui";

export default function ({ id }: { id: string }) {
  const coinsValue = useRecoilValue(coins);
  const [merchantInventoryValue, setMerchantInventory] = useRecoilState(merchantInventory);

  const acquireItem = useAcquireItem();
  const acquireGear = useAcquireGear();
  const transactResources = useTransactResources();

  const { possession } = merchantInventoryValue[id];
  const { price, weight } = possession;
  const isAffordable = price <= coinsValue;
  const isFitting = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && isFitting;

  const handlePurchase = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    currentTarget.blur();

    const isReceived = isItem(possession)
      ? acquireItem({ item: possession })
      : acquireGear({ gear: possession });

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
