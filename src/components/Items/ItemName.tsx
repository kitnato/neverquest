import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Items/GemDescription";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import type { ConsumableItem, GemItem, TrinketItem } from "@neverquest/types";
import { isGem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatValue } from "@neverquest/utilities/formatters";

export function ItemName({
  item,
  placement,
  stack,
}: {
  item: ConsumableItem | GemItem | TrinketItem;
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
            <span>{description}</span>

            <DetailsTable>
              <WeightDetail stack={stack} weight={weight} />
            </DetailsTable>
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
