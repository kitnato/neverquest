import { nanoid } from "nanoid";
import { useState } from "react";
import { Stack } from "react-bootstrap";

import { PurchaseItemButton } from "@neverquest/components/Caravan/PurchaseItemButton";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { CONSUMABLES } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import type { ConsumableItem } from "@neverquest/types";
import type { Consumable } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function PurchaseConsumable({ consumable }: { consumable: Consumable }) {
  const [id, setID] = useState(nanoid());

  const acquireItem = useAcquireItem();
  const transactEssence = useTransactEssence();

  const { item } = CONSUMABLES[consumable];
  const itemWithID: ConsumableItem = {
    ...item,
    id,
  };
  const { price } = itemWithID;

  const handlePurchase = () => {
    acquireItem(itemWithID);
    transactEssence(-itemWithID.price);

    setID(nanoid());
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <ItemDisplay item={itemWithID} overlayPlacement="right" />

      <Stack direction="horizontal" gap={3}>
        <IconDisplay contents={formatValue({ value: price })} Icon={IconEssence} tooltip="Price" />

        <PurchaseItemButton handlePurchase={handlePurchase} item={itemWithID} />
      </Stack>
    </div>
  );
}
