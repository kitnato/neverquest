import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Items/GemDescription";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import type { ConsumableItem, GemItem, TrinketItem } from "@neverquest/types";
import { isGem } from "@neverquest/types/type-guards";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ItemName({
  item,
  placement,
  stack,
}: {
  item: ConsumableItem | GemItem | TrinketItem;
  placement?: Placement;
  stack?: number;
}) {
  const { type, weight } = item;
  const description = isGem(item) ? <GemDescription type={item.type} /> : item.description;
  const name = capitalizeAll(type);

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
