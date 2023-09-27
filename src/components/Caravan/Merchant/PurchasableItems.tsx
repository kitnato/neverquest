import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { Trinket } from "@neverquest/components/Items/Trinket";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import type { InventoryItem } from "@neverquest/types";
import { isGear, isTrinket } from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function PurchasableItems({ items }: { items: InventoryItem[] }) {
  return (
    <>
      {stackItems(items).map(({ item, stack }) => {
        const { id, price } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
            {isTrinket(item) ? (
              <Trinket item={item} />
            ) : (
              <ItemDisplay
                item={item}
                overlayPlacement={isGear(item) ? "right" : undefined}
                stack={stack}
              />
            )}

            <Stack direction="horizontal" gap={3}>
              <IconDisplay
                contents={formatValue({ value: price })}
                Icon={IconEssence}
                tooltip="Price"
              />

              <PurchaseItem item={item} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}
