import { MouseEvent } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import useAcquireItem from "@neverquest/hooks/useAcquireItem";
import useCheckEncumbrance from "@neverquest/hooks/useCheckEncumbrance";
import { merchantInventory } from "@neverquest/state/caravan";
import { resourcesBalance, coins } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function BuyItemButton({ id }: { id: symbol }) {
  const [merchantInventoryValue, setMerchantInventory] = useAtom(merchantInventory);
  const coinsValue = useAtomValue(coins);
  const balanceResources = useSetAtom(resourcesBalance);

  const acquireItem = useAcquireItem();
  const checkEncumbrance = useCheckEncumbrance();

  const { item } = merchantInventoryValue[id];
  const { price, weight } = item;
  const isAffordable = price <= coinsValue;
  const isFitting = checkEncumbrance({ weight });
  const isPurchasable = isAffordable && isFitting;

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
        <Button
          disabled={!isPurchasable}
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            const itemReceived = acquireItem({ item });

            if (itemReceived) {
              setMerchantInventory((current) => {
                const newMerchantInventory = { ...current };

                delete newMerchantInventory[id];

                return newMerchantInventory;
              });
              balanceResources({ coinsDifference: -item.price });
            }
          }}
          variant={UIVariant.Outline}
        >
          Buy
        </Button>
      </span>
    </OverlayTrigger>
  );
}
