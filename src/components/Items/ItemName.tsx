import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import type { ConsumableItem, ShardItem, TrinketItem } from "@neverquest/types";
import { isShard } from "@neverquest/types/type-guards";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ItemName({
  item,
  placement,
  stack,
}: {
  item: ConsumableItem | ShardItem | TrinketItem;
  placement?: Placement;
  stack?: number;
}) {
  const { description, type, weight } = item;
  const name = `${capitalizeAll(type)}${isShard(item) ? " shard" : ""}`;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

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
      <span>{`${name}${stack !== undefined && stack > 1 ? ` x${stack}` : ""}`}</span>
    </OverlayTrigger>
  );
}
