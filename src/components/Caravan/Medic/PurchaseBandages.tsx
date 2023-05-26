import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/internal";
import { CONSUMABLES } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";

export function PurchaseBandages() {
  const coinsValue = useRecoilValue(coins);

  const acquireItem = useAcquireItem();
  const transactResources = useTransactResources();

  const { item } = CONSUMABLES.Bandages;
  const { coinPrice, weight } = item;
  const isAffordable = coinPrice <= coinsValue;
  const canFitValue = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && canFitValue;

  const handlePurchase = () => {
    const acquiredID = acquireItem({ item });

    if (acquiredID !== null) {
      transactResources({ coinsDifference: -coinPrice });
    }
  };

  return (
    <Stack gap={3}>
      <h6>Purchase bandages</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <ItemDisplay item={item} overlayPlacement="right" />

        <Stack direction="horizontal" gap={3}>
          <Coins tooltip="Price (coins)" value={coinPrice} />

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div>Not enough coins!</div>}
                {!canFitValue && <div>Over-encumbered!</div>}
              </Tooltip>
            }
            trigger={isPurchasable ? [] : ["hover", "focus"]}
          >
            <span className="d-inline-block">
              <Button disabled={!isPurchasable} onClick={handlePurchase} variant="outline-dark">
                Purchase
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
