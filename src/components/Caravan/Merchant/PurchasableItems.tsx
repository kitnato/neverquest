import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import type { MerchantInventoryItem } from "@neverquest/types";
import { isGear, isUsable } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function PurchasableItems({ merchantItems }: { merchantItems: MerchantInventoryItem[] }) {
  return (
    <>
      {stackItems(merchantItems).map(({ item, stack }) => {
        const { ID, price } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
            {isUsable(item) ? (
              <Usable item={item} />
            ) : (
              <ItemDisplay
                item={item}
                overlayPlacement={isGear(item) ? "right" : undefined}
                stack={stack}
              />
            )}

            <Stack direction="horizontal" gap={3}>
              <IconDisplay Icon={IconEssence} tooltip="Price">
                {formatNumber({ value: price })}
              </IconDisplay>

              <PurchaseItem merchantItem={item} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}
