import { nanoid } from "nanoid";
import { useState } from "react";
import { Stack } from "react-bootstrap";

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { CONSUMABLES } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import type { ConsumableItem } from "@neverquest/types";
import type { Consumable } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function PurchaseConsumable({ type }: { type: Consumable }) {
  const [id, setID] = useState(nanoid());

  const acquireItem = useAcquireItem();
  const transactResources = useTransactResources();

  const { item } = CONSUMABLES[type];
  const itemWithID: ConsumableItem = {
    ...item,
    id,
  };
  const { coinPrice } = itemWithID;

  const handlePurchase = () => {
    acquireItem(itemWithID);
    transactResources({ coinsDifference: -itemWithID.coinPrice });

    setID(nanoid());
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <ItemDisplay item={itemWithID} overlayPlacement="right" />

      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

        <PurchaseItemButton handlePurchase={handlePurchase} item={itemWithID} />
      </Stack>
    </div>
  );
}
