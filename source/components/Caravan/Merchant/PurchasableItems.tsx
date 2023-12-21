import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { EradicateItem } from "@neverquest/components/Inventory/EradicateItem";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import type { MerchantInventoryItem } from "@neverquest/types";
import { isGearItem, isInheritableItem } from "@neverquest/types/type-guards";
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
        const { ID, price } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
            {isInheritableItem(item) ? (
              <Usable item={item} />
            ) : (
              <ItemDisplay amount={amount} isInInventory={isGearItem(item)} item={item} />
            )}

            <Stack direction="horizontal" gap={3}>
              <IconDisplay Icon={IconEssence} tooltip="Price">
                {formatNumber({ value: price })}
              </IconDisplay>

              <PurchaseItem merchantItem={item} />

              {canEradicate && <EradicateItem ID={ID} />}
            </Stack>
          </div>
        );
      })}
    </>
  );
}
