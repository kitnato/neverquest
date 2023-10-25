import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Usable } from "@neverquest/components/Inventory/Usable";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import IconEssence from "@neverquest/icons/essence.svg?react";
import type { InventoryItem } from "@neverquest/types";
import { isGear, isUsable } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function PurchasableItems({ items }: { items: InventoryItem[] }) {
  return (
    <>
      {stackItems(items).map(({ item, stack }) => {
        const { id, price } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
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

              <PurchaseItem item={item} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}
