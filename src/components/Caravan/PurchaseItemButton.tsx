import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LABEL_NO_ESSENCE, LABEL_OVER_ENCUMBERED } from "@neverquest/data/general";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { essence } from "@neverquest/state/resources";
import type { InventoryItem } from "@neverquest/types";

export function PurchaseItemButton({
  item,
  onPurchase,
}: {
  item: InventoryItem;
  onPurchase: () => void;
}) {
  const essenceValue = useRecoilValue(essence);

  const { price, weight } = item;

  const canFit = useCanFit();

  const canFitItem = canFit(weight);
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && canFitItem;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

          {!canFitItem && <div>{LABEL_OVER_ENCUMBERED}</div>}
        </Tooltip>
      }
      trigger={isPurchasable ? [] : ["focus", "hover"]}
    >
      <span>
        <Button disabled={!isPurchasable} onClick={onPurchase} variant="outline-dark">
          Buy
        </Button>
      </span>
    </OverlayTrigger>
  );
}
