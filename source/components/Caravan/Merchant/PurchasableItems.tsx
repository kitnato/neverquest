import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { EradicateItem } from "@neverquest/components/Inventory/EradicateItem";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import type { MerchantInventoryItem } from "@neverquest/types";
import { isGearItem } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function PurchasableItems({
  canEradicate = false,
  merchantItems,
}: {
  canEradicate?: boolean;
  merchantItems: MerchantInventoryItem[];
}) {
  return (
    <>
      {stackItems(merchantItems).map(({ amount, item }) => {
        const { ID, name, price } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
            <ItemDisplay amount={amount} isInInventory={isGearItem(item)} item={item} />

            <Stack className="ms-2" direction="horizontal" gap={3}>
              <IconDisplay Icon={IconEssence} tooltip="Price">
                {formatNumber({ value: price })}
              </IconDisplay>

              <PurchaseItem merchantItem={item} />

              {canEradicate && <EradicateItem ID={ID} name={name} />}
            </Stack>
          </div>
        );
      })}
    </>
  );
}
