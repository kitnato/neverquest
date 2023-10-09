import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Inventory/GemDescription";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, GemItem, UsableItem } from "@neverquest/types";
import { isGem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";

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
          <Popover.Header className="text-center">{displayName}</Popover.Header>

          <Popover.Body className="text-center">
            <Stack gap={2} style={{ maxWidth: 350 }}>
              {description}

              <DetailsTable>
                <WeightDetail stack={stack} weight={weight} />
              </DetailsTable>
            </Stack>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
    >
      <span>{`${displayName}${
        stack !== undefined && stack > 1 ? ` x${formatValue({ value: stack })}` : ""
      }`}</span>
    </OverlayTrigger>
  );
}
