import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Inventory/GemDescription";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, GemItem, UsableItem } from "@neverquest/types";
import { isGem, isGemItem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ItemName({
  amount,
  item,
}: {
  amount?: number;
  item: ConsumableItem | GemItem | UsableItem;
}) {
  const { name, weight } = item;
  const description = isGem(name) ? (
    <GemDescription gem={name} />
  ) : isGemItem(item) ? (
    ""
  ) : (
    item.description
  );
  const displayName = capitalizeAll(name);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">{displayName}</PopoverHeader>

          <PopoverBody className="text-center">
            <Stack gap={2}>
              {description}

              <DetailsTable>
                <WeightDetail amount={amount} weight={weight} />
              </DetailsTable>
            </Stack>
          </PopoverBody>
        </Popover>
      }
      placement="right"
    >
      <span>{`${displayName}${
        amount !== undefined && amount > 1 ? ` ×${formatNumber({ value: amount })}` : ""
      }`}</span>
    </OverlayTrigger>
  );
}
