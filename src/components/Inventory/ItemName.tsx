import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Inventory/GemDescription";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, GemItem, UsableItem } from "@neverquest/types";
import { isGem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ItemName({
  item,
  placement,
  stack,
}: {
  item: ConsumableItem | GemItem | UsableItem;
  placement?: Placement;
  stack?: number;
}) {
  const { name, weight } = item;
  const description = isGem(item) ? <GemDescription name={item.name} /> : item.description;
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
                <WeightDetail stack={stack} weight={weight} />
              </DetailsTable>
            </Stack>
          </PopoverBody>
        </Popover>
      }
      placement={placement}
    >
      <span style={{ width: "max-content" }}>{`${displayName}${
        stack !== undefined && stack > 1 ? ` x${formatNumber({ value: stack })}` : ""
      }`}</span>
    </OverlayTrigger>
  );
}
