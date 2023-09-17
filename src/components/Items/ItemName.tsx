import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Items/GemDescription";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import type { ConsumableItem, GemItem, TrinketItem } from "@neverquest/types";
import { isGem, isTrinket } from "@neverquest/types/type-guards";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ItemName({
  hideOverlay = false,
  item,
  placement,
  stack,
}: {
  hideOverlay?: boolean;
  item: ConsumableItem | GemItem | TrinketItem;
  placement?: Placement;
  stack?: number;
}) {
  const { type, weight } = item;
  const description = isGem(item) ? <GemDescription type={item.type} /> : item.description;
  const isStack = stack !== undefined && stack > 1;
  const isTrinketWithStack = isTrinket(item) && isStack;
  const name = capitalizeAll(type);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body className="text-center">
            <span>{description}</span>

            <DetailsTable>
              <WeightDetail stack={isTrinketWithStack ? undefined : stack} weight={weight} />
            </DetailsTable>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
      trigger={hideOverlay ? [] : ["focus", "hover"]}
    >
      <span>{`${name}${isTrinketWithStack ? ` (${stack})` : isStack ? ` x${stack}` : ""}`}</span>
    </OverlayTrigger>
  );
}
