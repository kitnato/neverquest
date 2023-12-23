import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Inventory/GemDescription";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, GemItem, InheritableItem } from "@neverquest/types";
import { isGemItem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ItemName({
  amount,
  item,
}: {
  amount?: number;
  item: ConsumableItem | GemItem | InheritableItem;
}) {
  const description = isGemItem(item) ? (
    <GemDescription gem={item.name} />
  ) : (
    <span>{item.description}</span>
  );
  const displayName = capitalizeAll(item.name);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">
            <span>{displayName}</span>
          </PopoverHeader>

          <PopoverBody className="text-center">
            <Stack gap={2}>
              {description}

              <DetailsTable>
                <WeightDetail amount={amount} weight={item.weight} />
              </DetailsTable>
            </Stack>
          </PopoverBody>
        </Popover>
      }
      placement="right"
    >
      <span className="fitted">
        {`${displayName}${
          amount !== undefined && amount > 1 ? ` ×${formatNumber({ value: amount })}` : ""
        }`}
      </span>
    </OverlayTrigger>
  );
}
