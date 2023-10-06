import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LABEL_NO_ESSENCE, LABEL_OVER_ENCUMBERED } from "@neverquest/data/general";
import { canFit } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { InventoryItem } from "@neverquest/types";

export function PurchaseItemButton({
  handlePurchase,
  item,
}: {
  handlePurchase: () => void;
  item: InventoryItem;
}) {
  const essenceValue = useRecoilValue(essence);

  const { price, weight } = item;
  const canFitValue = useRecoilValue(canFit(weight));

  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && canFitValue;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

          {!canFitValue && <div>{LABEL_OVER_ENCUMBERED}</div>}
        </Tooltip>
      }
      trigger={isPurchasable ? [] : ["hover", "focus"]}
    >
      <span>
        <Button disabled={!isPurchasable} onClick={handlePurchase} variant="outline-dark">
          Buy
        </Button>
      </span>
    </OverlayTrigger>
  );
}
